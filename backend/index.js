const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const seed_data = require("./seed_data");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const port = 3000;

const database = seed_data;

app.get("/", (req, res) => {
  res.json({
    message: "hello world!",
  });
});

app.get("/patients", (req, res) => {
  res.json(Object.values(database.patients));
});

app.get("/patients/:id", (req, res) => {
  const value = database.patients[req.params.id];
  if (value) {
    res.json(value);
  }
  res.sendStatus(404);
});

app.post("/patients", (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    res.status(400).send("Error: Missing required fields");
  } else {
    const id = uuidv4();
    database.patients[id] = {
      id,
      firstName,
      lastName,
    };
    res.json(database.patients[id]);
  }
});

app.get("/prescriptions", (req, res) => {
  const prescriptions = Object.values(database.prescriptions).sort(
    (a, b) => new Date(b.created_on) - new Date(a.created_on)
  );
  res.json(prescriptions);
});

app.put("/prescriptions/:id", (req, res) => {
  const updPrescription = req.body;
  database.prescriptions[req.params.id] = updPrescription;
  res.status(200).send();
});

app.post("/prescriptions", (req, res) => {
  const { patientId, medication } = req.body;
  if (!patientId || !medication) {
    res.status(400).send("Error: Missing required fields");
  } else {
    const id = uuidv4();
    database.prescriptions[id] = {
      id,
      patientId,
      medication,
      status: "Pending",
      created_on: new Date(),
    };
    const prescriptions = Object.values(database.prescriptions).sort(
      (a, b) => new Date(b.created_on) - new Date(a.created_on)
    );
    res.json(prescriptions);
  }
});

app.delete("/prescriptions/:id", (req, res) => {
  delete database.prescriptions[req.params.id];
  const prescriptions = Object.values(database.prescriptions).sort(
    (a, b) => new Date(b.created_on) - new Date(a.created_on)
  );
  res.json(prescriptions);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
