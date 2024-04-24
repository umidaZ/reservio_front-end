/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text } from "@chakra-ui/react";
import Hero from "../components/pages/ui/Hero";
import Navbar from "../components/pages/ui/Navbar";
import RestaurantCard from "../components/pages/ui/RestaurantCard";

import Footer from "../components/pages/ui/Footer";

import { useQuery } from "@tanstack/react-query";
import Loader from "../components/pages/ui/Loader";
import NoDataFound from "../components/pages/ui/NoDataFound";
import { getRestaurants } from "../services/apiGetRestaurant";
import { useEffect, useState } from "react";

const RestaurantLayout = () => {
  const { data: d, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });

  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState(d?.results);
  useEffect(() => {
    setData(d?.results);
    setTempData(d?.results);
  }, [isLoading, d?.results]);
  return (
    <Box>
      <Navbar />
      <Hero data={data} setData={setData} tempData={tempData} />

      {data?.length !== 0 && (
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
      {data?.length === 0 && (
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
        {data?.map((item: any, index: number) => {
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
