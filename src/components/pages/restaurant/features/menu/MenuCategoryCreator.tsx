/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Table,
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
import { getMenuCategories } from "../../../../../services/apiGetMenuCategories";

const MenuCategoryCreator = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["menuCategory"],
    queryFn: () =>
      getMenuCategories(
        JSON.parse(localStorage.getItem("restaurantInfo")!)?.id
      ),
  });

  const handleAddCategory = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    // Add category to list
    const newCategory = {
      name: name.trim(),
      restaurant: JSON.parse(localStorage.getItem("restaurantInfo")!)?.id,
    };

    await axios
      .post(
        BASE_URL +
          `restaurants/${
            JSON.parse(localStorage.getItem("restaurantInfo")!)?.id
          }/menu-categories/`,
        newCategory,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")!}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setName("");
    setError("");
  };

  const handleDeleteCategory = async (id: number | string) => {
    try {
      const restaurantId = JSON.parse(
        localStorage.getItem("restaurantInfo")!
      )?.id;
      const token = localStorage.getItem("token")!;
      const response = await axios.delete(
        `${BASE_URL}restaurants/${restaurantId}/menu-categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack spacing={4}>
      <Box>
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme='teal' onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>

      <Box>
        <Text fontSize='xl' fontWeight='bold' mb={2}>
          Categories
        </Text>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories?.data?.map((category: any) => (
              <Tr key={category.id}>
                <Td>{category.id}</Td>
                <Td>{category.name}</Td>
                <Td>
                  <Button
                    size='sm'
                    colorScheme='red'
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Stack>
  );
};

export default MenuCategoryCreator;
