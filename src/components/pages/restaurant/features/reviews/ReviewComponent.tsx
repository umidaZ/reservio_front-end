export interface Review {
  id: string;
  text: string;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  text: string;
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
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    onReply(review.id, replyText);
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
      <Text>Abdulboriy M: {review.text}</Text>
      {review.replies?.length !== 0 &&
        review.replies?.map((reply) => (
          <Box key={reply.id} pl={4}>
            <Text fontSize='sm'>Reply: {reply.text}</Text>
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
              value={replyText}
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
