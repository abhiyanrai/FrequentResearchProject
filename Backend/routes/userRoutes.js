const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const { checker } = require("../middleware/bodyChecker");
const AuthController = require('../controllers/user.controller');


router.post(
   '/addUser',
   [
    check("firstName").notEmpty().withMessage("FirstName is required")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Only alphabets are allowed in First Name"),
    check("lastName")
    .notEmpty()
    .withMessage("Last Name is required")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Only alphabets are allowed in Last Name"),
    check("email").notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address"),
    check("country").notEmpty().withMessage("Country is required"),
    check("state").notEmpty().withMessage("State is required"),
    check("city").notEmpty().withMessage("City is required"),
    check("gender").notEmpty().withMessage("Gender is required"),
    check("dateOfBirth")
      .notEmpty().withMessage("Date of birth is required")
      .custom((dateOfBirth, { req }) => {
        const today = new Date();
        const minDateOfBirth = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());
        const selectedDate = new Date(dateOfBirth);
        return selectedDate <= minDateOfBirth;
      })
      .withMessage("Date of birth must be older than 14 years"),
    check("age").notEmpty().withMessage("Age is required")

   ],
   checker,
  AuthController.addUser
);

router.get(
    '/getUser',
     AuthController.getUser
);

module.exports = router;
