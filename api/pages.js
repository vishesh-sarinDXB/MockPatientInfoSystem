function homePage (req, res) {
    let response =  "Welcome to group 4 implementation of F21AO DevOps CW Dev Phase\n";
    response = response + "Implemented routes are:\n"
    response = response + "/login\n";
    response = response + "/logout\n";
    response = response + "/newPatient\n";
    response = response + "/readPatient\n";
    response = response + "/updatePatient\n";
    response = response + "Please proceed to one of the above routes to see details on how to call the relevant exposed API"
    res.send(response);
}

function loginPage (req, res) {
    let response = "Welcome to the login page\n";
    response = response + "Please proceed to /login/:EmployeeID/:EmployeePSWD to login\n";
    response = response + "Please save the loginToken you receive after logging in, as you will need it to call other API\n";
    response = response + "Note that you will be logged out automatically after two hours\n";
    response = response + "A list of available Employee IDs and Passwords may be found in the Appendix of our report";
    res.send(response);
}

function logoutPage (req, res) {
    let response = "Welcome to the logout page\n";
    response = response + "Please proceed to /logout/:EmployeeLoginToken to logout\n"
    res.send(response);
}

function readPatientPage (req, res) {
    let response = "Welcome to the readPatient page\n";
    response = response + "Please proceed to /readPatient/:EmployeeLoginToken/:patientID to retrieve patient document";
    res.send(response);
}

function updatePatientPage (req, res) {
    let response = "Welcome to the updatePatient page\n";
    response = response + "Please proceed to /updatePatient/:EmployeeLoginToken/:patientID to update Patient details\n";
    response = response + "A JSON document will need to be passed in\n";
    response = response + "This document needs to have the fields diseasesEvaluated and referralDetails\n";
    response = response + "All other fields will be ignored\n"
    response = response + "If the fields mentioned above are not present, the fields for this patient document will be set to null\n";
    response = response + "Note that this method will overwrite existing diseasesEvaluated and referralDetails if already present in the patient document";
    res.send(response);
}

function newPatientPage (req, res) {
    let response = "Welcome to the newPatient page\n";
    response = response + "Please proceed to /newPatient/:EmployeeLoginToken to create a new Patient entry\n";
    response = response + "A JSON ducument will need to be passed in \n";
    response = response + "This document needs to have the fields dob, sex, name, complaints\n";
    response = response + "Additionally a knownDisease field can also be passed in if the patient is known to be suffering from a particular disease"
    res.send(response);
}

module.exports.newPatientPage = newPatientPage;
module.exports.updatePatientPage = updatePatientPage;
module.exports.readPatientPage = readPatientPage;
module.exports.logoutPage = logoutPage;
module.exports.loginPage = loginPage;
module.exports.homePage = homePage;