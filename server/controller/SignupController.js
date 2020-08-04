var exec = require("../db/exec_query")
var get = require("../db/queryInsertDataSignup")
var passwordHash = require('password-hash');

const signUpController= (req, res) => {
    
    var AddressUser = req.body.address;
    var Sex = req.body.sex;
    var Password = req.body.password;
    var EmailUser = req.body.email;
    var BirthdayUser = req.body.birthday;
    var Username = req.body.username;

    console.log("SignUp Data: "+Username+" "+Password+" "+EmailUser+" "+AddressUser+" "+Sex+" "+BirthdayUser);
   
    // hash password
    Password = passwordHash.generate(Password);
    exec.exec_query_insert(get.insertUserSignup(Username,Password,EmailUser,Sex,BirthdayUser,AddressUser)).then(reso => {
        res.json({
            isSuccess: true,
        })
    })
        .catch((err) => {
            console.log(err);
            
            res.json({
                isSuccess: false,
                err: err
            })
        });
}

module.exports = {
    signUpController
}
