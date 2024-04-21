/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Card,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../../../../constants/BASE_URL";
import { getTables } from "../../../../../services/apiGetTables";
import TimeSlots from "./TimeSlots";
const TablesPage = () => {
  const restaurantID = JSON.parse(localStorage.getItem("restaurantInfo")!)?.id;
  const [formData, setFormData] = useState({
    number: "",
    capacity: "",
    restaurant: restaurantID,
  });

  const { data: tables, isLoading } = useQuery({
    queryKey: ["admin/tables"],
    queryFn: () => getTables(restaurantID),
  });
  console.log(tables, isLoading);

  const handleCreate = async (restaurantID: number) => {
    if (formData.capacity === "" || formData.number === "") {
      alert("Please fill all fields");
      return;
    }
    await axios
      .post(BASE_URL + `restaurants/${restaurantID}/tables/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((r) => {
        console.log(r);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Box>
      <Card my={5} p={5}>
        <Text fontSize='3xl'>Add Tables</Text>
        <Input
          my={5}
          name='number'
          placeholder='Table number'
          required
          onChange={handleChange}
          type='number'
          min={0}
        />
        <Input
          my={5}
          name='capacity'
          placeholder='Table Capacity'
          required
          onChange={handleChange}
          type='number'
          min={0}
        />
        <Button
          onClick={() => handleCreate(restaurantID)}
          colorScheme='teal'
          mt={5}
          type='submit'
        >
          Create
        </Button>
      </Card>
      <Text fontSize='3xl'>Tables</Text>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Restaurant's Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Table Number</Th>
              <Th>Capacity</Th>
              <Th>Time slots</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tables?.map((e: any, i: number) => {
              return (
                <Tr key={i}>
                  <Td>{e.number}</Td>
                  <Td>{e.capacity}</Td>
                  <Td>
                    <TimeSlots time_slots={e.time_slots} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TablesPage;
