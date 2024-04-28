import { Search2Icon } from "@chakra-ui/icons";
import {
  Badge,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../../../../../constants/BASE_URL";
import { getAdminReservations } from "../../../../../services/apiAdminGetReservations";
import { getRestaurantByID } from "../../../../../services/apiGetRestaurantById";

interface Reservation {
  id: number;
  restaurant_id: number;
  customer_id: number;
  table_id: number;
  date: string;
  start_time: string;
  end_time: string;
  num_guests: number;
  special_requests: string;
  status: string;
  restaurant: string;
}
function getOrderStatusBadge(status: string) {
  let color;
  console.log({ status });
  switch (status) {
    case "Pending":
      color = "yellow";
      break;
    case "Accept":
      color = "green";
      break;
    case "Reject":
      color = "red";
      break;
    default:
      color = "gray";
  }

  return (
    <Badge paddingX={5} paddingY={2} rounded={"full"} colorScheme={color}>
      {status}
    </Badge>
  );
}
const Orders = () => {
  const { data: restaurant } = useQuery({
    queryKey: ["admin/restaurantById"],
    queryFn: () =>
      getRestaurantByID(
        JSON.parse(localStorage.getItem("restaurant")!).restaurant
      ),
  });
  const { data: res } = useQuery({
    queryKey: ["reservations"],
    queryFn: () =>
      getAdminReservations(
        JSON.parse(localStorage.getItem("restaurant")!).restaurant
      ),
  });
  console.log(res);
  useEffect(() => {
    window.localStorage.setItem("restaurantInfo", JSON.stringify(restaurant));
  }, [restaurant]);

  return (
    <>
      <Flex my={3}>
        <InputGroup>
          <Input type="search" placeholder="Basic usage" />{" "}
          <InputRightElement>
            <Search2Icon />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            <b>Orders</b>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>&#8470; guests</Th>
              <Th>Reservation day</Th>
              <Th>Reservation time</Th>
              <Th>Customer ID</Th>
              <Th>Time</Th>
              <Th>Order Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {res?.data?.map((r: Reservation, i: number) => {
              const {
                num_guests,
                customer_id,
                date,
                end_time,
                status,
                start_time,
                id,
                special_requests,
              } = r;
              return (
                <Tr key={i}>
                  <Td>{num_guests}</Td>
                  <Td>{date}</Td>
                  <Td>
                    {start_time} - {end_time}
                  </Td>
                  <Td>{customer_id}</Td>
                  <Td>{special_requests}</Td>
                  <Td>{getOrderStatusBadge(status)}</Td>
                  <Td>
                    <Select
                      onChange={async (e) => {
                        console.log(e.target.value);

                        await axios
                          .post(BASE_URL + "manage-reservation/" + id + "/", {
                            status: e.target.value,
                          })
                          .then((res) => {
                            console.log(res);
                            window.location.reload();
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                      placeholder={status}
                    >
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                      <option value="Pending">Pending</option>
                    </Select>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
