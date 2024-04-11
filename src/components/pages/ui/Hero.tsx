import { Box, Button, Divider, Text, useToast } from "@chakra-ui/react";
import Filter from "./Filter";
import PeopleCounter from "./PeopleCounter";
import { useDispatch } from "react-redux";
import { search } from "../../../features/searchSlice";
import { useState } from "react";
import { SearchState } from "../../../features/searchSlice";

const Hero = () => {
  const dispatch = useDispatch();
  const [userSearch, setUserSearch] = useState<SearchState>({
    date: "",
    numberOfGuests: 0,
    time: "",
    others: "",
  });
  const toast = useToast();
  return (
    <Box
      minH={"50vh"}
      display={"flex"}
      flexDirection={"column"}
      flexWrap={"wrap"}
      gap={10}
      justifyContent={"center"}
      py={20}
      px={5}
      backgroundColor={"brand.bg"}
    >
      <Text
        textAlign={"center"}
        color={"white"}
        fontSize={[18, 25, 35]}
        fontWeight={"bolder"}
      >
        Embark on a Flavorful Journey Find Your Perfect Table
      </Text>
      <Box
        display={["block", "flex"]}
        gap={2}
        rounded={5}
        justifyContent={"center"}
        alignItems={"center"}
        mx={"auto"}
        // flexDirection={["column", "row", "row"]}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        width={["98%", "70%"]}
      >
        <Box
          padding={1}
          backgroundColor={"white"}
          display={"flex"}
          rounded={5}
          flexDirection={["column", "row", "row"]}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
          mt={10}
        >
          <Filter
            type='date'
            onChange={(e) => setUserSearch({ ...userSearch, date: e })}
            placeholder='Choose date'
          />{" "}
          <Divider orientation='vertical' />
          <Filter
            onChange={(e) => setUserSearch({ ...userSearch, time: e })}
            placeholder='Choose time'
            type='time'
          />{" "}
          <Divider orientation='vertical' />
          <PeopleCounter
            onChange={(e) =>
              setUserSearch({ ...userSearch, numberOfGuests: e })
            }
          />
        </Box>
        <Box
          padding={1}
          backgroundColor={"white"}
          display={"flex"}
          gap={2}
          rounded={5}
          width={"50%"}
          justifyContent={"center"}
          flexDir={["column", "row"]}
          alignItems={"center"}
          mt={10}
        >
          <Filter
            type='text'
            onChange={(e) => setUserSearch({ ...userSearch, others: e })}
            placeholder='Location, Restaurant, or Cuisine'
          />{" "}
          <Divider orientation='vertical' />
        </Box>
        <Box
          padding={1}
          display={"flex"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
          mt={10}
        >
          <Button
            rounded={0}
            size={"lg"}
            minW={"200px"}
            padding={7}
            color={"white"}
            backgroundColor={"brand.button"}
            onClick={() => {
              const { date, time, numberOfGuests, others } = userSearch;
              if (date && time && numberOfGuests && others) {
                dispatch(
                  search({
                    date,
                    time,
                    numberOfGuests,
                    others,
                  })
                );
              } else {
                toast({
                  title: "Please fill all the fields",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }
            }}
          >
            {" "}
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
