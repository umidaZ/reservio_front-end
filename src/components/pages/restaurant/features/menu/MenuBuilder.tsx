import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

const initialMenuItems: MenuItem[] = [
  { id: 1, name: "", description: "", price: 0 },
];

const RestaurantMenuBuilder: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const toast = useToast();

  const handleAddMenuItem = () => {
    const newItem = {
      id: menuItems.length + 1,
      name: "",
      description: "",
      price: 0,
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleRemoveMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleChange = (id: number, field: keyof MenuItem, value: string) => {
    const newMenuItems = menuItems.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setMenuItems(newMenuItems);
  };

  const handleSubmit = () => {
    // Here, you would handle submitting the menu items, perhaps sending them to a backend server
    console.log(menuItems);
    toast({
      title: "Menu submitted!",
      description: "Your menu has been submitted successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        {menuItems.map((item, index) => (
          <HStack key={item.id} width='100%'>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={item.name}
                onChange={(e) => handleChange(item.id, "name", e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                value={item.description}
                onChange={(e) =>
                  handleChange(item.id, "description", e.target.value)
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type='number'
                value={item.price}
                onChange={(e) => handleChange(item.id, "price", e.target.value)}
              />
            </FormControl>
            <IconButton
              aria-label='Remove menu item'
              icon={<CloseIcon />}
              onClick={() => handleRemoveMenuItem(item.id)}
            />
          </HStack>
        ))}
        <Button onClick={handleAddMenuItem}>Add Menu Item</Button>
        <Button colorScheme='blue' onClick={handleSubmit}>
          Submit Menu
        </Button>
      </VStack>
    </Box>
  );
};

export default RestaurantMenuBuilder;
