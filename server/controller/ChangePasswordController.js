var exec = require("../db/exec_query")
var user = require("../db/queryUser")
var passwordHash = require('password-hash');

const changePasswordController = (req, res) => {
    var Username = req.body.username;
    var OldPassword = req.body.oldPassword;
    var NewPassword = req.body.newPassword;
    console.log("Call change password api: "+Username+ ":" +OldPassword+ "->"+NewPassword);

    exec.exec_query(user.login(Username)).then(reso =>{
        const userData = reso.data[0];
        if (passwordHash.verify(OldPassword, userData.Password)){
            NewPassword = passwordHash.generate(NewPassword);
            exec.exec_query_insert(user.changePassword(Username,NewPassword)).then(reso => {
                console.log("Call change password api: Success true")    
                res.json({
                        isSuccess: true
                    })
                }).catch((err) => {
                    console.log("Call change password api: Success false")    
                    console.log(err); 
                        res.json({
                            isSuccess: false
                            })
                        });
        }else {
            res.json({
                isSuccess: false
            })
        }
    })
}

module.exports = {
    changePasswordController
}