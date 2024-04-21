/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

// @ts-nocheck

import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Img,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { CiForkAndKnife, CiMoneyBill } from "react-icons/ci";
import { MdOutlineReviews } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { useLocation, useParams } from "react-router-dom";
import halal from "../../../../public/halal.png";
import { RestaurantState } from "../../../features/restaurantSlice";
import { getRestaurantReviews } from "../../../services/apiGetRestaurantReviews";
import NoDataFound from "../ui/NoDataFound";
import ReviewForm from "./RestaurantReviews";
import { getCuisines } from "../../../services/apiCuisines";

const RestaurantOverview = ({ data }: any) => {
  const l: RestaurantState = useLocation().state;
  const { restaurantId } = useParams();
  const { name, rating, reviews, cuisines, topDishes, photos, is_halal } = l;
  const { data: reviewList } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getRestaurantReviews(restaurantId),
  });
  const { data: c } = useQuery({
    queryKey: ["cuisines"],
    queryFn: () => getCuisines(),
  });

  return (
    <Box>
      <Text fontWeight={"bold"} fontSize={[13, 24, 26]}>
        {name} {rating || " - No rating yet"}
      </Text>
      {is_halal && <Img src={halal} width={"100px"} />}
      <Divider my={5} orientation='horizontal' />
      <Flex alignItems={"center"} gap={10}>
        <Flex alignItems={"center"} gap={2}>
          <ReactStars
            count={5}
            value={rating || 0}
            size={24}
            isHalf={true}
            edit={false}
            activeColor='#DA3743'
          />{" "}
          <Text fontWeight={"bold"} mt={0}>
            {rating || " - No rating yet"}
          </Text>
          <Flex alignItems={"center"}>
            <MdOutlineReviews size={24} />
            <Text pl={2}>{reviews || "0 reviews"}</Text>
          </Flex>
          <Flex alignItems={"center"}>
            <CiMoneyBill size={24} />
            <Text pl={2}>{data?.money || "$10 - $500"}</Text>
          </Flex>
          <Flex alignItems={"center"}>
            <CiForkAndKnife size={24} />
            <Text pl={2}>
              {console.log(cuisines)}
              {c
                ?.filter((e) => e.id == cuisines[0])
                ?.map((i) => i.name)
                .join(", ") || "- Cuisines not specified"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider my={5} orientation='horizontal' />
      <Flex gap={5} alignItems={"center"}>
        <Text fontSize={16} color={"gray.500"}>
          Top Tags:{" "}
        </Text>
        <Tag p={3} rounded={"full"}>
          Vegetarian Friendly
        </Tag>{" "}
        <Tag p={3} rounded={"full"}>
          Vegan Options
        </Tag>
      </Flex>
      <Divider my={5} orientation='horizontal' />
      <Text fontSize={18} color={"gray.800"}>
        Top Dishes:{" "}
      </Text>
      <Divider my={5} orientation='horizontal' />
      {topDishes ? (
        <Box maxH={"300px"} overflowY={"scroll"}>
          <Card p={3}>
            <Flex gap={5}>
              <Img
                width={"200px"}
                src='https://www.advantour.com/img/uzbekistan/uzbek-dishes.jpg'
              />
              <Box pt={2}>
                <Text fontWeight={"bold"} fontSize={16}>
                  Somsa
                </Text>
                <Text fontWeight={"bold"} fontSize={16}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sapiente cupiditate tenetur reprehenderit possimus
                </Text>
                <Text fontWeight={"bold"} fontSize={16}>
                  Somsa
                </Text>
                <Text fontWeight={"bold"} fontSize={16}>
                  Somsa
                </Text>
              </Box>
            </Flex>
          </Card>
          <Card p={3}>
            <Flex gap={5}>
              <Img
                width={"200px"}
                src='https://www.advantour.com/img/uzbekistan/uzbek-dishes.jpg'
              />
              <Box pt={2}>
                <Text fontWeight={"bold"} fontSize={16}>
                  Somsa
                </Text>
                <Text fontWeight={"bold"} fontSize={16}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sapiente cupiditate tenetur reprehenderit possimus
                </Text>
                <Text fontWeight={"bold"} fontSize={16}>
                  Somsa
                </Text>
                <Text fontWeight={"bold"} fontSize={16}>
                  Somsa
                </Text>
              </Box>
            </Flex>
          </Card>
          <Card p={3}>
            <Flex gap={5}>
              <Img
                width={"200px"}
                src='https://www.advantour.com/img/uzbekistan/uzbek-dishes.jpg'
              />
              <Box pt={2}>
                <Text fontWeight={"bold"} fontSize={16}>
                  Somsa
                </Text>
                <Text fontWeight={"bold"} fontSize={16}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sapiente cupiditate tenetur reprehenderit possimus
                </Text>
                <Text fontWeight={"bold"} fontSize={16}>
                  Somsa
                </Text>
                <Text fontWeight={"bold"} fontSize={16}>
                  Somsa
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
      ) : (
        <NoDataFound colorScheme='yellow' text='No data found' />
      )}
      <Divider my={5} orientation='horizontal' />
      <Text my={10} fontSize={[18, 25]} color={"gray.800"}>
        Photos
      </Text>
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(auto-fit, minmax(200px, 1fr))"}
        gap={5}
      >
        <Img
          gridColumnStart={1}
          gridColumnEnd={3}
          gridRowEnd={3}
          gridRowStart={1}
          src={photos}
        />
        {/* <Img src='https://www.advantour.com/img/uzbekistan/uzbek-dishes.jpg' />
        <Img src='https://www.advantour.com/img/uzbekistan/uzbek-dishes.jpg' />
        <Img src='https://www.advantour.com/img/uzbekistan/uzbek-dishes.jpg' />
        <Img src='https://www.advantour.com/img/uzbekistan/uzbek-dishes.jpg' /> */}
      </Box>
      <Divider my={5} orientation='horizontal' />

      <ReviewForm />
      <Stack my={3} spacing={4}>
        {reviewList?.map((value, index) => {
          return (
            <Box key={index} p={5} shadow='md' borderWidth='1px'>
              <Flex alignItems='center'>
                <Avatar size='sm' src='https://bit.ly/broken-link' />
                <Text ml={3} fontWeight='bold'>
                  {value?.customer}
                </Text>
              </Flex>
              <Text mt={2}>{value?.comment}</Text>
              <ReactStars
                count={5}
                value={value?.rating}
                size={24}
                isHalf={true}
                edit={false}
                activeColor='#DA3743'
              />{" "}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default RestaurantOverview;
