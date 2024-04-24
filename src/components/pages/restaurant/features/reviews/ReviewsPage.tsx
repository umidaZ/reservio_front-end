import { Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReviewComponent, { Review, ReviewReply } from "./ReviewComponent";
import { getRestaurantReviews } from "../../../../../services/apiGetRestaurantReviews";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../../../../constants/BASE_URL";

// Example reviews data
const initialReviews: Review[] = [];

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const { data: reviewsList } = useQuery({
    queryKey: ["admin/reviews"],
    queryFn: () =>
      getRestaurantReviews(
        JSON.parse(localStorage.getItem("restaurant")!).restaurant
      ),
  });
  console.log(reviewsList);
  useEffect(() => {
    window.localStorage.setItem("reviews", JSON.stringify(reviewsList));
    setReviews(reviewsList);
  }, [reviewsList]);

  const handleReply = async (reviewId: string, replyText: string) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        const newReply: ReviewReply = {
          reply_text: replyText,
        };
        const updatedReplies = review?.review_replies
          ? [...review.review_replies, newReply]
          : [newReply];
        return { ...review, replies: updatedReplies };
      }
      return review;
    });
    setReviews(updatedReviews);
    await axios
      .post(
        BASE_URL +
          `restaurants/${
            JSON.parse(localStorage.getItem("restaurantInfo")!)?.id
          }/reviews/${reviewId}/review_reply/`,
        {
          reply_text: replyText,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    // Additionally, send the reply to your backend
  };

  return (
    <VStack spacing={4}>
      {!reviewsList?.length && <Text>No reviews found</Text>}
      {reviews?.map((review) => (
        <ReviewComponent
          key={review.id}
          review={review}
          onReply={handleReply}
        />
      ))}
    </VStack>
  );
};

export default ReviewsPage;
