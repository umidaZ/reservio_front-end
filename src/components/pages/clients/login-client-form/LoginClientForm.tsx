import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { login } from "../../../../features/userSlice";

const LoginClientForm = () => {
  const [client, setClient] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setIsLoading(true);

    await axios
      .post(BASE_URL + `api/auth/login/`, client)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          dispatch(login({ ...res.data.user, customer: res.data.customer }));
          window.localStorage.setItem("token", res.data.access);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        }
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box>
      <Text my={4} textAlign={"center"} fontWeight={"bold"}>
        Login as a client
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

export default LoginClientForm;
