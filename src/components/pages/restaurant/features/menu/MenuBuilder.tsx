/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Img,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL, BASE_URL_IMG } from "../../../../../constants/BASE_URL";
import { getMenuCategories } from "../../../../../services/apiGetMenuCategories";
import { getMenuItems } from "../../../../../services/apiGetMenuItems";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  unit_price: number;
  menu: string | number;
  photo: File | null;
}

const initialMenuItems: MenuItem[] = [];

const RestaurantMenuBuilder: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [categoryMenuItems, setCategoryMenuItems] =
    useState<MenuItem[]>(initialMenuItems);
  const [cat, setCat] = useState(8);
  const toast = useToast();
  const { data: categories } = useQuery({
    queryKey: ["menuCategory"],
    queryFn: () =>
      getMenuCategories(
        JSON.parse(localStorage.getItem("restaurantInfo")!)?.id
      ),
  });
  console.log(cat);

  const handleAddMenuItem = () => {
    const newItem = {
      id: menuItems.length + 1,
      name: "",
      description: "",
      unit_price: 0,
      menu: "",
      photo: null,
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleRemoveMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleChange = (
    id: number,
    field: keyof MenuItem,
    value: string | File
  ) => {
    const newMenuItems = menuItems.map((item) => {
      if (item.id === id) {
        if (field === "photo") {
          return { ...item, [field]: value as File };
        } else {
          return { ...item, [field]: value };
        }
      }
      return item;
    });
    setMenuItems(newMenuItems);
  };

  const handleSubmit = async () => {
    for (const item of menuItems) {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("description", item.description);
      formData.append("unit_price", item.unit_price.toString());
      formData.append("menu", item.menu.toString());
      if (item.photo) {
        formData.append("photo", item.photo);
      }

      // Send the formData to your backend server for each menu item
      try {
        await axios
          .post(BASE_URL + `categories/${item.menu}/menu-items/`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((r) => {
            console.log(r);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.error("Error submitting menu item:", error);
      }
    }

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
        {menuItems.map((item) => (
          <HStack key={item.id} width='100%'>
            <FormControl isRequired>
              <FormLabel>Menu Category</FormLabel>
              <Select
                onChange={(e) => handleChange(item.id, "menu", e.target.value)}
                name='menu'
                placeholder='Select option'
              >
                <option value='option1'>Option 1</option>
                {categories?.data?.map((c: any) => (
                  <option value={c.id}>{c.name}</option>
                ))}
              </Select>
            </FormControl>
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
              <FormLabel>unit_price</FormLabel>
              <Input
                type='number'
                value={item.unit_price}
                onChange={(e) =>
                  handleChange(item.id, "unit_price", e.target.value)
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Photo</FormLabel>
              <Input
                type='file'
                accept='image/*'
                onChange={(e) =>
                  handleChange(item.id, "photo", e.target.files?.[0] || null)
                }
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
      <Box>
        <Heading>Menu Items</Heading>
        <Flex gap={5} my={5}>
          {categories?.data?.map((e, i: number) => {
            return (
              <Box key={i}>
                <input
                  onChange={async (e) => {
                    console.log(e.target.value);
                    setCat(Number(e.target.value));
                    await getMenuItems(e.target.value).then((r) => {
                      console.log({ rrr: r });
                      if (r.status == "ok") {
                        setCategoryMenuItems(r.data);
                      }
                    });
                  }}
                  type='radio'
                  value={e.id}
                  name={"menu"}
                  key={i}
                />{" "}
                {e.name}
              </Box>
            );
          })}
        </Flex>
        {categoryMenuItems?.map((e) => {
          return (
            <Card key={e.id} my={2}>
              <CardBody>
                <Flex gap={5}>
                  <Img
                    rounded={5}
                    width={"100px"}
                    src={BASE_URL_IMG + e.photo}
                  />

                  <Box>
                    <Text>{e.name}</Text>
                    <Text>{e.description}</Text>
                    <Text>{e.unit_price}</Text>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default RestaurantMenuBuilder;
