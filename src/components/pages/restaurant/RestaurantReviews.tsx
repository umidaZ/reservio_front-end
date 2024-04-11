import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/BASE_URL";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { useQueryClient } from "@tanstack/react-query";
import NoDataFound from "../ui/NoDataFound";

interface Review {
  customer: number | null | string;
  restaurant?: number | null | string;
  rating: number;
  comment: string;
}

const ReviewForm = () => {
  const { restaurantId } = useParams();
  const queryClient = useQueryClient();
  const { customer, role } = useSelector((s: RootState) => s.user);
  const [review, setReview] = useState<Review>({
    customer: customer!,
    rating: 1,
    comment: "",
    restaurant: restaurantId,
  });
  const toast = useToast();
  // restaurants/1/reviews/
  const handleSubmit = async () => {
    // You can perform validation here before submitting
    // For simplicity, I'm just displaying the review data in a toast
    console.log(review, { token: localStorage.getItem("token") });
    await axios
      .post(BASE_URL + `reviews/`, review, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((r) => {
        console.log(r);
        queryClient.invalidateQueries();
      })
      .catch((err) => {
        console.log(err);
      });
    toast({
      title: "Review Submitted",

      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // Reset the form after submission
    setReview({
      rating: 0,
      comment: "",
      customer: id,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (role == 1) {
    return (
      <>
        <Text my={10} fontSize={[18, 25]} color={"gray.800"}>
          What people are saying{" "}
        </Text>
        <NoDataFound
          colorScheme='red'
          text='Restaurant owners  can not leave reviews.'
        />
      </>
    );
  }

  return (
    <Box p={4} borderWidth='1px' borderRadius='lg'>
      <Text my={10} fontSize={[18, 25]} color={"gray.800"}>
        What people are saying{" "}
      </Text>
      <Text fontSize='xl' fontWeight='bold' mb={4}>
        Leave a Review
      </Text>
      <FormControl mb={4}>
        <FormLabel>Rating (1-5)</FormLabel>
        <input
          type='number'
          name='rating'
          min={1}
          max={5}
          value={review.rating}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Comment</FormLabel>
        <Textarea
          name='comment'
          value={review.comment}
          onChange={handleChange}
          placeholder='Write your comment here...'
          size='md'
          resize='vertical'
          style={{ padding: "0.5rem" }}
        />
      </FormControl>
      <Button colorScheme='blue' onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ReviewForm;
