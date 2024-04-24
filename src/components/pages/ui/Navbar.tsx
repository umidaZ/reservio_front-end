import { Box, Button, Img } from "@chakra-ui/react";
import logo from "../../../assets/logo.svg";
import MenuDropdown from "./MenuDropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import LoginAccount from "../common/LoginAccount";
import { logout } from "../../../features/userSlice";
import CreateAccount from "../common/CreateAccount";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  return (
    <nav>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={[2, 3]}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Link to='/'>
            <Img width={["100px", "200px"]} src={logo} alt='logo' />
          </Link>
          <MenuDropdown />
        </Box>
        {user.role == 2 && (
          <Link to={"/my-reservations"}>
            <Button marginRight={[2, 5]}>My reservations</Button>
          </Link>
        )}
        <Box display={"flex"}>
          {token ? (
            <Button marginRight={[2, 5]}>
              Username: {user.username || user.first_name}
            </Button>
          ) : (
            <LoginAccount>
              <Button
                marginRight={[2, 5]}
                backgroundColor={"brand.button"}
                color={"white"}
              >
                {user.name ? user.name : "Login"}
              </Button>
            </LoginAccount>
          )}
          {token ? (
            <Button
              colorScheme='red'
              onClick={() => {
                dispatch(logout());
                localStorage.clear();
                window.location.href = "/";
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
              marginRight={[2, 5]}
            >
              Logout
            </Button>
          ) : (
            <CreateAccount>
              <Button
                marginRight={[2, 5]}
                backgroundColor={"brand.button"}
                color={"white"}
              >
                {user.name ? user.name : "Sign up"}
              </Button>
            </CreateAccount>
          )}
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
