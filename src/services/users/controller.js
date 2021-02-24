const express = require("express");
const {verifyToken, generateTokens} = require("../../middleware/tokens");
const UserModel = require("./schema");

exports.registerController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Provide credentials");

    const user = new UserModel({ username, password });
    const { _id } = await user.save();

    res.status(201).send({ _id });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      errorCode: "wrong_credentials",
    });
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Provide credentials");

    const user = await UserModel.findOne({ username });

    user.password === password
      ? res.status(200).send({ token: "VALID_TOKEN" })
      : res.status(400).send({ message: "No username/password match" });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      errorCode: "wrong_credentials",
    });
  }
};

exports.refreshTokenController = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies.refreshToken;
      const decoded = verifyToken(refreshToken, "refresh");
      const user = await UserModel.findById(decoded.id);
      const isRefreshValid = user.refreshToken == refreshToken;
      if (!isRefreshValid) throw new Error("Refresh token not valid");
      const tokens = generateTokens(user);
      user.refreshToken = tokens.refreshToken;
      res.cookie("accessToken", tokens.accessToken, { httpOnly: true });
      res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
    } catch (error) {
      const err = new Error("You are not authorized");
      err.code = 401;
      next(error);
    }
  };