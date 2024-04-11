/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { useDispatch } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../../constants/BASE_URL";
import { login } from "../../../../../features/userSlice";
import { useQuery } from "@tanstack/react-query";
import { getCuisines } from "../../../../../services/apiCuisines";

const CreateRestaurantAccountForm = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [client, setClient] = useState({
    confirm: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    username: "",
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
    is_halal: true,
    restaurant: "",
    cuisines: [1],
    user_id: "",
  });
  const [agree, setAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const { data: cuisines } = useQuery<[] | []>({
    queryKey: ["cuisines"],
    queryFn: getCuisines,
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setClient((prevClient) => ({
        ...prevClient,
        [name]: file,
      }));
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(client).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("role", "1");
      const response = await axios.post(
        BASE_URL + `api/auth/restaurant/registration/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast({
          title: "Registration has been successful",
          status: "success",
        });
        dispatch(login({ ...response?.data?.data, role: 1 }));
        window.localStorage.setItem("token", response?.data?.token);
        navigate("/restaurant/update-profile");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.error("Error", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Text my={4} textAlign={"center"} fontWeight={"bold"}>
        Create Restaurant formss
      </Text>
      <FormControl>
        <FormLabel>First name</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, first_name: e.target.value })}
          placeholder='First name'
          value={client?.first_name}
          name='first_name'
          required
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Last name</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, last_name: e.target.value })}
          placeholder='Last name'
          required
          value={client?.last_name}
          name='last_name'
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Username</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, username: e.target.value })}
          placeholder='Phone number'
          required
          value={client?.username}
          name='phone_number'
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, email: e.target.value })}
          placeholder='Email'
          type='email'
          name='email'
          required
          value={client?.email}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Contact number</FormLabel>
        <Input
          onChange={(e) =>
            setClient({ ...client, contact_number: e.target.value })
          }
          placeholder='Contact number'
          type='tel'
          name='contact_number'
          required
          value={client?.contact_number}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Website</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, website: e.target.value })}
          placeholder='Website'
          type='text'
          name='website'
          required
          value={client?.website}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Instagram</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, instagram: e.target.value })}
          placeholder='Instagram'
          type='text'
          name='instagram'
          required
          value={client?.instagram}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Telegram</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, telegram: e.target.value })}
          placeholder='Telegram'
          type='text'
          name='telegram'
          required
          value={client?.telegram}
        />
      </FormControl>
      <Select
        name='cuisines'
        placeholder='Cuisines'
        onChange={(e) => {
          const c: number[] = [Number(e.target.value)]!;
          setClient({
            ...client,
            cuisines: [...c],
          });
        }}
      >
        {cuisines?.data?.map((c: any, i: number) => {
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
            value={client.opening_time}
            onChange={(e) =>
              setClient({ ...client, opening_time: e.target.value })
            }
          />
        </FormControl>

        <FormControl id='closing_time' isRequired>
          <FormLabel>Closing Time</FormLabel>
          <Input
            type='time'
            name='closing_time'
            value={client.closing_time}
            onChange={(e) =>
              setClient({ ...client, closing_time: e.target.value })
            }
          />
        </FormControl>
      </Flex>

      <FormControl my={4} id='is_halal'>
        <Checkbox
          name='is_halal'
          isChecked={client.is_halal}
          onChange={(e) =>
            setClient({ ...client, is_halal: Boolean(e.target.checked) })
          }
        >
          Halal
        </Checkbox>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Location</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, location: e.target.value })}
          placeholder='Location'
          type='text'
          name='location'
          required
          value={client?.location}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Name</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, name: e.target.value })}
          placeholder='Name'
          type='text'
          name='name'
          required
          value={client?.name}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Upload Image</FormLabel>
        <Input
          type='file'
          name='photos'
          accept='image/*'
          onChange={handleFileChange}
        />
      </FormControl>
      <FormLabel mt={4}>Password</FormLabel>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          onChange={(e) => setClient({ ...client, password: e.target.value })}
          type={show ? "text" : "password"}
          value={client?.password}
          placeholder='Enter password'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormLabel mt={4}>Confirm password</FormLabel>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          onChange={(e) => setClient({ ...client, confirm: e.target.value })}
          type={show ? "text" : "password"}
          value={client?.confirm}
          placeholder='Confirm password'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormControl mt={4}>
        <input type='checkbox' onChange={(e) => setAgree(e.target.checked)} />{" "}
        Accept Terms & Conditions
      </FormControl>
      {agree && (
        <Button
          onClick={handleRegister}
          width={"100%"}
          isLoading={isLoading}
          loadingText='Creating your account...'
          colorScheme='green'
          mt={4}
        >
          Register
        </Button>
      )}
    </Box>
  );
};

export default CreateRestaurantAccountForm;
