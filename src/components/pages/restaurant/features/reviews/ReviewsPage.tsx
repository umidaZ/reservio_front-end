import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import ReviewComponent, { Reply, Review } from "./ReviewComponent";

// Example reviews data
const initialReviews: Review[] = [
  {
    id: "1",
    text: "Great service! ♥️",
    replies: [],
  },
  // Add more reviews
];

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleReply = (reviewId: string, replyText: string) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        const newReply: Reply = { id: Date.now().toString(), text: replyText };
        const updatedReplies = review.replies
          ? [...review.replies, newReply]
          : [newReply];
        return { ...review, replies: updatedReplies };
      }
      return review;
    });
    setReviews(updatedReviews);
    // Additionally, send the reply to your backend
  };

  return (
    <VStack spacing={4}>
      {reviews.map((review) => (
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