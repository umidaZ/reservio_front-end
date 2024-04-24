export interface Review {
  id: string;
  restaurant: number;
  customer: string;
  rating: number;
  comment: string;
  timestamp: string;
  review_replies: ReviewReply[];
}

export interface ReviewReply {
  id?: number | string;
  restaurant?: number;
  customer?: number;
  review?: number;
  reply_text: string;
  timestamp?: string;
}

import {
  Box,
  VStack,
  Text,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface ReviewProps {
  review: Review;
  onReply: (reviewId: string, replyText: string) => void;
}

const ReviewComponent: React.FC<ReviewProps> = ({ review, onReply }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reply_text, setReplyText] = useState("");

  const handleReply = () => {
    onReply(review.id, reply_text);
    setReplyText("");
    onClose();
  };

  return (
    <VStack
      align='stretch'
      className='shadow'
      p={4}
      w={"100%"}
      borderRadius='md'
      spacing={4}
    >
      <Text fontWeight='bold'>Review:</Text>
      <Text>
        {review.customer}: {review.comment}
      </Text>
      {review.review_replies?.length !== 0 &&
        review.review_replies?.map((reply) => (
          <Box key={reply.id} pl={4}>
            <Text fontSize='sm'>Reply: {reply.reply_text}</Text>
          </Box>
        ))}
      <Button size='sm' onClick={onOpen}>
        Reply
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reply to Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='Type your reply here...'
              value={reply_text}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleReply}>
              Submit Reply
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ReviewComponent;
