module.exports = {
  patients: {
    "2e19d3c5-54d5-4942-86fe-d0aab8cf9fbe": {
      id: "2e19d3c5-54d5-4942-86fe-d0aab8cf9fbe",
      firstName: "Queen",
      lastName: "Latifah",
    },
    "c0f7cc3b-2378-4cca-9d59-6c82f737d295": {
      id: "c0f7cc3b-2378-4cca-9d59-6c82f737d295",
      firstName: "Brad",
      lastName: "Pitt",
    },
    "a8a08de5-d9a6-4c37-8f53-c6161c615aae": {
      id: "a8a08de5-d9a6-4c37-8f53-c6161c615aae",
      firstName: "Louis",
      lastName: "Armstrong",
    },
    "e789a076-2fe7-4d7f-8d3a-eb702e9e8997": {
      id: "e789a076-2fe7-4d7f-8d3a-eb702e9e8997",
      firstName: "The",
      lastName: "Pope",
    },
  },
  prescriptions: {
    "a8a08de5-d9a6-4c37-8f53-c6161c615aae": {
      id: "a8a08de5-d9a6-4c37-8f53-c6161c615aae",
      patientId: "c0f7cc3b-2378-4cca-9d59-6c82f737d295",
      medication: "Suprax",
      status: "Pending",
      created_on: "2022-09-14T15:01:11.728Z",
    },
    "cb337569-9d78-458a-a452-2ea2aac00b25": {
      id: "cb337569-9d78-458a-a452-2ea2aac00b25",
      patientId: "a8a08de5-d9a6-4c37-8f53-c6161c615aae",
      medication: "Motrin",
      status: "In Progress",
      created_on: "2022-09-14T14:33:11.728Z",
    },
    "0b330ff2-483c-46e9-8110-ab71035110b2": {
      id: "0b330ff2-483c-46e9-8110-ab71035110b2",
      patientId: "2e19d3c5-54d5-4942-86fe-d0aab8cf9fbe",
      medication: "Norvasc",
      status: "In Progress",
      created_on: "2022-09-14T12:33:11.728Z",
    },
    "87a0ca55-9443-421c-99f3-97f4a39c69bd": {
      id: "87a0ca55-9443-421c-99f3-97f4a39c69bd",
      patientId: "e789a076-2fe7-4d7f-8d3a-eb702e9e8997",
      medication: "Synthroid",
      status: "In Progress",
      created_on: "2022-09-14T12:28:11.728Z",
    },
    "0372d975-319b-48de-ac4b-3808f70876f9": {
      id: "0372d975-319b-48de-ac4b-3808f70876f9",
      patientId: "c0f7cc3b-2378-4cca-9d59-6c82f737d295",
      medication: "Deltasone",
      status: "Filled",
      created_on: "2022-09-14T09:33:11.728Z",
    },
    "c9d7b613-79aa-4e9e-a777-346f4815a266": {
      id: "c9d7b613-79aa-4e9e-a777-346f4815a266",
      patientId: "e789a076-2fe7-4d7f-8d3a-eb702e9e8997",
      medication: "Mucinex",
      status: "Filled",
      created_on: "2022-09-14T08:33:11.728Z",
    },
  },
};
