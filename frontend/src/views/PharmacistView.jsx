import { Box, Container, Heading, Wrap, WrapItem } from "@chakra-ui/react";

import PrescriptionsTable from "../components/PrescriptionsTable";
import Statistic from "../components/Statistic";

export default PharmacistView;

function PharmacistView({
  patients,
  prescriptions,
  handleStatusUpdate,
  handleDeletePrescription,
}) {
  const inProgress = prescriptions.filter(
    (item) => item.status === "In Progress"
  ).length;
  const pending = prescriptions.filter(
    (item) => item.status === "Pending"
  ).length;
  const filled = prescriptions.filter(
    (item) => item.status === "Filled"
  ).length;

  const patientsObj = patients.reduce(
    (acc, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  );

  return (
    <Container maxW="container.lg">
      <Box mt={6} mb={7}>
        <Heading as="h2" size="xl" align="left" color="blue.900" data-testid="pharmacist-heading">
          Prescriptions
        </Heading>
      </Box>

      <Wrap spacing="10px">
        <WrapItem>
          <Statistic label="In Progress" number={inProgress} />
        </WrapItem>
        <WrapItem>
          <Statistic label="Pending" number={pending} />
        </WrapItem>
        <WrapItem>
          <Statistic label="Filled" number={filled} />
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
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDeletePrescription}
            allowStatusUpdates
          />
        ) : null}
      </Box>
    </Container>
  );
}
