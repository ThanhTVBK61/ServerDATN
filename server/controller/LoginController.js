var exec = require("../db/exec_query")
var user = require("../db/queryUser")
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
const CONFIG = require('../../config/config');
//haohao
//

const loginController = (req, res) => {
    var Username = req.body.username;
    var Password = req.body.password;
    console.log("Call Login API: "+ Username + " "+Password);
    // check voi csdl
    exec.exec_query(user.login(Username)).then(reso => {
        var userData = reso.data[0];
        console.log("Call Login API: "+ userData.Username + " "+userData.EmailUser+" "+ userData.Password);
        if (passwordHash.verify(Password, userData.Password)) {
            // const token = generateJwtToken(userData.Username)
            res.json({
                isSuccess: true,
                data:{
                    Id: userData.IdUser,
                    Username: userData.Username,
                    EmailUser: userData.EmailUser
                }
                // token
            })
        } else {
            res.json({
                isSuccess: false,
                data: []
            })
        }
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                user: null
            })
        });

}

function generateJwtToken(user_id) {
    const payload = {
        user_id: user_id
    };
    const options = {
       // expiresIn: CONFIG.EXPRIRESIN, // t/g het han token
        issuer: CONFIG.ISSUER // sernao tao ra token, localhost:3000
    };
    const secret = CONFIG.JWT_SECRET;//moi token se co 1 key, khi giai ma token se su dung key de giai ma
    return jwt.sign(payload, secret, options);
}
//Kiem tra xem token co het han hay khong
function verifyJwtToken(token) {
    const options = {
        expiresIn: CONFIG.EXPRIRESIN,
        issuer: CONFIG.ISSUER
    };
    const secret = CONFIG.JWT_SECRET;
    return jwt.verify(token, secret, options);
}

module.exports = {
    loginController
}
