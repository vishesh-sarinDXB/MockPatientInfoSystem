const Employee = require('../models/Employee');
const Patient = require('../models/Employee');
const LoggedIn = require('../models/LoggedIn');

// function ageCalculator(dob) {

//     const year = parseInt(dob.substr(6));
//     const month = parseInt(dob.substr(3, 2)) - 1;
//     const day = parseInt(dob.substr(0, 2));
//     const checkDate = new Date(year, month, day);

//     let age = Date.now() - checkDate.getTime();
//     age = new Date(age);
//     age = age.getFullYear() - 1970;

//     return age;

// }

async function newEmployee (req, res) {

    const loggedInAdmin = await LoggedIn.findOne({loginToken: req.params.identification});

    if (loggedInAdmin === null) {
        res.send('Sorry you are not logged in! Please try logging in first!');
    } else {
        const auth = loggedInAdmin.id.substr(0, 4);
        if (auth === 'ADMN') {
            let currID = null;
            if (req.body.title === 'Clerk') {
                currID = 'CLRK';
            } else if (req.body.title === 'Doctor') {
                currID = 'DOCT';
            }
            if (currID === null) {
                res.send('Invalid Title');
            } else {
                const lastEmployee = await Employee.findOne().sort({_id: -1});
                if (lastEmployee === null) {
                    currID = currID + '0001';
                } else {
                    const lastIDint = parseInt(lastEmployee.id.substr(4), 10);
                    currID = currID + (lastIDint + 1).toString().padStart(4, '0');
                }
                let sex;
                let dob;
                let validOp;
    
                if (req.body.sex === undefined) {
    
                    res.send("Missing sex field");
                    sex = "Invalid";
                    dob = "Invalid";
                    validOp = false;
    
                } else if (req.body.dob === undefined) {
    
                    res.send("Missing dob field");
                    sex = "Invalid";
                    dob = "Invalid";
                    validOp = false;
    
                } else {
    
                    dob = req.body.dob;
                    sex = req.body.sex.toUpperCase();
                    validOp = true;
    
                }
    
                const validSex = sex === 'M' || sex === 'F' || sex === 'MALE' || sex === 'FEMALE';
                const notValidDOBFormat = dob.length !== 10 && dob.charAt(2) !== '/' && dob.charAt(5) !== '/';
    
                const year = parseInt(dob.substr(6));
                const month = parseInt(dob.substr(3, 2)) - 1;
                const day = parseInt(dob.substr(0, 2));
                const checkDate = new Date(year, month, day);
    
                // age = ageCalculator(dob);
                if (!validSex && validOp) {

                    res.send('Incorrect format for sex field, needs to be either Male or Female (will accept M or F, and differing cases)');
    
                } else if (notValidDOBFormat && validOp) {
    
                    res.send('Incorrect format for dob field, needs to be DD/MM/YYYY');
    
                } else if ((checkDate.getFullYear() !== year || checkDate.getMonth() !== month || checkDate.getDate() !== day) && validOp) {
    
                    res.send('Invalid date, please check and try again!');
    
    
                } else if ((isNaN(age) || age < 0) && validOp) {
                    
                    res.send('Date is in the future, or otherwise invalid, please check and try again');
    
                } else if (validOp) {
                    const newEmployee = new Employee ({
                        id: currID,
                        pswd: req.body.pswd,
                        dob: dob,
                        sex: sex.charAt(0),
                        name: req.body.name,
                        title: req.body.title
                    })
                    newEmployee
                        .save()
                        .then(item => res.json(item))
                        .catch(err => res.send(err))
                }
            }
            
        } else {
            res.send('Sorry you are not authorized to register new employees!');
        }
        
    }
    // if (loggedInAdmin === null) {
        
    //     res.send('Sorry you are not logged in! Please try logging in first!');

    // } else {

    //     const auth = loggedInAdmin.id.substr(0, 4);

    //     if (auth === 'ADMN') {

    //         const lastEmployee = await Employee.findOne().sort({_id: -1});
    //         let currID = 'PATN';

    //         if (lastEmployee === null) {
                
    //             currID = currID + '0001';

    //         } else {

    //             const lastIDint = parseInt(lastEmployee.id.substr(4), 10);
    //             currID = currID + (lastIDint + 1).toString().padStart(4, '0');

    //         }
            
    

    //  else if (validOp) {

    //             const newPatient = new Patient ({
    //                 id: currID,
    //                 dob: dob,
    //                 age: age,
    //                 sex: sex.charAt(0),
    //                 name: req.body.name,
    //                 knownDisease: req.body.knownDisease,
    //                 complaints: req.body.complaints
    //             });
    
    //             newPatient
    //                 .save()
    //                 .then(item => res.json(item))
    //                 .catch(err => res.send(err));

    //         }

    //     } else {

    //         res.send('Sorry you are not authorized to register new patients!');

    //     }
    // }
}

module.exports.newEmployee = newEmployee;