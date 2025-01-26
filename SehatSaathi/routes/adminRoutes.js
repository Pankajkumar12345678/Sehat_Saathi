const { Router } = require("express");
const { get_admin } = require("../controllers/authControllers");
const {
  delete_doctor,
  delete_patient,
} = require("../controllers/deleteControllers");
const {
  view_patientlist,
  view_doctorlist,
} = require("../controllers/fetchlistControllers");
const { requireAdminAuth } = require("../middlewares/adminAuthMiddleware");

const router = Router();

router.delete("/deletedoctor/:id", requireAdminAuth, delete_doctor);
router.delete("/deletepatient/:healthID", requireAdminAuth, delete_patient);
router.get("/getadmin", requireAdminAuth, get_admin);

router.get("/doctorlist",  view_doctorlist); {/*requireAdminAuth, */}
router.get("/patientlist", view_patientlist); {/*requireAdminAuth, */}

module.exports = router;
