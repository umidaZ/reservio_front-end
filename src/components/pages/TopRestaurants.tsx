import { Box, Img, Text } from "@chakra-ui/react";
import img1 from "../../assets/images/1.png";
import img2 from "../../assets/images/2.png";
import img3 from "../../assets/images/3.png";
import img4 from "../../assets/images/4.png";
import img5 from "../../assets/images/5.png";
import img6 from "../../assets/images/6.png";
import img7 from "../../assets/images/7.png";
import img8 from "../../assets/images/8.png";
import { Link } from "react-router-dom";
const data = [
  {
    img: img1,
    restaurantLink: "/restaurant/id",
  },
  {
    img: img2,
    restaurantLink: "/restaurant/id",
  },
  {
    img: img3,
    restaurantLink: "/restaurant/id",
  },
  {
    img: img4,
    restaurantLink: "/restaurant/id",
  },
  {
    img: img5,
    restaurantLink: "/restaurant/id",
  },
  {
    img: img6,
    restaurantLink: "/restaurant/id",
  },
  {
    img: img7,
    restaurantLink: "/restaurant/id",
  },
  {
    img: img8,
    restaurantLink: "/restaurant/id",
  },
];
const TopRestaurants = () => {
  return (
    <Box my={20} px={20}>
      <Text fontSize={[18, 25, 35]} letterSpacing={5} fontWeight={"bolder"}>
        Top Restaurants
      </Text>
      <Text
        color={"gray.500"}
        fontSize={[13, 15, 18]}
        letterSpacing={5}
        fontWeight={"bolder"}
      >
        Explore restaurants, bars, and cafés by locality
      </Text>
      <Box
        mt={10}
        display={"flex"}
        flexWrap={"wrap"}
        gap={[3, 5]}
        justifyContent={"space-between"}
      >
        {data.map((item, index) => {
          return (
            <Link key={index} to={item.restaurantLink}>
              <Img width={["100px", "180px"]} src={item.img} />
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default TopRestaurants;
