import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuList,
  MenuItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { BsClockFill, BsPersonFill, BsTrashFill } from "react-icons/bs";
import { FaClipboardList, FaPrescriptionBottle } from "react-icons/fa";
import { RiMoreFill } from "react-icons/ri";
import moment from "moment";

import StatusBadge from "./StatusBadge";

const HEADER_ICON_SIZE = "1.25em";

const TABLE_HEADER_DATA = [
  { icon: <BsPersonFill size={HEADER_ICON_SIZE} />, name: "patient" },
  {
    icon: <FaPrescriptionBottle size={HEADER_ICON_SIZE} />,
    name: "medication",
  },
  { icon: <FaClipboardList size={HEADER_ICON_SIZE} />, name: "status" },
  { icon: <BsClockFill size={HEADER_ICON_SIZE} />, name: "created" },
];

const STATUSES = ["In Progress", "Pending", "Filled"];

function PrescriptionsTable({
  prescriptions,
  patientsObj,
  onDelete,
  onStatusUpdate = () => {},
  allowStatusUpdates = false,
}) {
  if (!prescriptions) return;

  return (
    <TableContainer
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      backgroundColor="white"
      boxShadow="sm"
    >
      <Table variant="simple">
        <Thead backgroundColor="gray.50">
          <Tr>
            {TABLE_HEADER_DATA.map(({ icon, name }) => (
              <Th key={name}>
                <Text casing="uppercase" display="flex" verticalAlign="center">
                  {icon}&nbsp;&nbsp;&nbsp;{name}
                </Text>
              </Th>
            ))}
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {prescriptions.map(
            ({ id, patientId, medication, status, created_on }, i) => {
              const altStatuses = STATUSES.filter((stat) => stat !== status);
              return (
                <Tr key={`prescription-${i}`}>
                  <Td>
                    <Text>
                      {patientsObj[patientId].firstName}{" "}
                      {patientsObj[patientId].lastName}
                    </Text>
                  </Td>
                  <Td>{medication}</Td>
                  <Td>
                    <StatusBadge status={status} />
                  </Td>
                  <Td>
                    <Text mb={2}>{moment(created_on).fromNow()}</Text>
                    <Text color="blackAlpha.500">
                      {moment(created_on).format("MMM D, h:mm a")}
                    </Text>
                  </Td>
                  <Td textAlign="right">
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<RiMoreFill />}
                        variant="ghost"
                        aria-label="Prescription Options"
                      />
                      <MenuList>
                        {allowStatusUpdates ? (
                          <>
                            <MenuGroup title="Set status" textAlign="left">
                              {altStatuses.map((stat) => (
                                <MenuItem
                                  key={stat}
                                  onClick={() => onStatusUpdate(id, stat)}
                                >
                                  <StatusBadge status={stat} />
                                </MenuItem>
                              ))}
                            </MenuGroup>
                            <MenuDivider />
                          </>
                        ) : null}
                        <MenuItem
                          icon={<BsTrashFill />}
                          onClick={() => onDelete(id)}
                          color="red.500"
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            }
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default PrescriptionsTable;
