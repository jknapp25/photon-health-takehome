import {
  Box,
  Button,
  Container,
  Fade,
  Flex,
  IconButton,
  Spacer,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { BsPersonPlusFill } from "react-icons/bs";

import PatientModal from "./PatientModal";
import PrescriptionModal from "./PrescriptionModal";

export default Navbar;

function Navbar({
  activeView,
  isPatientModalOpen,
  onPatientModalOpen,
  onPatientModalClose,
  handleAddPatient,
  isPrescriptionModalOpen,
  onPrescriptionModalOpen,
  onPrescriptionModalClose,
  handleAddPrescription,
  patientsObj,
}) {
  return (
    <Box backgroundColor="white" borderBottom="1px" borderColor="gray.200">
      <Container align="left" maxW="container.lg" py={4}>
        <Flex>
          <Box>
            <TabList>
              <Tab height="40px">Provider</Tab>
              <Tab height="40px">Pharmacist</Tab>
            </TabList>
          </Box>
          <Spacer />
          <Fade in={activeView === "Provider"} duration={1.5}>
            <Box>
              <>
                <IconButton
                  aria-label="Add Patient"
                  variant="outline"
                  colorScheme="blue"
                  icon={<BsPersonPlusFill />}
                  marginEnd={3}
                  onClick={onPatientModalOpen}
                />
                <PatientModal
                  isOpen={isPatientModalOpen}
                  onOpen={onPatientModalOpen}
                  onClose={onPatientModalClose}
                  onSave={handleAddPatient}
                  patientsObj={patientsObj}
                />
                <Button colorScheme="blue" onClick={onPrescriptionModalOpen}>
                  + New Prescription
                </Button>
                <PrescriptionModal
                  isOpen={isPrescriptionModalOpen}
                  onOpen={onPrescriptionModalOpen}
                  onClose={onPrescriptionModalClose}
                  onSave={handleAddPrescription}
                  patientsObj={patientsObj}
                />
              </>
            </Box>
          </Fade>
        </Flex>
      </Container>
    </Box>
  );
}
