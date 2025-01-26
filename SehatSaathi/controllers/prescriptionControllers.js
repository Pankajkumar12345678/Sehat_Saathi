const Patient = require("../models/patient");

module.exports.add_prescription = async (req, res) => {
  const healthID = req.params.healthID;
  console.log("healthID:", healthID);

  const chiefComplaints = req.body.chiefComplaints || [];
  const medicines = req.body.medicines || [];
  const investigations = req.body.investigations || [];
  const advices = req.body.advices || [];
  const notes = req.body.notes ? req.body.notes.note : "";
  const diagnosis = req.body.diagnosis ? req.body.diagnosis.diagno : "";
  const procedureConducted = req.body.procedureConducted ? req.body.procedureConducted.procedure : "";
  const { doctor, doctormobile, hospital } = req.body;

  try {
    // Ensure healthID exists in the database
    const patient = await Patient.findOne({ healthID });

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found!" });
    }

    // Push new prescription into the patient's prescriptions array
    patient.prescriptions.push({
      doctor,
      doctormobile,
      hospital,
      notes,
      diagnosis,
      procedureConducted,
      chiefComplaints,
      medicines,
      investigations,
      advices,
    });

    // Save the updated patient document
    await patient.save();

    res.status(200).json({ patient });
  } catch (err) {
    console.error("Error adding prescription:", err);
    res.status(500).json({ msg: "Something Went Wrong!" });
  }
};

module.exports.view_prescription = async (req, res) => {
  const healthID = req.params.healthID;
  const id = req.params.id;

  try {
    // Find the patient by healthID
    const patient = await Patient.findOne({ healthID });

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found!" });
    }

    // Find the specific prescription by ID
    const prescription = patient.prescriptions.find((pres) => pres._id.toString() === id);

    if (!prescription) {
      return res.status(404).json({ msg: "Prescription not found!" });
    }

    res.status(200).json({ prescription });
  } catch (err) {
    console.error("Error viewing prescription:", err);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};
