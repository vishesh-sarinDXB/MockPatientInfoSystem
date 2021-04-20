const Employee = require('../models/Employee');
const LoggedIn = require('../models/LoggedIn');
//one last time
async function login (req, res) {

    const tryingToLogIn = await Employee.findOne({id: req.params.identification});

    if (tryingToLogIn === null) {

        res.send('The user does not exist, please contact administration');

    } else {

        const loggedInAlready = await LoggedIn.findOne({id: req.params.identification});

        if (loggedInAlready === null) {

            if (tryingToLogIn.pswd === req.params.pswd) {

                tokenGen = () => {
                    let token = '';
                    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    for (let i = 12; i > 0; --i) token += chars[Math.floor(Math.random() * chars.length)];
                    return token;
                }

                let token = tokenGen();

                let checkToken = await LoggedIn.findOne({loginToken: token});

                while (checkToken !== null) {

                    token = tokenGen();
                    checkToken = await LoggedIn.findOne({loginToken: token});

                }

                const loggingIn = new LoggedIn({id: req.params.identification, loginToken: token});

                loggingIn
                    .save()
                    .then(res.send('Logged In Successfully! Your login token is ' + token + '\nPlease keep a note of it, as you will need it for other function calls!'))
                    .catch(err => res.send(err));

            } else {

                res.send('Incorrect password, pelase try again');

            }

        } else {
        
            res.send('You are already logged in!')

        }
    }
}

async function logout (req, res) {

    const tryingToLogOut = await LoggedIn.findOne({loginToken: req.params.identification});

    if (tryingToLogOut === null) {
        
        res.send('You are already logged out');

    } else {

        LoggedIn
            .findOneAndDelete({loginToken: req.params.identification})
            .then(res.send('Successfully Logged Out!'));

    }
}

module.exports.login = login;
module.exports.logout = logout;