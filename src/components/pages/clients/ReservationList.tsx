/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  Card,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  GridItem,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../constants/BASE_URL";
import { getMyReservations } from "../../../services/apiGetMyReservations";
import { RootState } from "../../../store/Store";
import Footer from "../ui/Footer";
import Loader from "../ui/Loader";
import Navbar from "../ui/Navbar";
import NoDataFound from "../ui/NoDataFound";

interface Reservation {
  id: string;
  date: string;
  num_guests: number;
  start_time: string;
  end_time: string;
  customer: string;
  restaurantId: string;
  special_requests: string;
  status: string;
  table_id: string;
}

const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
  const [formData, setFormData] = useState({ ...reservation });
  const toast = useToast();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    console.log(formData);

    await axios
      .patch(
        BASE_URL + `reservations/${reservation.id}/`,
        {
          table: reservation.table_id,
          date: formData.date,
          start_time: formData.start_time,
          end_time: formData.end_time,
          num_guests: formData.num_guests,
          special_requests: formData.num_guests,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((r) => {
        console.log(r);
        toast({
          title: "Success",
          description: "Reservation updated successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e: any) => {
        console.log(e);
        toast({
          title: "Error",
          description: JSON.stringify(Object.values(e.response.data)),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  return (
    <Card
      minHeight={"150px"}
      textAlign={"center"}
      bg={"#88AB8E"}
      color={"white"}
      boxShadow="md"
      borderRadius="lg"
      p="10"
      m="4"
      rounded={20}
    >
      <br />
      <Text fontSize="lg">Reservation ID: {reservation.id}</Text>
      <Editable defaultValue={`Date: ${reservation.date}`}>
        <EditablePreview />
        <EditableInput
          onBlur={handleSubmit}
          type="date"
          name="date"
          backgroundColor={"white"}
          color={"green"}
          onChange={handleChange}
        />
      </Editable>
      <Editable defaultValue={`Number of Guests: ${reservation.num_guests}`}>
        <EditablePreview />
        <EditableInput
          onBlur={handleSubmit}
          backgroundColor={"white"}
          color={"green"}
          type="number"
          name="num_guests"
          onChange={handleChange}
        />
      </Editable>

      <Editable defaultValue={`Start Time: ${reservation.start_time}`}>
        <EditablePreview />
        <EditableInput
          onBlur={handleSubmit}
          backgroundColor={"white"}
          color={"green"}
          type="time"
          name="start_time"
          onChange={handleChange}
        />
      </Editable>

      <Editable defaultValue={`End Time: ${reservation.end_time}`}>
        <EditablePreview />
        <EditableInput
          onBlur={handleSubmit}
          backgroundColor={"white"}
          color={"green"}
          type="time"
          name="end_time"
          onChange={handleChange}
        />
      </Editable>

      <Editable
        defaultValue={`Special Requests: ${reservation.special_requests}`}
      >
        <EditablePreview />
        <EditableInput
          onBlur={handleSubmit}
          backgroundColor={"white"}
          color={"green"}
          name="special_requests"
          type="text"
          onChange={handleChange}
        />
      </Editable>
      <Text>
        Status: <Badge>{reservation.status}</Badge>
      </Text>
      <br />
    </Card>
  );
};

const ReservationList = () => {
  const { customer, role } = useSelector((s: RootState) => s.user);
  const {
    data: reservations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myReservations"],
    queryFn: () => getMyReservations(customer!),
  });
  console.log(reservations, isError);
  if (role !== 2) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Heading textAlign={"center"} my={5}>
        MY RESERVATIONS
      </Heading>
      {isLoading && <Loader />}
      {reservations?.data?.length === 0 && (
        <NoDataFound
          colorScheme="yellow"
          text="You do not have any reservations so far"
        />
      )}
      <Grid gridTemplateColumns={`repeat(auto-fit, minmax(250px, 1fr))`}>
        {reservations?.data?.map((reservation: Reservation) => (
          <GridItem key={reservation.id}>
            <ReservationCard reservation={reservation} />
          </GridItem>
        ))}
      </Grid>
      <Footer />
    </Box>
  );
};

export default ReservationList;
