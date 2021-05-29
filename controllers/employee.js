const Employee = require("../models/employee");
const Joi = require("joi");
const HttpError = require("../HttpError");
const fs = require("fs");
const multer = require("multer");
const csv = require("csvtojson");

const removeDir = (path) => {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename);
        } else {
          fs.unlinkSync(path + "/" + filename);
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.rmdirSync(path);
    }
  } else {
    console.log("Directory path not found.");
  }
};

const addEmployee = async (req, res, next) => {
  let temp;
  // const csvData = csv().fromFile(req.file.path);
  var storage = multer.diskStorage({
    destination: "./public/uploads",
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      console.log(req.body, "req.body");
      if (file.mimetype === "text/csv") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(next(new HttpError("invalid file")));
      }
    },
  }).single("file");

  upload(req, res, function (err) {
    if (err) {
      return next(new HttpError("Something went wrong", 401));
    } else {
      // console.log(req.body, "req.body");
      csv()
        .fromFile(req.file.path)
        .then((jsonObj) => {
          if (jsonObj && jsonObj.length) {
            for (let x = 0; x < jsonObj.length; x++) {
              if (!jsonObj[x].name) {
                return next(new HttpError("Name field is required", 400));
              }
              if (!jsonObj[x].email) {
                return next(new HttpError("Email field is required", 400));
              }
              if (!jsonObj[x].department) {
                return next(new HttpError("Department field is required", 400));
              }
              if (!jsonObj[x].age) {
                return next(new HttpError("Age field is required", 400));
              }
              if (!jsonObj[x].reporting_manager) {
                return next(
                  new HttpError("Reporting Manager field is required", 400)
                );
              }
              if (!jsonObj[x].salary) {
                return next(new HttpError("Salary field is required", 400));
              }
              temp = jsonObj[x].name;
              jsonObj[x].name = temp;
              temp = jsonObj[x].email;
              jsonObj[x].email = temp;
              temp = jsonObj[x].age;
              jsonObj[x].age = temp;
              temp = jsonObj[x].dob;
              jsonObj[x].dob = temp;
              temp = jsonObj[x].reporting_manager;
              jsonObj[x].reporting_manager = temp;
              temp = jsonObj[x].salary;
              jsonObj[x].salary = temp;
              temp = jsonObj[x].department;
              jsonObj[x].department = temp;
            }
          } else {
            return next(new HttpError("No data found in file"), 404);
          }

          Employee.countDocuments().exec(function (error, count) {
            if (error) {
              const err = new HttpError(error, 400);
              return next(err);
            }
            if (count) {
              Employee.deleteMany({}, (err, deleteResponse) => {
                if (err) {
                  const error = new HttpError(err.message, 401);
                  return next(error);
                } else {
                  Employee.insertMany(jsonObj, (err, response) => {
                    if (err) {
                      const error = new HttpError(err.message, 401);
                      return next(error);
                    } else {
                      removeDir("./public/uploads");
                      res
                        .status(201)
                        .send({ message: "Data uploaded successfully" });
                    }
                  });
                }
              });
            } else {
              Employee.insertMany(jsonObj, (err, response) => {
                if (err) {
                  const error = new HttpError(err.message, 401);
                  return next(error);
                } else {
                  removeDir("./public/uploads");
                  res
                    .status(201)
                    .send({ message: "Data uploaded successfully" });
                }
              });
            }
          });
        });
    }
  });
};

const fetchEmployeeList = async (req, res, next) => {
  const schema = Joi.object({
    limit: Joi.string().required(),
    skip: Joi.string().required(),
    search: Joi.string(),
    sortKey: Joi.string(),
    sortType: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  console.log(req);
  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }
  let query = {},
    sort = "name";
  if (req.query.search) {
    query = {
      $or: [
        { name: { $regex: `${req.query.search}`, $options: "i" } },
        { email: { $regex: `${req.query.search}`, $options: "i" } },
        { age: { $regex: `${req.query.search}`, $options: "i" } },
        { dob: { $regex: `${req.query.search}`, $options: "i" } },
        { salary: { $regex: `${req.query.search}`, $options: "i" } },
        { reporting_manager: { $regex: `${req.query.search}`, $options: "i" } },
        { department: { $regex: `${req.query.search}`, $options: "i" } },
      ],
    };
  }
  if (req.query.sortKey) {
    sort =
      req.query.sortType.toLowerCase() === "asc"
        ? `${req.query.sortKey}`
        : req.query.sortType.toLowerCase() === "desc"
        ? `-${req.query.sortKey}`
        : "name";
  }
  console.log(sort);
  try {
    Employee.find(query)
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort(sort)
      .exec(function (err, doc) {
        if (err) {
          res.status(500).json(err);
          return;
        }
        console.log(doc.length);
        Employee.countDocuments(query).exec(function (error, count) {
          if (error) {
            const err = new HttpError(error, 400);
            return next(err);
          }
          res.status(200).send({
            data: doc,
            count: count,
          });
        });
      });
  } catch (error) {
    console.log(error);
    const err = new HttpError("Something went wrong", 500);
    return next(err);
  }
};

exports.addEmployee = addEmployee;
exports.fetchEmployeeList = fetchEmployeeList;
