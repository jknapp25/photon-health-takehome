import { Box, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

function Statistic({ label, number }) {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={5}
      align="left"
      backgroundColor="white"
      maxW="200px"
      minW="200px"
      w="200px"
      display="inline-block"
      boxShadow="sm"
    >
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{number}</StatNumber>
      </Stat>
    </Box>
  );
}

export default Statistic;
