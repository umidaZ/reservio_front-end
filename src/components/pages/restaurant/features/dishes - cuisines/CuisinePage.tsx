import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  useToast,
  Flex,
  Text,
} from "@chakra-ui/react";

interface Cuisine {
  id: number;
  name: string;
}

const CuisinePage: React.FC = () => {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [newCuisine, setNewCuisine] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const toast = useToast();

  const addCuisine = () => {
    const newCuisineItem: Cuisine = {
      id: Date.now(), // simple ID generation strategy for demo purposes
      name: newCuisine,
    };
    setCuisines([...cuisines, newCuisineItem]);
    setNewCuisine("");
    toast({
      title: "Cuisine added.",
      description: "We've added your cuisine to the list.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const deleteCuisine = (id: number) => {
    setCuisines(cuisines.filter((cuisine) => cuisine.id !== id));
  };

  const startEdit = (cuisine: Cuisine) => {
    setEditId(cuisine.id);
    setEditText(cuisine.name);
  };

  const saveEdit = () => {
    if (editId == null) return;
    setCuisines(
      cuisines.map((cuisine) =>
        cuisine.id === editId ? { ...cuisine, name: editText } : cuisine
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <Box p={5}>
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={20} my={5}>
        Add Cuisine
      </Text>
      <Input
        placeholder='Add new cuisine'
        value={newCuisine}
        onChange={(e) => setNewCuisine(e.target.value)}
        mb={4}
      />
      {newCuisine.length > 0 && (
        <Button colorScheme='teal' onClick={addCuisine}>
          Add Cuisine
        </Button>
      )}
      <VStack spacing={4} mt={5}>
        {cuisines.map((cuisine) => (
          <Box key={cuisine.id} w='full' justifyContent='space-between'>
            {editId === cuisine.id ? (
              <Flex className='shadow' padding={2} gap={3}>
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <Button colorScheme='blue' onClick={saveEdit}>
                  Save
                </Button>
              </Flex>
            ) : (
              <Flex
                padding={2}
                justifyContent={"space-between"}
                alignItems={"center"}
                className='shadow'
              >
                <Box>{cuisine.name}</Box>
                <Flex gap={5}>
                  <Button
                    colorScheme='yellow'
                    onClick={() => startEdit(cuisine)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme='red'
                    onClick={() => deleteCuisine(cuisine.id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </Flex>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CuisinePage;
