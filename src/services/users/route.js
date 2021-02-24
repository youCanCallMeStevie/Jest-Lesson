const express = require("express");
const router = require("express").Router()

const {isAuthorized} = require("../../middleware/authorization");
const {
    loginController,
    registerController,
    refreshTokenController
  } = require("./controller");

router.post("/register", registerController)
router.get("/login", loginController)
router.post("/refresh", refreshTokenController);


module.exports = router