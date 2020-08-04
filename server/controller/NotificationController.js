var exec = require("../db/exec_query")
var get = require("../db/queryNotification")
var getTrip = require("../db/queryTrip")


const rejectTrip = (req, res) => {
    var idNotification = req.body.idNotification;
    var type = "Từ chối";
    var status = 0;

    console.log("Call rejectTrip: idNotification " + idNotification);

    exec.exec_query(get.updateNotification(idNotification, type, status)).then(reso => {
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

const joinTrip = (req, res) => {
    var idUser = req.body.idUser;
    var idTrip = req.body.idTrip;
    var idNotification = req.body.idNotification;
    var type = "Chấp nhận";
    var status = 0;

    console.log("Call joinTrip api: idUser: " + idUser + " idTrip: " + idTrip + " idNotification: " + idNotification);

    exec.exec_2_query(get.updateNotification(idNotification, type, status),getTrip.addUserTrip(idTrip,idUser)).then(reso => {
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

const loadNotification = (req, res) => {
    var idUser = req.query.idUser;
    
    console.log("Call loadNotification: idUser " + idUser);

    exec.exec_query(get.loadNotification(idUser)).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data:[]
            })
        });
}

const updateStatusNotification = (req, res) => {
    var idNotification = req.body.idNotification;
    
    console.log("Call updateStatusNotification: idNotification " + idNotification);

    exec.exec_query(get.updateStatusNotification(idNotification)).then(reso => {
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
module.exports = {
    rejectTrip,
    joinTrip,
    loadNotification,
    updateStatusNotification
}