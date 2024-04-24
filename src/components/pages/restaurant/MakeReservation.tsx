/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Divider,
  Flex,
  Select,
  Spinner,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/BASE_URL";
import { getTables } from "../../../services/apiGetTables";
import { RootState } from "../../../store/Store";
import Filter from "../ui/Filter";
import NoDataFound from "../ui/NoDataFound";
import PeopleCounter from "../ui/PeopleCounter";

const MakeReservation = () => {
  const toast = useToast();
  const { date, time } = useSelector((state: RootState) => state.search);
  const { role } = useSelector((state: RootState) => state.user);
  const { restaurantId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: () => getTables(restaurantId!),
  });
  const { customer } = useSelector((s: RootState) => s.user);
  console.log(customer);
  const [reserved, setReserved] = useState(data);
  const [reservationData, setReservationData] = useState({
    table: reserved?.id,
    date: "",
    num_guests: "",
    start_time: "",
    end_time: "",
    customer: customer,
    restaurant: restaurantId,
    special_requests: "No special requests",
  });

  return (
    <Box
      className='shadow'
      gridArea={"reservation"}
      p={2}
      height={"auto"}
      width={{ base: "100%", md: "400px", lg: "450px" }}
      backgroundColor={"white"}
    >
      {role === 1 ? (
        <NoDataFound
          text='Only Customers can make orders 😢'
          colorScheme='red'
        />
      ) : (
        <Box>
          <Text
            textAlign={"center"}
            my={5}
            fontSize={[18, 25]}
            textTransform={"uppercase"}
          >
            Choose table
          </Text>
          {isLoading && <Spinner />}
          <Select
            onChange={(e) => {
              setReserved(
                data.find((select: any) => select.id == e.target.value)
              );
            }}
          >
            <option value='default'>Choose Table</option>
            {data?.map((e: any, i: number) => {
              return (
                <option key={i} value={e.id}>
                  {" "}
                  Table #{e.number} - {e.capacity} seats
                </option>
              );
            })}
          </Select>
          <Divider orientation='horizontal' my={4} />
          <Text textAlign={"center"} my={2}>
            Reserved date & time
          </Text>
          <Flex alignItems={"center"} flexDirection={"column"}>
            {reserved?.time_slots?.length !== 0 ? (
              reserved?.time_slots?.map((e: any, i: number) => {
                return (
                  <Tag
                    m={2}
                    key={i}
                    colorScheme='green'
                    fontWeight={"bold"}
                    my={2}
                  >
                    <Text fontWeight={"bold"}>Reserved on: {e.date}</Text>
                    <Text mx={2} fontWeight={"bold"}>
                      Reserved from {e.start_time} to {e.end_time}
                    </Text>
                  </Tag>
                );
              })
            ) : (
              <Text> No tables are currently reserved.</Text>
            )}
          </Flex>
          <Text
            textAlign={"center"}
            my={5}
            fontSize={[18, 25]}
            textTransform={"uppercase"}
          >
            make reservation
          </Text>
          <Divider orientation={"horizontal"} my={5} />
          <Text fontSize={18} textAlign={"center"} as={"h6"}>
            Party Size
          </Text>
          <Divider orientation={"horizontal"} my={5} />
          <PeopleCounter
            onChange={(e) =>
              setReservationData({ ...reservationData, num_guests: String(e) })
            }
          />
          <Divider orientation={"horizontal"} my={5} />
          Start Time
          <Filter
            type='time'
            placeholder='Start Time'
            defaultValue={time}
            onChange={(e) =>
              setReservationData({ ...reservationData, start_time: String(e) })
            }
          />
          <Divider orientation={"horizontal"} my={5} />
          End Time
          <Filter
            type='time'
            placeholder='End Time'
            defaultValue={time}
            onChange={(e) =>
              setReservationData({ ...reservationData, end_time: String(e) })
            }
          />
          <Divider orientation={"horizontal"} my={5} />
          Date
          <Filter
            type='date'
            placeholder='Date'
            defaultValue={date}
            onChange={(e) =>
              setReservationData({ ...reservationData, date: String(e) })
            }
          />
          <Filter
            type='text'
            placeholder='Special requests'
            onChange={(e) =>
              setReservationData({
                ...reservationData,
                special_requests: String(e),
              })
            }
          />
          <Divider orientation={"horizontal"} my={5} />
          <Divider orientation={"horizontal"} my={5} />
          <Box
            p={3}
            className='shadow'
            alignItems={"center"}
            gap={2}
            flexWrap={"wrap"}
          >
            <Text my={5} textAlign={"center"}>
              Reserve Table
            </Text>
            <Divider orientation={"horizontal"} my={5} />
            <Button
              w={"100%"}
              colorScheme='red'
              onClick={async () => {
                console.log({
                  ...reservationData,
                  table: reserved?.id,
                });
                await axios
                  .post(
                    BASE_URL + `reservations/`,
                    {
                      ...reservationData,
                      table: reserved?.id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                      setReservationData({
                        table: "",
                        date: "",
                        num_guests: "",
                        start_time: "",
                        end_time: "",
                        customer: "",
                        restaurant: "",
                        special_requests: "",
                      });
                      toast({
                        title: "Success",
                        description: "Table reserved successfully",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                    } else {
                      toast({
                        title: "Error",
                        description: "Something went wrong",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    toast({
                      title: "Error",
                      description: "Something went wrong",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  });
              }}
            >
              Reserve Table
            </Button>
          </Box>
        </Box>
      )}{" "}
    </Box>
  );
};

export default MakeReservation;
