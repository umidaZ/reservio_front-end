/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../constants/BASE_URL";
import { getCuisines } from "../../../services/apiCuisines";
import { RootState } from "../../../store/Store";

interface CuisineOption {
  id: string;
  name: string;
}

const RestaurantForm: React.FC = () => {
  const toast = useToast();
  const restaurant = useSelector((s: RootState) => s.restaurantInfo);
  const { data: cuisines } = useQuery({
    queryKey: ["cusines"],
    queryFn: () => getCuisines(),
  });

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      // Append all form values to the formData object
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(
            key,
            typeof value === "object" && value !== null ? value : String(value)
          );
        }
      });
      console.log(values);
      // Send the form data using axios
      await axios
        .put(`${BASE_URL}restaurants/${restaurant?.id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((r) => {
          console.log(r);
        });

      toast({
        title: "Form submitted!",
        description: "Your form has been submitted successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error submitting form",
        description: "Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Formik
        initialValues={restaurant}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <FormControl id='name' isRequired>
              <FormLabel>Name</FormLabel>
              <Field as={Input} name='name' />
            </FormControl>
            <FormControl id='slug' mt={4}>
              <FormLabel>Slug</FormLabel>
              <Field as={Input} name='slug' />
            </FormControl>
            <FormControl id='location' mt={4}>
              <FormLabel>Location</FormLabel>
              <Field as={Input} name='location' />
            </FormControl>
            <FormControl id='description' mt={4}>
              <FormLabel>Description</FormLabel>
              <Field as={Textarea} name='description' />
            </FormControl>
            <FormControl id='photos' mt={4}>
              <FormLabel>Photos</FormLabel>
              <input
                type='file'
                onChange={(event) => {
                  setFieldValue("photos", event.currentTarget.files?.[0]);
                }}
              />
            </FormControl>
            <FormControl id='contact_number' mt={4}>
              <FormLabel>Contact Number</FormLabel>
              <Field as={Input} name='contact_number' />
            </FormControl>
            <FormControl id='email' mt={4}>
              <FormLabel>Email</FormLabel>
              <Field as={Input} type='email' name='email' />
            </FormControl>
            <FormControl id='website' mt={4}>
              <FormLabel>Website</FormLabel>
              <Field as={Input} name='website' />
            </FormControl>
            <FormControl id='instagram' mt={4}>
              <FormLabel>Instagram</FormLabel>
              <Field as={Input} name='instagram' />
            </FormControl>
            <FormControl id='telegram' mt={4}>
              <FormLabel>Telegram</FormLabel>
              <Field as={Input} name='telegram' />
            </FormControl>
            <FormControl id='opening_time' mt={4}>
              <FormLabel>Opening Time</FormLabel>
              <Field as={Input} type='time' name='opening_time' />
            </FormControl>
            <FormControl id='closing_time' mt={4}>
              <FormLabel>Closing Time</FormLabel>
              <Field as={Input} type='time' name='closing_time' />
            </FormControl>
            <FormControl id='rating' mt={4}>
              <FormLabel>Rating</FormLabel>
              <NumberInput min={0} max={5} precision={2} step={0.1}>
                <NumberInputField
                  id='rating'
                  name='rating'
                  onChange={(evt) =>
                    setFieldValue("rating", Number(evt.target.value))
                  }
                />
              </NumberInput>
            </FormControl>

            <FormControl id='cuisines' mt={4}>
              <FormLabel>Cuisines</FormLabel>
              <Select
                height={"200px"}
                placeholder='Select cuisine'
                multiple={true}
                onChange={(evt) =>
                  setFieldValue(
                    "cuisines",
                    [].slice
                      .call(evt.target.selectedOptions)
                      .map((item: any) => item.value)
                  )
                }
              >
                {cuisines?.map((cuisine: CuisineOption) => (
                  <option key={cuisine.id} value={cuisine.id}>
                    {cuisine.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id='is_halal' mt={4}>
              <FormLabel>Is Halal?</FormLabel>
              <Checkbox
                name='is_halal'
                onChange={(evt) =>
                  setFieldValue("is_halal", evt.target.checked)
                }
              />
            </FormControl>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={isSubmitting}
              type='submit'
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RestaurantForm;
