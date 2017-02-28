#!/bin/env node
var readline = require("readline");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Account = require("../models/account");

var database = require("../config/db");
mongoose.connect(database.url);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Admin username: ", (username) => {
    rl.question("Password: ", (password) => {
        // Create database entry
        Account.register(new Account({ username : username, admin: true }), password, (err, account) => {
            if (err) {
                console.error("Could not create user in database!");
            } else {
                console.info("User created successfully!");
            }

            // Close stdin
            rl.close();
            process.stdin.destroy();

            // Exit without error
            process.exit(0);
        });
    });
});
