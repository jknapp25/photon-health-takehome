import { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";

function PrescriptionModal({ isOpen, onClose, patientsObj, onSave }) {
  const [patientId, setPatientId] = useState("");
  const [medication, setMedication] = useState("");
  const [isPatientIdError, setIsPatientIdError] = useState(false);
  const [isMedicationError, setIsMedicationError] = useState(false);

  function handleSave() {
    const data = { patientId, medication };

    if (!patientId || !medication) {
      if (!patientId) setIsPatientIdError(true);
      if (!medication) setIsMedicationError(true);
    } else {
      handleClose();
      onSave(data);
    }
  }

  function handleClose() {
    setPatientId("");
    setMedication("");
    setIsPatientIdError(false);
    setIsMedicationError(false);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Prescription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={isPatientIdError} mb="16px">
            <FormLabel>Patient</FormLabel>
            <Select
              placeholder="Select option"
              value={patientId}
              mb="16px"
              onChange={(e) => setPatientId(e.target.value)}
              data-testid="patient-select"
            >
              {Object.keys(patientsObj).map((patId) => {
                return (
                  <option key={patId} value={patId}>
                    {patientsObj[patId].firstName} {patientsObj[patId].lastName}
                  </option>
                );
              })}
            </Select>
            {isPatientIdError ? (
              <FormHelperText>Patient is required</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={isMedicationError} mb="16px">
            <FormLabel>Medication</FormLabel>
            <Input
              aria-label="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
            {isMedicationError ? (
              <FormHelperText>Medication is required</FormHelperText>
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

export default PrescriptionModal;
