const fs = require("fs");
const path = require("path");
const Patient = require("../models/patient");
const { createToken } = require("../utils/createToken");
require("dotenv").config();

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

// Reusable error handler function
const handleError = (err) => {
  let errors = {};

  if (err.message === "Invalid HealthID") {
    errors.healthID = "That HealthID is not registered";
  }

  if (err.message === "Incorrect Password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.healthID = "This AdharCard is already registered in the system.";
    return errors;
  }

  if (err.message.includes("patient validation failed")) {
    let errorsArray = Object.values(err.errors);
    errorsArray.forEach(({ properties }) => {
      if (!properties.path.includes(".")) {
        errors[properties.path] = properties.message;
      }
    });
  }

  return errors;
};

// Function to write or update the token value for the fixed key 'token'
const saveTokenToFile = (token) => {
  const filePath = path.join(__dirname, "..", "token.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading token file:", err);
      return;
    }

    const keyValue = `token: ${token}`;
    let updatedData = keyValue;

    if (data) {
      const lines = data.split("\n");
      const hasToken = lines.some((line) => line.startsWith("token:"));
      updatedData = hasToken
        ? lines
            .map((line) => (line.startsWith("token:") ? keyValue : line))
            .filter((line) => line.trim() !== "") // Remove empty lines
            .join("\n")
        : `${data.trim()}\n${keyValue}`;
    }

    fs.writeFile(filePath, updatedData, (err) => {
      if (err) {
        console.error("Error writing token to file:", err);
      } else {
        console.log(`Token successfully ${data ? "updated" : "saved"}.`);
      }
    });
  });
};

// Patient registration
module.exports.patient_register = async (req, res) => {
  const diseases = Object.values(req.body.diseases);
  const { name, dob, mobile, email, adharCard, bloodGroup, address, password, contactPerson } = req.body;

  const healthID = adharCard;

  try {
    const patient = await Patient.create({
      name,
      healthID,
      dob,
      mobile,
      email,
      adharCard,
      bloodGroup,
      address,
      password,
      diseases,
      contactPerson,
    });

    const token = createToken(patient._id);

    // Save token to file with a fixed key 'token'
    saveTokenToFile(token);

    res.status(200).json({ patient });
  } catch (err) {
    const errors = handleError(err);
    res.status(404).json({ errors });
  }
};

// Patient login
module.exports.patient_login = async (req, res) => {
  const { healthID, password } = req.body;
  console.log("patient",req.body)
  try {
    
    const patient = await Patient.login(healthID, password);
    

    const token = createToken(patient._id);

    // Save token to file with a fixed key 'token'
    saveTokenToFile(token);

    res.status(200).json({ patient});
  } catch (err) {
    const errors = handleError(err);
    res.status(404).json({ errors });
  }
};
