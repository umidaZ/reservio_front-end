import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Checkbox,
  Select,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { BASE_URL } from "../../../constants/BASE_URL";

interface CuisineOption {
  id: string;
  name: string;
}

// Mock data for cuisines, replace with your actual data source
const cuisineOptions: CuisineOption[] = [
  { id: "1", name: "Italian" },
  { id: "2", name: "Japanese" },
  // Add more cuisines as needed
];

interface RestaurantFormValues {
  name: string;
  slug: string;
  location: string;
  description?: string;
  photos?: File; // Simplified for demonstration
  contact_number: string;
  email: string;
  website?: string;
  instagram?: string;
  telegram?: string;
  opening_time: string; // Consider using a string for time input and validation
  closing_time: string;
  rating: number;
  is_halal: boolean;
  cuisines: string[]; // IDs of selected cuisines
}

const RestaurantForm: React.FC = () => {
  const toast = useToast();

  const handleSubmit = async (values: RestaurantFormValues) => {
    console.log(values);
    await axios.patch(BASE_URL);
    toast({
      title: "Form submitted!",
      description: "Your form has been submitted successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Formik
        initialValues={{
          name: "",
          slug: "",
          location: "",
          description: "",
          contact_number: "",
          email: "",
          website: "",
          instagram: "",
          telegram: "",
          opening_time: "",
          closing_time: "",
          rating: 0,
          is_halal: false,
          cuisines: [],
        }}
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
                // onChange={(event) => {
                //   setFieldValue("photos", event?.currentTarget?.files?[0)
                // }}
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
                    setFieldValue("rating", parseFloat(evt.target.value))
                  }
                />
              </NumberInput>
            </FormControl>

            <FormControl id='cuisines' mt={4}>
              <FormLabel>Cuisines</FormLabel>
              <Select
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
                {cuisineOptions.map((cuisine) => (
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
