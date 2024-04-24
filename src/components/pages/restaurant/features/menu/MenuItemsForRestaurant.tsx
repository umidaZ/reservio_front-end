/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL_IMG } from "../../../../../constants/BASE_URL";
import { getMenuCategories } from "../../../../../services/apiGetMenuCategories";
import { getMenuItems } from "../../../../../services/apiGetMenuItems";
interface MenuItem {
  id: number;
  name: string;
  description: string;
  unit_price: number;
  menu: string | number;
  photo: File | null;
}

const initialMenuItems: MenuItem[] = [];
const MenuItemsForRestaurant = () => {
  const params = useParams();

  const [cat, setCat] = useState(8);
  const [categoryMenuItems, setCategoryMenuItems] =
    useState<MenuItem[]>(initialMenuItems);

  const { data: categories } = useQuery({
    queryKey: ["menuCategory"],
    queryFn: () => getMenuCategories(params.restaurantId!),
  });
  console.log(cat);
  return (
    <Box>
      <Heading>Menu Items</Heading>
      <Flex gap={5} my={5}>
        {categories?.data?.map((e: any, i: number) => {
          return (
            <Box key={i}>
              <input
                onChange={async (e) => {
                  console.log(e.target.value);
                  setCat(Number(e.target.value));
                  await getMenuItems(e.target.value).then((r) => {
                    console.log({ rrr: r });
                    if (r.status == "ok") {
                      setCategoryMenuItems(r.data);
                    }
                  });
                }}
                type='radio'
                value={e.id}
                name={"menu"}
                key={i}
              />{" "}
              {e.name}
            </Box>
          );
        })}
      </Flex>
      <Grid
        gap={5}
        gridTemplateColumns={`repeat(auto-fit, minmax(300px, 1fr))`}
      >
        {categoryMenuItems?.map((e) => {
          return (
            <GridItem>
              <Card key={e.id} my={2}>
                <CardBody>
                  <Img rounded={5} src={BASE_URL_IMG + e.photo} />

                  <Box py={3}>
                    <Text>
                      <b>Name:</b> {e.name}
                    </Text>
                    <Text>
                      <b>Description:</b> {e.description}
                    </Text>
                    <Text>
                      <b>Price:</b> ${e.unit_price}
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MenuItemsForRestaurant;
