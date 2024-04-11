/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Center, Text } from "@chakra-ui/react";
import Navbar from "../components/pages/ui/Navbar";
import Hero from "../components/pages/ui/Hero";
import TopRestaurants from "../components/pages/TopRestaurants";
import RestaurantCard from "../components/pages/ui/RestaurantCard";

import Footer from "../components/pages/ui/Footer";
// import { dummyRestaurants } from "../constants/restaurants";

import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../services/apiGetRestaurant";
import Loader from "../components/pages/ui/Loader";
import NoDataFound from "../components/pages/ui/NoDataFound";

const RestaurantLayout = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });
  console.log(data, isError, isLoading);
  return (
    <Box>
      <Navbar />
      <Hero />
      {/* <TopRestaurants /> */}
      {data?.results?.length !== 0 && (
        <Text
          fontWeight={"bolder"}
          fontSize={[18, 25, 35]}
          letterSpacing={5}
          textAlign={"center"}
          mb={10}
        >
          Select from the top-rated dining establishments
        </Text>
      )}
      {isLoading && <Loader />}
      {data?.results?.length === 0 && (
        <NoDataFound colorScheme='yellow' text='No  restaurants found.' />
      )}
      <Box
        padding={[10, 20]}
        display={"grid"}
        gap={10}
        gridTemplateColumns={[
          "repeat(auto-fill, minmax(300px, 1fr))",
          "repeat(auto-fill, minmax(400px, 1fr))",
          "repeat(auto-fill, minmax(700px, 1fr))",
        ]}
      >
        {data?.results?.map((item: any, index: number) => {
          console.log({ item });
          return (
            <RestaurantCard
              key={index}
              img={item.photos || "./placeholder.png"}
              address={item.location}
              name={item.name}
              rating={String(item.rating)}
              restaurantLink={item.slug}
              {...item}
            />
          );
        })}
      </Box>
      <Footer />
    </Box>
  );
};

export default RestaurantLayout;
