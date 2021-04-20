const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const server = require("../index.js");
const auth = require("../api/auth.js");
// const mongoose = require("mongoose");
const LoggedIn = require('../models/LoggedIn');
// const express = require('express');
// const app = express();

chai.should();

chai.use(chaiHttp);

describe("login", () => {
    
    context("login successful", () => {

        beforeEach(() => LoggedIn.findOneAndDelete({id: "CLRK0001"}));

        it('', (done) => {
            chai.request(server)
                .get("/login/CLRK0001/IamPaulBigolo", auth.login)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a("string");
                    textCheck = res.text.substr(0, "Logged In Successfully! Your login token is ".length);
                    textCheck.should.be.eq("Logged In Successfully! Your login token is ");
                done();
                });
        });

        it("should respond with incorrect password", (done) => {
            chai.request(server)
                .get("/login/CLRK0001/IncorrectPassword", auth.login)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eq('Incorrect password, pelase try again');
                done();
                });
        });
        
    });

    context("user does not exist", () => {
        it('', (done) => {
            chai.request(server)
                .get("/login/doesntexist/doesntexisst", auth.login)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eq('The user does not exist, please contact administration');
                done();
                }); 
        });
    
    });

    context("already logged in", () => {

        beforeEach(() => {
            const logIn = new LoggedIn({
                id: "CLRK0001",
                loginToken:  "000000"
            });
            return logIn.save();
        });

        afterEach(() => LoggedIn.findOneAndDelete({id: "CLRK0001"}));
        
        it("should respond with already logged in", (done) => {
            chai.request(server)
                .get("/login/CLRK0001/PasswordShouldNotMatterHere", auth.login)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eq("You are already logged in!");
                done();
                });
        });

    });
});

describe('logout', () => {

    context('respond with sucessful logout message', () => {

        beforeEach(() => {
            const logIn = new LoggedIn({
                id: "CLRK0001",
                loginToken:  "000000"
            });
            return logIn.save();
        });

        afterEach(() => LoggedIn.findOneAndDelete({id: "CLRK0001"}));

        it("should respond with successfull logout", (done) => {
            chai.request(server)
                .get("/logout/000000", auth.logout)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eq("Successfully Logged Out!");
                done();
                });
        });

        it("should respond with you are already logged out", (done) => {
            chai.request(server)
                .get("/logout/0001", auth.logout)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eq("You are already logged out");
                done();
                });
        });

    });
});

// describe('readPatient', () => {

// });

// describe('updatePatient', () => {

// });

// describe('newPatient', () => {

// });