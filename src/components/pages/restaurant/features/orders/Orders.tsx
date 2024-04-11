import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useDynamicSearch from "../../../../../hooks/useDynamicSearch";
import { reservations } from "../../../../../constants/restaurants";
import { useQuery } from "@tanstack/react-query";
import { getAdminReservations } from "../../../../../services/apiAdminGetReservations";

interface Reservation {
  num_guests: number;
  reservation_day: string;
  reservation_time: string;
  customer_name: string;
  customer_id: number;
  order_status: "Pending" | "Accepted" | "Rejected";
}

function getOrderStatusBadge(orderStatus: string) {
  let color;
  switch (orderStatus.toLowerCase()) {
    case "pending":
      color = "yellow";
      break;
    case "accepted":
      color = "green";
      break;
    case "rejected":
      color = "red";
      break;
    default:
      color = "gray";
  }

  return (
    <Badge paddingX={5} paddingY={2} rounded={"full"} colorScheme={color}>
      {orderStatus}
    </Badge>
  );
}
const Orders = () => {
  const { data } = useQuery({
    queryKey: ["admin/reservations"],
    queryFn: () => getAdminReservations(11),
  });
  const [filteredItems, searchItems] =
    useDynamicSearch<Reservation>(reservations);
  console.log({ orders: data });
  return (
    <>
      <Flex my={3}>
        <InputGroup>
          <Input
            type='search'
            onChange={(e) => searchItems(e.target.value)}
            placeholder='Basic usage'
          />{" "}
          <InputRightElement>
            <Search2Icon />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>
            <b>Orders</b>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>&#8470; guests</Th>
              <Th>Reservation day</Th>
              <Th>Reservation time</Th>
              <Th>Customer Name</Th>
              <Th>Customer ID</Th>
              <Th>Order Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredItems?.map((r, i) => {
              const {
                num_guests,
                reservation_day,
                reservation_time,
                customer_id,
                customer_name,
                order_status,
              } = r;
              return (
                <Tr key={i}>
                  <Td>{num_guests}</Td>
                  <Td>{reservation_day}</Td>
                  <Td>{reservation_time}</Td>
                  <Td>{customer_id}</Td>
                  <Td>{customer_name}</Td>
                  <Td>{getOrderStatusBadge(order_status)}</Td>
                  <Td>
                    <Menu>
                      {({ isOpen }) => (
                        <>
                          <MenuButton
                            colorScheme='blue'
                            isActive={isOpen}
                            onChange={(e) => console.log(e)}
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                          >
                            {isOpen ? "Close" : "Status"}
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Accept</MenuItem>
                            <MenuItem>Reject</MenuItem>
                            <MenuItem>Pending</MenuItem>
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
            {/* <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr> */}
          </Tbody>
          {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot> */}
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
