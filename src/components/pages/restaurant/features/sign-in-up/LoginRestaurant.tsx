/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../../../../constants/BASE_URL";
import { login } from "../../../../../features/userSlice";
import { useNavigate } from "react-router-dom";

const LoginRestaurant = () => {
  const [client, setClient] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setErrorMessage("");
    setIsLoading(true);
    await axios
      .post(BASE_URL + `api/auth/login/`, client)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          dispatch(login(res.data.user));
          window.localStorage.setItem("token", res.data.access);
          setTimeout(() => {
            navigate("/restaurant/user-dashboard/dashboard-orders");
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }, 1000);
        }
      })
      .catch((err: any) => {
        toast({
          title: Object.values(err.response.data).join(" "),
          status: "error",
        });
        setErrorMessage(Object.values(err.response.data).join(" "));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box>
      <Text my={4} textAlign={"center"} fontWeight={"bold"}>
        Login as a restaurant owner
      </Text>
      <Text my={4} textAlign={"center"} fontWeight={"bold"} color={"red"}>
        {errorMessage}
      </Text>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, username: e.target.value })}
          placeholder='Username'
          value={client?.username}
          name='username'
          required
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          onChange={(e) => setClient({ ...client, password: e.target.value })}
          placeholder='Password'
          required
          value={client?.password}
          name='password'
        />
      </FormControl>

      <Button
        onClick={handleLogin}
        width={"100%"}
        isLoading={isLoading}
        loadingText='Logging you in...'
        colorScheme='green'
        mt={4}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginRestaurant;
