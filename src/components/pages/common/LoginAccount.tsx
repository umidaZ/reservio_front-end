import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LoginClientForm from "../clients/login-client-form/LoginClientForm";
import LoginRestaurant from "../restaurant/features/sign-in-up/LoginRestaurant";

function LoginAccount({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCustomer, setIsCustomer] = useState(false);

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Switch
              onChange={(e) => setIsCustomer(e.target.checked)}
              size='md'
            />{" "}
            {isCustomer ? "Are you client? " : "Are you restaurant owner? "}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isCustomer ? <LoginClientForm /> : <LoginRestaurant />}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginAccount;
