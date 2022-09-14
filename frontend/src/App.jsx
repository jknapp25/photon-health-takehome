import { useState, useEffect } from "react";
import {
  ChakraProvider,
  SlideFade,
  Tabs,
  TabPanels,
  TabPanel,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import Navbar from "./components/Navbar";
import ProviderView from "./views/ProviderView";
import PharmacistView from "./views/PharmacistView";

import "./App.css";

export default App;

function App() {
  const {
    isOpen: isPatientModalOpen,
    onOpen: onPatientModalOpen,
    onClose: onPatientModalClose,
  } = useDisclosure();
  const {
    isOpen: isPrescriptionModalOpen,
    onOpen: onPrescriptionModalOpen,
    onClose: onPrescriptionModalClose,
  } = useDisclosure();

  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const toast = useToast();

  async function handleAddPatient(data) {
    const response = await fetch(
      "https://localhost:3000/patients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      onPatientModalClose();

      const newPatient = await response.json();

      const updPatients = [...patients, newPatient];
      setPatients(updPatients);

      toast({
        title: "Patient added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function handleAddPrescription(data) {
    const response = await fetch(
      "https://localhost:3000/prescriptions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      onPrescriptionModalClose();

      const updPrescriptions = await response.json();
      setPrescriptions(updPrescriptions);

      toast({
        title: "Prescription added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function handleStatusUpdate(id, status) {
    let updItem = prescriptions.find((presc) => presc.id === id);
    updItem.status = status;

    const response = await fetch(
      `https://localhost:3000/prescriptions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updItem),
      }
    );

    if (response.ok) {
      const updPrescriptions = prescriptions.map((pres) =>
        pres.id === id ? updItem : pres
      );
      setPrescriptions(updPrescriptions);

      toast({
        title: "Prescription updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function handleDeletePrescription(id) {
    const response = await fetch(
      `https://localhost:3000/prescriptions/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const updPrescriptions = await response.json();
      setPrescriptions(updPrescriptions);

      toast({
        title: "Prescription deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      const patientsResponse = await fetch(
        "https://localhost:3000/patients"
      );
      const prescriptionsResponse = await fetch(
        "https://localhost:3000/prescriptions"
      );

      if (patientsResponse.ok) {
        const updPatients = await patientsResponse.json();
        setPatients(updPatients);
      }
      if (prescriptionsResponse.ok) {
        const updPrescriptions = await prescriptionsResponse.json();
        setPrescriptions(updPrescriptions);
      }
    }
    fetchData();
  }, []);

  const patientsObj = patients.reduce(
    (acc, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  );

  return (
    <ChakraProvider>
      <div className="App">
        <Helmet>
          <title>
            Photon Health - {tabIndex === 0 ? "Provider" : "Pharmacist"}
          </title>
        </Helmet>
        <Tabs
          variant="soft-rounded"
          size="md"
          backgroundColor="gray.50"
          colorScheme="blue"
          onChange={(index) => setTabIndex(index)}
        >
          <Navbar
            activeView={tabIndex === 0 ? "Provider" : "Pharmacist"}
            isPatientModalOpen={isPatientModalOpen}
            onPatientModalOpen={onPatientModalOpen}
            onPatientModalClose={onPatientModalClose}
            handleAddPatient={handleAddPatient}
            isPrescriptionModalOpen={isPrescriptionModalOpen}
            onPrescriptionModalOpen={onPrescriptionModalOpen}
            onPrescriptionModalClose={onPrescriptionModalClose}
            handleAddPrescription={handleAddPrescription}
            patientsObj={patientsObj}
          />
          <TabPanels>
            <TabPanel>
              <SlideFade
                in={tabIndex === 0}
                direction="left"
                offsetX="-300px"
                duration={1.5}
              >
                <ProviderView
                  patients={patients}
                  prescriptions={prescriptions}
                  handleDeletePrescription={handleDeletePrescription}
                />
              </SlideFade>
            </TabPanel>
            <TabPanel>
              <SlideFade
                in={tabIndex === 1}
                direction="right"
                offsetX="300px"
                duration={1.5}
              >
                <PharmacistView
                  patients={patients}
                  prescriptions={prescriptions}
                  handleStatusUpdate={handleStatusUpdate}
                  handleDeletePrescription={handleDeletePrescription}
                />
              </SlideFade>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}
