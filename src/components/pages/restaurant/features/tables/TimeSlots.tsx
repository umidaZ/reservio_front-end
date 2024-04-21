/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { MdOpenInNew } from "react-icons/md";

function TimeSlots({ time_slots }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button rightIcon={<MdOpenInNew />} onClick={onOpen}>
        Time slots
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {time_slots?.length === 0 && <Text>No time slots found</Text>}
            {time_slots?.map((e: any, i: number) => {
              return (
                <Text key={i}>
                  #Reservation {i + 1} | {e.date} | {e.start_time} |{" "}
                  {e.end_time}
                </Text>
              );
            })}
            <Text></Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TimeSlots;
