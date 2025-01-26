const Doctor = require("../models/doctor");
const { createToken } = require("../utils/createToken");
const fs = require("fs");
const path = require("path");

const maxAge = 3 * 24 * 60 * 60;


// Function to write or update the token value for the fixed key 'token'
const saveTokenToFile = (token) => {
  const filePath = path.join(__dirname, "..", "token.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading token file:", err);
      return;
    }

    const keyValue = `doctertoken: ${token}`;
    let updatedData = keyValue;

    if (data) {
      const lines = data.split("\n");
      const hasToken = lines.some((line) => line.startsWith("doctertoken:"));
      updatedData = hasToken
        ? lines
            .map((line) => (line.startsWith("doctertoken:") ? keyValue : line))
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

module.exports.doctor_register = async (req, res) => {
  const education = Object.values(req.body.education);
  const specialization = Object.values(req.body.specialization);
  const {
    name,
    org,
    orgAddress,
    dob,
    mobile,
    email,
    adharCard,
    bloodGroup,
    address,
    password,
    orgNumber,
    emergencyno,
  } = req.body;
  try {
    const doctor = await Doctor.create({
      name,
      org,
      orgAddress,
      dob,
      mobile,
      email,
      adharCard,
      bloodGroup,
      education,
      address,
      password,
      specialization,
      orgNumber,
      emergencyno,
    });
    
    res.status(200).json({ doctor });
  } catch (err) {
    res.status(404).json({ err });
  }
};

module.exports.doctor_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.login(email, password);
    const token = createToken(doctor._id);
    
   // Save token to file with a fixed key 'token'
   saveTokenToFile(token);
    res.status(200).json({ doctor, token });
  } catch (err) {
    res.status(404).json({ err });
  }
};
