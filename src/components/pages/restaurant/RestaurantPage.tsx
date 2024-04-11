import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Navbar from "../ui/Navbar";

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  RestaurantData,
  dummyRestaurants,
} from "../../../constants/restaurants";
import Footer from "../ui/Footer";
import MakeReservation from "./MakeReservation";
import PopularDishes from "./features/dishes - cuisines/PopularDishes";
import RestaurantMenu from "./features/menu/RestaurantMenu";
import RestaurantOverview from "./RestaurantOverview";
import RestaurantPhotos from "./RestaurantPhotos";
import RestaurantReviews from "./RestaurantReviews";

const RestaurantPage = () => {
  const [restaurant, setRestaurant] = useState<RestaurantData>();
  const { restaurantSlug } = useParams();
  const l = useLocation().state;
  const { img } = l;
  useEffect(() => {
    setRestaurant(
      dummyRestaurants.find(
        (restaurant: RestaurantData) =>
          restaurant.restaurantLink === restaurantSlug
      )
    );
    console.log(restaurant);
  }, []);

  return (
    <Box>
      <Navbar />
      <Box
        backgroundImage={
          img ||
          "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        display={"flex"}
        padding={10}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        justifyContent={"end"}
        backgroundPosition={"center"}
        height={"60vh"}
      >
        <Button leftIcon={<AddIcon />}>Save this restaurant</Button>
      </Box>
      <Container transform={`translateY(-150px)`} maxW={"95%"}>
        <Box
          // display={["flex", "grid"]}
          display={{ base: "flex", md: "grid", lg: "grid" }}
          flexDirection={"column"}
          gap={5}
          gridTemplateAreas={[`"restaurant-info  restaurant-info reservation"`]}
        >
          <Box
            className='shadow'
            gridArea={"restaurant-info"}
            minHeight={"30vh"}
            backgroundColor={"white"}
            padding={2}
            width={"100%"}
            rounded={5}
          >
            <Tabs>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Popular Dishes</Tab>
                <Tab>Photos</Tab>
                <Tab>Menu</Tab>
                <Tab>Reviews</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <RestaurantOverview data={restaurant} />
                </TabPanel>
                <TabPanel>
                  <PopularDishes />
                </TabPanel>
                <TabPanel>
                  <RestaurantPhotos />
                </TabPanel>
                <TabPanel>
                  <RestaurantMenu />
                </TabPanel>
                <TabPanel>
                  <RestaurantReviews />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <MakeReservation />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default RestaurantPage;
