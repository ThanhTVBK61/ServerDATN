var exec = require("../db/exec_query")
var get = require("../db/queryTrip")

const getTripByIdUserController = (req, res) => {
    var idUser = req.query.idUser;
    exec.exec_query(get.getTripByIdUser(idUser)).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                user: null
            })
        });
}

const getTripInformationByIdTrip = (req, res) => {
    var idTrip = req.query.idTrip;
    exec.exec_query(get.getTripInformationById(idTrip)).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                user: null
            })
        });
}

const getPlaceInTrip = (req, res) => {
    var idTrip = req.query.idTrip;
    var idUser = req.query.idUser;

    exec.exec_query(get.getPlaceInTrip(idTrip, idUser)).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: []
            })
        });
}

const loadTripByIdPlace = (req, res) => {
    var idPlace = req.query.idPlace;
    var idUser = req.query.idUser;
    
    console.log("Call loadTripByIdPlace api: idUser = "+idUser+ " idPlace = "+idPlace);

    exec.exec_query(get.loadTripByIdPlace(idUser,idPlace)).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: []
            })
        });
}


const getAllUser = (req, res) => {
    exec.exec_query(get.getAllUser()).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: []
            })
        });
}

const updateNameDescriptionTrip = (req, res) => {

    var name = req.body.newName;
    var id = req.body.idTrip;
    var description = req.body.newDescription;

    exec.exec_query(get.updateEditTrip(id, name, description)).then(reso => {
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

const updateTimeTrip = (req, res) => {

    var id = req.body.idTrip;
    var time = req.body.time;

    exec.exec_query(get.updateTimeTrip(id, time)).then(reso => {
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

const deletePlaceInTrip = (req, res) => {

    var idTrip = req.body.idTrip;
    var idPlace = req.body.idPlace;

    exec.exec_query(get.deletePlaceInTrip(idTrip, idPlace)).then(reso => {
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

const addPlaceInTrip = (req, res) => {

    var idTrip = req.body.idTrip;
    var idPlace = req.body.idPlace;

    exec.exec_query(get.addPlaceInTrip(idTrip, idPlace)).then(reso => {
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

const deleteTrip = (req, res) => {

    var idTrip = req.body.idTrip;
    var idUser = req.body.idUser;

    exec.exec_2_query(get.deleteTrip(idTrip), get.deleteUserTrip(idTrip, idUser)).then(reso => {
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

const deleteTripMember = (req, res) => {

    var idTrip = req.body.idTrip;
    var idUser = req.body.idUser;

    exec.exec_query(get.deleteUserTrip(idTrip, idUser)).then(reso => {
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

const addTrip = (req, res) => {

    var nameTrip = req.body.NameTrip;
    var idUser = req.body.IdTrip;
    var img = "http://10.0.2.2:3000/trip_defauft/trip_def.jpg";

    console.log("Add Trip: " + nameTrip + "--" + idUser);

    exec.exec_3_query(get.addNewTrip(nameTrip, img), get.getTripByName(nameTrip), idUser).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: err
            })
        });

}

const addUserTrip = (req, res) => {

    var idTrip = req.body.idTrip;
    var idUser = req.body.idUser;

    console.log("Thêm thành viên mới với usertrip: " + idTrip + " " + idUser);

    exec.exec_query(get.addUserTrip(idTrip, idUser)).then(reso => {
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
    getTripByIdUserController,
    getTripInformationByIdTrip,
    getPlaceInTrip,
    getAllUser,
    addTrip,
    updateNameDescriptionTrip,
    updateTimeTrip,
    deletePlaceInTrip,
    deleteTrip,
    addUserTrip,
    addPlaceInTrip,
    deleteTripMember,
    loadTripByIdPlace
}