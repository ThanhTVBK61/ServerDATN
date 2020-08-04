var exec = require("../db/exec_query")
var get = require("../db/queryUser")

const userGetInfoController = (req, res) => {
    var idUser = req.query.idUser;
    console.log("Call GetInfoAccount Api: idUser = " + idUser);
    exec.exec_query(get.getUser(idUser)).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: err.data
            })
        });
}


const changeInforAccount = (req, res) => {

    var username = req.body.Username;
    var datetime = req.body.BirthdayUser;
    var sex = req.body.Sex;
    var description = req.body.DescriptionUser;

    console.log("Call changeinfoaccount: "+username +" "+ datetime+" "+sex+" "+description);

    exec.exec_query(get.changeInforQuery(username, datetime, sex, description)).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: err.data
            })
        });
}

module.exports = {
    userGetInfoController,
    changeInforAccount
}
