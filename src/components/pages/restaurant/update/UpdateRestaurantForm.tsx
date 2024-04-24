/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { getCuisines } from "../../../../services/apiCuisines";
import Footer from "../../ui/Footer";
import Navbar from "../../ui/Navbar";

interface RestaurantFormData {
  name: string;
  slug: string;
  location: string;
  description: string;
  contact_number: string;
  website: string;
  instagram: string;
  telegram: string;
  opening_time: string;
  closing_time: string;
  restaurant: string;
  is_halal: boolean;
  cuisines: number | undefined | [];
  user_id: any;
}

const UpdateRestaurantForm = () => {
  const { data: cuisines } = useQuery<[] | []>({
    queryKey: ["cuisines"],
    queryFn: getCuisines,
  });
  const id = JSON.parse(localStorage.getItem("user")!)?.id;
  const user = JSON.parse(localStorage.getItem("user")!)?.user_id;
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "",
    slug: "",
    location: "",
    description: "",
    contact_number: "",
    website: "",
    instagram: "",
    telegram: "",
    opening_time: "",
    closing_time: "",
    is_halal: false,
    restaurant: id,
    cuisines: [],
    user_id: user,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? e.target?.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    await axios
      .post(BASE_URL + "restaurants/?partial=True", formData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <Box my={5} padding={[1, 5]}>
        <Heading textAlign={"center"} my={5}>
          Update Restaurant profile
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack
            spacing={4}
            justifyContent={"center"}
            alignItems={"center"}
            maxW={"600px"}
            m='auto'
          >
            <FormControl id='name' isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id='location' isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                name='location'
                value={formData.location}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id='description'>
              <FormLabel>Description</FormLabel>
              <Textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id='contact_number' isRequired>
              <FormLabel>Contact Number</FormLabel>
              <Input
                name='contact_number'
                value={formData.contact_number}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id='website'>
              <FormLabel>Website</FormLabel>
              <Input
                name='website'
                value={formData.website}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id='instagram'>
              <FormLabel>Instagram</FormLabel>
              <Input
                name='instagram'
                value={formData.instagram}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id='telegram'>
              <FormLabel>Telegram</FormLabel>
              <Input
                name='telegram'
                value={formData.telegram}
                onChange={handleChange}
              />
            </FormControl>
            <Select
              name='cuisines'
              placeholder='Cuisines'
              onChange={(e) => {
                const c: any = [Number(e.target.value)];
                setFormData({
                  ...formData,
                  cuisines: c,
                });
              }}
            >
              {cuisines?.map((c: any, i: number) => {
                return (
                  <option key={i} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </Select>
            <Flex
              gap={4}
              flexDir={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <FormControl id='opening_time' isRequired>
                <FormLabel>Opening Time</FormLabel>
                <Input
                  type='time'
                  name='opening_time'
                  value={formData.opening_time}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id='closing_time' isRequired>
                <FormLabel>Closing Time</FormLabel>
                <Input
                  type='time'
                  name='closing_time'
                  value={formData.closing_time}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>

            <FormControl id='is_halal'>
              <Checkbox
                name='is_halal'
                isChecked={formData.is_halal}
                onChange={handleChange}
              >
                Halal
              </Checkbox>
            </FormControl>

            <Button type='submit'>Submit</Button>
          </VStack>
        </form>
      </Box>
      <Footer />
    </>
  );
};

export default UpdateRestaurantForm;
