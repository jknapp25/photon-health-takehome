import { Badge } from "@chakra-ui/react";

const STATUS_COLOR_MAPPING = {
  "Pending": "green",
  "In Progress": "orange",
  "Filled": "gray",
};

function StatusBadge({ status }) {
  return <Badge colorScheme={STATUS_COLOR_MAPPING[status]}>{status}</Badge>;
}

export default StatusBadge;
