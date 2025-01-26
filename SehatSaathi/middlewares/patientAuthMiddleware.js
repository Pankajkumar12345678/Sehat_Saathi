const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

const requirePatientAuth = (req, res, next) => {
  const filePath = path.join(__dirname, "..", "token.txt");

  // Read the token from token.txt
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading token file:", err);
      let AuthError = { error: "Patient is not authenticated!" };
      return res.status(401).send({ AuthError });
    }

    // Extract the token from the file
    console.log("data",data)
    const tokenLine = data
      .split("\n")
      .find((line) => line.startsWith("token:"));
    const token = tokenLine ? tokenLine.split(": ")[1] : null;

    if (token) {
      // Verify the token
      jwt.verify(token, "pankajkumar", async (err, decodedToken) => {
        if (err) {
          console.error("Token verification error:", err);
          let AuthError = { error: "Patient is not authenticated!" };
          res.status(401).send({ AuthError });
        } else {
          try {
            const patient = await Patient.findById(decodedToken.id);
            if (!patient) {
              let AuthError = { error: "Patient is not authenticated!" };
              return res.status(401).send({ AuthError });
            }

            req.patient = patient;
            next();
          } catch (dbError) {
            console.error("Database error:", dbError);
            let AuthError = { error: "Patient is not authenticated!" };
            res.status(401).send({ AuthError });
          }
        }
      });
    } else {
      let AuthError = { error: "Token not found in file!" };
      res.status(401).send({ AuthError });
    }
  });
};

module.exports = { requirePatientAuth };
