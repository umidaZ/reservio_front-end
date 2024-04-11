import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { UserState } from "../../../features/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import axios from "axios";
import { BASE_URL } from "../../../constants/BASE_URL";

interface FormData {
  id: number | null;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: number;
  phone: string;
  birth_date: string;
}

const UpdateClientProfilePage = () => {
  const user = useSelector((s: RootState) => s.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData] = useState<FormData | UserState>(user);
  const [customer, setCustomer] = useState({
    phone: "",
    birth_date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    console.log({
      customer: user,
      //   token: localStorage.getItem("token"),
    });
    // Add your form submission logic here
    await axios
      .patch(BASE_URL + `customers/${formData.id}/`, customer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Navbar />
      <Box p={[2, 5]}>
        <Heading textAlign={"center"} my={5}>
          Update Client Profile
        </Heading>
        <Center>
          <Box w='80%'>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align='stretch'>
                <FormControl id='username'>
                  <FormLabel>Username</FormLabel>
                  <Input
                    disabled
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id='email'>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type='email'
                    disabled
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id='first_name'>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type='text'
                    name='first_name'
                    disabled
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id='last_name'>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type='text'
                    disabled
                    name='last_name'
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id='phone'>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type='text'
                    name='phone'
                    value={customer.phone}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id='birth_date'>
                  <FormLabel>Birth date</FormLabel>
                  <Input
                    type='date'
                    name='birth_date'
                    value={customer.birth_date}
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  type='submit'
                  colorScheme='green'
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  loadingText='Submitting changes...'
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </Center>
      </Box>
      <Footer />
    </>
  );
};

export default UpdateClientProfilePage;
