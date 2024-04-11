import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
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
}

const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' p='4' m='4'>
      <Text fontSize='lg'>Reservation ID: {reservation.id}</Text>
      <Text>Date: {reservation.date}</Text>
      <Text>Number of Guests: {reservation.num_guests}</Text>
      <Text>Start Time: {reservation.start_time}</Text>
      <Text>End Time: {reservation.end_time}</Text>
      <Text>Special Requests: {reservation.special_requests}</Text>
    </Box>
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
  console.log(isError);
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
          colorScheme='yellow'
          text='You do not have any reservations so far'
        />
      )}
      <Flex flexDirection={"column"} flexWrap='wrap'>
        {reservations?.data?.map((reservation: Reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </Flex>
      <Footer />
    </Box>
  );
};

export default ReservationList;
