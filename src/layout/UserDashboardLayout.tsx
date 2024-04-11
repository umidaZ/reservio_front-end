/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { CiMenuFries } from "react-icons/ci";
import { IoIosExit } from "react-icons/io";
import { MdDashboard, MdOutlineReviews } from "react-icons/md";
import { SiGoogledocs } from "react-icons/si";
import ReactStars from "react-rating-stars-component";
import Navbar from "../components/pages/ui/Navbar";

import { Link } from "react-router-dom";

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box position={"relative"}>
      <Navbar />
      <Box
        minHeight={"30vh"}
        backgroundImage={
          "url(https://img.jakpost.net/c/2016/09/29/2016_09_29_12990_1475116504._large.jpg)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box padding={5} display={"flex"} className='blur' width={"80%"}>
          <img
            src='https://foodbakery.pixfill.com/wp-content/uploads/2022/08/fb-restaurant-10-1-1.png'
            alt=''
          />
          <Box display={"flex"} flexDirection={"column"} gap={2} mx={10}>
            <Text color={"white"} fontSize={[18, 25, 30]}>
              McDonalds
            </Text>
            <Text color={"white"} fontSize={[12, 15, 20]}>
              Cheese Burger, Ice Cream & Potato Fries
            </Text>
            <ReactStars
              count={5}
              value={4.6}
              size={24}
              isHalf={true}
              edit={false}
              activeColor='#DA3743'
            />{" "}
          </Box>
        </Box>
      </Box>
      <Divider my={10} orientation='horizontal' />

      <Container maxW={["98%", "90%"]}>
        <Grid gap={5} gridTemplateAreas={`"sidebar table table table"`}>
          <GridItem
            padding={5}
            minH={"50vh"}
            minW={"250px"}
            className='shadow'
            gridArea={"sidebar"}
          >
            <List spacing={5}>
              <ListItem cursor={"pointer"} className='shadow' padding={2}>
                <Link to={"/restaurant/user-dashboard/dashboard-orders"}>
                  <ListIcon as={MdDashboard} color='green.500' />
                  Dashboard
                </Link>
              </ListItem>
              <ListItem cursor={"pointer"} className='shadow' padding={2}>
                <Link to={"/restaurant/user-dashboard/restaurant-details"}>
                  <ListIcon as={MdDashboard} color='green.500' />
                  Restaurant Details
                </Link>
              </ListItem>
              <ListItem cursor={"pointer"} className='shadow' padding={2}>
                <Link to='/restaurant/user-dashboard/menu-builder'>
                  <ListIcon as={CiMenuFries} color='green.500' />
                  Menu Builder
                </Link>
              </ListItem>
              <ListItem cursor={"pointer"} className='shadow' padding={2}>
                <Link to='/restaurant/user-dashboard/CuisinePage'>
                  <ListIcon as={CiMenuFries} color='green.500' />
                  Cuisine Page
                </Link>
              </ListItem>

              <ListItem cursor={"pointer"} className='shadow' padding={2}>
                <Link to='/restaurant/user-dashboard/reviews'>
                  <ListIcon as={MdOutlineReviews} color='green.500' />
                  Reviews
                </Link>
              </ListItem>
              <ListItem cursor={"pointer"} className='shadow' padding={2}>
                <Link to='/restaurant/user-dashboard/transactions'>
                  <ListIcon as={SiGoogledocs} color='green.500' />
                  Transactions
                </Link>
              </ListItem>
              <ListItem cursor={"pointer"} className='shadow' padding={2}>
                <ListIcon as={IoIosExit} color='green.500' />
                Sign out
              </ListItem>
            </List>
          </GridItem>
          <GridItem
            padding={5}
            minH={"50vh"}
            className='shadow'
            gridArea={"table"}
          >
            {/* <RestaurantForm /> */}
            {/* <RestaurantMenuBuilder /> */}
            {/* <ReviewsPage /> */}
            {children}
            {/* <Orders /> */}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserDashboardLayout;