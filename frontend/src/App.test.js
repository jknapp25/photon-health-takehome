import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import App from "./App";

import "@testing-library/jest-dom";

const server = setupServer(
  rest.get(
    "http://localhost:3000/patients",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: "id1",
            firstName: "Queen",
            lastName: "Latifah",
          },
        ])
      );
    }
  ),
  rest.get(
    "http://localhost:3000/prescriptions",
    (req, res, ctx) => {
      return res(ctx.json([]));
    }
  ),
  rest.post(
    "http://localhost:3000/prescriptions",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: "id3",
            patientId: "id1",
            medication: "Motrin",
            status: "Pending",
            created_on: "2022-09-14T14:33:11.728Z",
          },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it renders", async () => {
  render(<App />);

  await waitFor(() => screen.getByTestId("provider-heading"));
});

test("it toggles views", async () => {
  render(<App />);

  await waitFor(() => screen.getByTestId("provider-heading"));

  fireEvent.click(screen.getByText("Pharmacist"));

  await waitFor(() => screen.getByTestId("pharmacist-heading"));

  fireEvent.click(screen.getByText("Provider"));

  await waitFor(() => screen.getByTestId("provider-heading"));
});

test("validates prescription inputs", async () => {
  render(<App />);

  await waitFor(() => screen.getByText("+ New Prescription"));

  fireEvent.click(screen.getByText("+ New Prescription"));

  await waitFor(() => screen.getByText("Add Prescription"));

  fireEvent.click(screen.getByText("Save"));

  await waitFor(() => screen.getByText("Medication is required"));
  await waitFor(() => screen.getByText("Patient is required"));
});

test.skip("adds a prescription", async () => {
  render(<App />);

  await waitFor(() => screen.getByText("+ New Prescription"));

  fireEvent.click(screen.getByText("+ New Prescription"));

  await waitFor(() => screen.getByText("Add Prescription"));

  const select = screen.getByPlaceholderText("Select option");
  fireEvent.change(select, {
    target: { value: "id1" },
  });

  fireEvent.change(screen.getByLabelText("medication"), {
    target: { value: "Motrin" },
  });

  fireEvent.click(screen.getByText("Save"));

  expect(screen.getByText("Add Prescription")).not.toBeVisible();

  await waitFor(() => screen.getByText("Motrin"));
});
