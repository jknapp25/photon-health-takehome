import {
  Box,
  Container,
  Flex,
  Heading,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import PrescriptionsTable from "../components/PrescriptionsTable";
import Statistic from "../components/Statistic";

export default ProviderView;

function ProviderView({ patients, prescriptions, handleDeletePrescription }) {
  const totalPatients = patients.length;
  const totalPrescriptions = prescriptions.length;

  const patientsObj = patients.reduce(
    (acc, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  );

  return (
    <Container maxW="container.lg">
      <Flex>
        <Box mt={6} mb={7}>
          <Heading as="h2" size="xl" align="left" color="blue.900" data-testid="provider-heading">
            Prescriptions
          </Heading>
        </Box>
      </Flex>

      <Wrap spacing="10px">
        <WrapItem>
          <Statistic label="Prescriptions" number={totalPrescriptions} />
        </WrapItem>
        <WrapItem>
          <Statistic label="Patients" number={totalPatients} />
        </WrapItem>
      </Wrap>

      <Box mt={12} mb={7}>
        <Heading as="h4" size="md" align="left" color="blue.900">
          All prescriptions
        </Heading>
      </Box>

      <Box my={5}>
        {patients.length > 0 ? (
          <PrescriptionsTable
            prescriptions={prescriptions}
            patientsObj={patientsObj}
            onDelete={handleDeletePrescription}
          />
        ) : null}
      </Box>
    </Container>
  );
}
