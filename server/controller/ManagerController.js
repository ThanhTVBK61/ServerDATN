var exec = require("../db/exec_query")
var get = require("../db/queryManager")

const loginmanager = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var type = "Quản lý"

    console.log("Call loginmanager Api: username = " + username);

    exec.exec_query(get.login(username,password,type)).then(reso => {
        var userData = reso.data[0];
        res.json({
            isSuccess: true,
            data:{
                Id: userData.IdUser,
                Username: userData.Username,
                EmailUser: userData.EmailUser
            }
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: err.data
            })
        });
}

const getAllPlaceInfoManager = (req, res) => {
    
    console.log("Call getAllPlaceInfoManager Api ");

    exec.exec_query(get.getAllPlaceInfoManager()).then(reso => {
    
        res.json({
            isSuccess: true,
            data:reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: []
            })
        });
}

const deletePlace = (req, res) => {
    
    var idPlace = req.body.id;

    console.log("Call deletePlace Api: idPlace = " + idPlace);

    exec.exec_query(get.deletePlace(idPlace)).then(reso => {
       
        res.json({
            isSuccess: true
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false
            })
        });
}

const deleteUser = (req, res) => {
    
    var idUser = req.body.id;

    console.log("Call deleteUser Api: idUser = " + idPlace);

    exec.exec_query(get.deleteUser(idUser)).then(reso => {
       
        res.json({
            isSuccess: true
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false
            })
        });
}

const getAllUserManager = (req, res) => {
    
    

    console.log("Call getAllUserManager Api");

    exec.exec_query(get.getAllUserManager()).then(reso => {
       
        res.json({
            isSuccess: true,
            data:reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data:reso.data
            })
        });
}

const loadNotificationManager = (req, res) => {
    
    var idUser = req.query.idUser;

    console.log("Call loadNotificationManager Api  idUser"+ idUser);

    exec.exec_query(get.loadNotificationManager(idUser)).then(reso => {
       
        res.json({
            isSuccess: true,
            data:reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data:reso.data
            })
        });
}
module.exports = {
    loginmanager,
    getAllPlaceInfoManager,
    deletePlace,
    deleteUser,
    getAllUserManager,
    loadNotificationManager
}
