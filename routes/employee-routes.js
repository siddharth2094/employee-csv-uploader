const express = require("express");
// const usersController = require("../controllers/users-controller");
const employeeControllers = require("../controllers/employee");
const multer = require("multer");

const router = express.Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploads = multer({ storage: storage });

router.post("/add", employeeControllers.addEmployee);
router.get("/employeeList", employeeControllers.fetchEmployeeList);

module.exports = router;
