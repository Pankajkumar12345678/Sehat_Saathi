const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");
const fs = require("fs");
const path = require("path");

const requireDoctorAuth = (req, res, next) => {
  const filePath = path.join(__dirname, "..", "token.txt");

  // Read the token from token.txt
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading token file:", err);
      return res.status(401).send({ error: "Patient is not authenticated!" });
    }

    // Extract the token from the file
    const tokenLine = data
      .split("\n")
      .find((line) => line.startsWith("doctertoken:"));
    const token = tokenLine ? tokenLine.split(": ")[1] : null;

    if (token) {
      jwt.verify(token, "pankajkumar", async (err, decodedToken) => {
        if (err) {
          console.error("Token verification failed:", err);
          return res.status(401).send({ error: "Doctor is not authenticated!" });
        } else {
          try {
            const doctor = await Doctor.findById(decodedToken.id);
            if (!doctor) {
              return res.status(401).send({ error: "Doctor not found!" });
            }
            req.doctor = doctor;
            next();
          } catch (err) {
            console.error("Error fetching doctor:", err);
            return res.status(500).send({ error: "Internal server error!" });
          }
        }
      });
    } else {
      return res.status(401).send({ error: "Doctor is not authenticated!" });
    }
  });
};

module.exports = { requireDoctorAuth };
