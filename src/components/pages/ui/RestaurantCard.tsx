import { Box, Card, Flex, Img, Tag, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export interface RestaurantCardProps {
  img: string;
  restaurantLink: string;
  address: string;
  name: string;
  rating?: string;
  id?: number;
}
const RestaurantCard = (props: RestaurantCardProps) => {
  const { img, restaurantLink, name, address, rating, id } = props;

  return (
    <Link to={`restaurant/${restaurantLink}/${id}`} state={props}>
      <Card position={"relative"} paddingX={3} paddingY={5}>
        <Flex gap={5} alignItems={"center"}>
          <Img height={["100px", "200px"]} rounded={5} src={img} alt='' />
          <Flex flexDirection={"column"}>
            <Text
              fontWeight={"bold"}
              fontSize={[11, 20, 22]}
              letterSpacing={3}
              mb={4}
            >
              {name}
            </Text>
            <Text
              fontWeight={"bold"}
              fontSize={[11 - 3, 20 - 3, 22 - 3]}
              letterSpacing={3}
              color={"gray.500"}
              mb={4}
            >
              {address}
            </Text>
            <Text
              fontWeight={"bold"}
              fontSize={[18 - 3, 20 - 3, 22 - 3]}
              letterSpacing={3}
              color={"yellow.500"}
              mb={4}
            >
              ⭐️ {rating}
            </Text>
          </Flex>
        </Flex>
        <Box position={"absolute"} top={[2, 5]} left={[-7, -5]}>
          <Tag
            backgroundColor='brand.tag'
            rounded={0}
            color={"white"}
            paddingX={5}
            paddingY={3}
          >
            OPEN
          </Tag>
          <Box
            clipPath={"polygon(100% 0, 0 0, 100% 100%)"}
            backgroundColor='brand.tag'
            minH={"20px"}
            width={"20px"}
          ></Box>
        </Box>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
