import { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function PatientModal({ isOpen, onClose, onSave }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);

  function handleSave() {
    const data = { firstName, lastName };

    if (!firstName || !lastName) {
      if (!firstName) setIsFirstNameError(true);
      if (!lastName) setIsLastNameError(true);
    } else {
      handleClose();
      onSave(data);
    }
  }

  function handleClose() {
    setFirstName("");
    setLastName("");
    setIsFirstNameError(false);
    setIsLastNameError(false);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Patient</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={isFirstNameError} mb="16px">
            <FormLabel>First name</FormLabel>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {isFirstNameError ? (
              <FormHelperText>First name is required</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={isLastNameError} mb="16px">
            <FormLabel>Last Name</FormLabel>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {isLastNameError ? (
              <FormHelperText>Last name is required</FormHelperText>
            ) : null}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PatientModal;
