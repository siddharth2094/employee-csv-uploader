const express = require("express");
// const usersController = require("../controllers/users-controller");
const employeeControllers = require("../controllers/employee");
const multer = require("multer");

const router = express.Router();

router.post("/add", employeeControllers.addEmployee);
router.get("/employeeList", employeeControllers.fetchEmployeeList);
router.delete("/:_id", employeeControllers.deleteEmployee);

module.exports = router;
