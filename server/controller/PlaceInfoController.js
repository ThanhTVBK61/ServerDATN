var exec = require("../db/exec_query")
var get = require("../db/queryPlace")

const getPlaceByIdController = (req, res) => {
    var id = req.query.id;
    exec.exec_query(get.getPlaceById(id)).then(reso => {
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

const getPlaceByTypeController = (req, res) => {

    var typePlace = req.query.typePlace;
    var idUser = req.query.idUser;
    console.log("Call getPlaceByType Api: idUser = " + idUser + " -- type = " + typePlace);

    exec.exec_query(get.getPlaceByType(idUser, typePlace)).then(reso => {
        res.json({
            isSuccess: true,
            data: reso.data
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: null
            })
        });
}

const getAllPlaceInfo = (req, res) => {

    var idUser = req.query.idUser;
    console.log("Call get place id " + idUser);

    exec.exec_query(get.getAllPlace(idUser)).then(reso => {
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

const updateFavouritePlace = (req, res) => {
    var idPlace = req.body.idPlace;
    var favourite = req.body.favourite;
    var idUser = req.body.idUser;
    console.log("Call api update Favourite: " + idPlace + "->" + favourite + " : " + idUser);
    if (favourite) {
        exec.exec_query(get.insertFavouritePlace(idPlace, idUser)).then(reso => {
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
    } else {
        exec.exec_query(get.deleteFavouritePlace(idPlace, idUser)).then(reso => {
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
}

const getAllFavouritePlace = (req, res) => {

    var idUser = req.query.idUser;
    console.log("Call getAllFavouritePlace: idUser = " + idUser);

    exec.exec_query(get.getAllFavouritePlace(idUser)).then(reso => {
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

const loadRatingById = (req, res) => {

    var idUser = req.query.idUser;
    var idPlace = req.query.idPlace;

    console.log("Call loadRatingById id " + idUser + " idPlace: " + idPlace);

    exec.exec_query(get.loadRatingById(idUser, idPlace)).then(reso => {
        var result = reso.data[0];
        res.json({
            isSuccess: true,
            data: {
                LocationRating: result.LocationRating,
                PriceRating: result.PriceRating,
                QualityRating: result.QualityRating,
                ServiceRating: result.ServiceRating
            }
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: err
            })
        });
}

const addRating = (req, res) => {

    var idUser = req.body.idUser;
    var idPlace = req.body.idPlace;
    var location = req.body.locationRating;
    var price = req.body.priceRating;
    var quality = req.body.qualityRating;
    var service = req.body.serviceRating;


    console.log("Call addRating id " + idUser + " idPlace: " + idPlace);

    exec.exec_query(get.addRating(idUser, idPlace, location, price, quality, service)).then(reso => {

        res.json({
            isSuccess: true,
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
            })
        });
}

const updateRating = (req, res) => {

    var idUser = req.body.idUser;
    var idPlace = req.body.idPlace;
    var location = req.body.locationRating;
    var price = req.body.priceRating;
    var quality = req.body.qualityRating;
    var service = req.body.serviceRating;

    console.log("Call updateRating id " + idUser + " idPlace: " + idPlace);

    exec.exec_query(get.updateRating(idUser, idPlace, location, price, quality, service)).then(reso => {

        res.json({
            isSuccess: true,
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
            })
        });
}

const getInfoPostPlace = (req, res) => {

    //do su dung ModelPlace gửi lên nên idUser = idTrip
    var idUser = req.body.idTrip;
    var idPlace = req.body.idPlace;

    console.log("Call getInfoPostPlace idPlace " + idPlace + "  idUser" + idUser);

    exec.exec_3_query_post(get.getPostInforByIdPlace(idPlace), get.getSumLikePost(idPlace), get.checkLikeIdUser(idUser, idPlace)).then(reso => {

        res.json({
            isSuccess: true,
            sumComment: reso.sumcomment,
            sumLike: reso.sumlike,
            checkLike: reso.checklike
        })
    })
        .catch((err) => {
            res.json({
                isSuccess: false,
                data: []
            })
        });
}

const dislikePost = (req, res) => {

    //do su dung ModelPlace gửi lên nên idUser = idTrip     idPost = idPlace
    var idUser = req.body.idTrip;
    var idPost = req.body.idPlace;

    console.log("Call dislikePost id " + idUser + " idPost: " + idPost);

    exec.exec_query(get.dislikePost(idUser, idPost)).then(reso => {

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

const likePost = (req, res) => {

    //do su dung ModelPlace gửi lên nên idUser = idTrip     idPost = idPlace
    var idUser = req.body.idTrip;
    var idPost = req.body.idPlace;

    console.log("Call likePost id " + idUser + " idPost: " + idPost);

    exec.exec_query(get.likePost(idUser, idPost)).then(reso => {

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

const loadComments = (req, res) => {

    
    var idUser = req.query.idUser;
    var idPost = req.query.idPost;

    console.log("Call likePost id " + idUser + " idPost: " + idPost);

    exec.exec_query(get.loadComments(idUser, idPost)).then(reso => {

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

const addComment = (req, res) => {

    //do su dung ModelPlace gửi lên nên idUser = idTrip     idPost = idPlace
    var idUser = req.body.idUser;
    var idPost = req.body.idPost;
    var content = req.body.content;
    var time = req.body.time;

    console.log("Call likePost id " + idUser + " idPost: " + idPost + " content: " + content
        + " time: " + time);

    exec.exec_2_add_query(idUser,get.addComment(idUser, idPost,content,time)).then(reso => {
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

const updateLikeComment = (req, res) => {

    //do su dung ModelPlace gửi lên nên idUser = idTrip     idPost = idPlace
    var idUser = req.body.idUser;
    var idComment = req.body.idComment;
    var like = req.body.like;

    console.log("Call updateLikeComment idComment " + idComment + " like: " + like );

    if(like){
        exec.exec_query(get.addLikeComment(idUser, idComment)).then(reso => {
            console.log("Call addLikeComment idCommen");
            res.json({
                isSuccess: true
            })
        })
            .catch((err) => {
                res.json({
                    isSuccess: false
                })
            });
    }else{
        exec.exec_query(get.deleteLikeComment(idComment)).then(reso => {
            console.log("Call deleteLikeComment idCommen");
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
}


const deleteComment = (req, res) => {

    //do su dung ModelPlace gửi lên nên idUser = idTrip     idPost = idPlace
    var idComment = req.body.idComment;
   

    console.log("Call deleteComment idComment " + idComment );

    exec.exec_query(get.deleteComment(idComment)).then(reso => {

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

const deletePost = (req, res) => {

    //do su dung ModelPlace gửi lên nên idUser = idTrip     idPost = idPlace
    var idPost = req.body.idComment;
   

    console.log("Call deletePost idPost " + idPost );

    exec.exec_query(get.deletePost(idComment)).then(reso => {

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

const addPost = (req, res) => {

    //do su dung ModelPlace gửi lên nên idUser = idTrip     idPost = idPlace
    var idPlace = req.body.idPlace;
    var idUser = req.body.idUser;
    var location = req.body.location;
    var price = req.body.price;
    var quality = req.body.quality;
    var service = req.body.service;
    var content = req.body.content;
    var time = req.body.time;
   

    console.log("Call addPost idPlace " + idPlace );
    console.log("Call addPost idUser " + idUser );
    console.log("Call addPost location " + location );
    console.log("Call addPost price " + price );
    console.log("Call addPost quality " + quality );
    console.log("Call addPost service " + service );
    console.log("Call addPost content " + content );
    console.log("Call addPost time " + time );

    exec.exec_2_query(get.addPost(idUser,idPlace,content,time),get.addRating(idUser,idPlace,location,price,quality,service)).then(reso => {

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
    getPlaceByIdController,
    getPlaceByTypeController,
    getAllPlaceInfo,
    updateFavouritePlace,
    getAllFavouritePlace,
    loadRatingById,
    addRating,
    updateRating,
    getInfoPostPlace,
    dislikePost,
    likePost,
    loadComments,
    addComment,
    updateLikeComment,
    deleteComment,
    deletePost,
    addPost
}
