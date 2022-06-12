const express = require("express");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName : String,
    lastName : String,
    email: String,
    Phone: String,
    address: String,
    password: String,
})

module.exports = mongoose.model("Admin",adminSchema, "admin");
