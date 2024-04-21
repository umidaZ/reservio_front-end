import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../features/userSlice";

import axios from "axios";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { RootState } from "../../../../store/Store";
const CreateClientForm = () => {
  const userData = useSelector((s: RootState) => s.user);
  const [show, setShow] = useState(false);
  const [client, setClient] = useState(userData);
  const [agree, setAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const handleRegister = async () => {
    setIsLoading(true);
    await axios
      .post(BASE_URL + `api/auth/registration/`, { ...client, role: 2 })
      .then(async (response) => {
        console.log(response);
        if (response.status === 201) {
          toast({
            title: "Registration has been successful",
            status: "success",
          });
          dispatch(login({ ...response?.data?.data, role: 2 }));
          window.localStorage.setItem("token", response?.data?.token);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        console.error("Error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Box>
      <Text my={4} textAlign={"center"} fontWeight={"bold"}>
        Create Client Account Form
      </Text>
      <FormControl>
        <FormLabel>First name</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, first_name: e.target.value })}
          placeholder='First name'
          value={client.first_name}
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
          value={client.last_name}
          name='last_name'
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Username</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, username: e.target.value })}
          placeholder='Phone number'
          required
          value={client.username}
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
          value={client.email}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Phone number</FormLabel>
        <Input
          onChange={(e) =>
            setClient({ ...client, phone_number: e.target.value })
          }
          placeholder='Phone number'
          required
          value={client.phone_number}
          name='phone_number'
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Date of birth</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, birth_date: e.target.value })}
          placeholder='Birth Date'
          type='date'
          required
          value={client?.birth_date}
          name='phone_number'
        />
      </FormControl>
      <FormLabel mt={4}>Password</FormLabel>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          onChange={(e) => setClient({ ...client, password: e.target.value })}
          type={show ? "text" : "password"}
          value={client.password}
          placeholder='Enter password'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
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
          value={client.confirm}
          placeholder='Confirm password'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
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

export default CreateClientForm;
