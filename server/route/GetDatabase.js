var express = require("express");
var router = express.Router();

var user = require("../controller/UsersInfoController");
var manager = require("../controller/ManagerController")
var place = require("../controller/PlaceInfoController");
var signup = require("../controller/SignupController");
var login = require("../controller/LoginController");
var changepassword = require("../controller/ChangePasswordController");
var trip = require("../controller/TripController")
var notification = require("../controller/NotificationController")


// router.get("/getuserinfo", userGet.userGetInfoController);

//home
router.post("/updatefavourite",place.updateFavouritePlace)

router.get("/loadfavouriteplace",place.getAllFavouritePlace)

router.get("/getplacebytype",place.getPlaceByTypeController);

router.get("/getplacebyid", place.getPlaceByIdController);

router.get("/getallplaceinfo",place.getAllPlaceInfo);

router.get("/loadratingbyid",place.loadRatingById);

router.post("/updaterating",place.updateRating);

router.post("/addrating",place.addRating);

router.post("/getinfopost",place.getInfoPostPlace);

router.post("/dislikepost",place.dislikePost);

router.post("/likepost",place.likePost);

router.get("/loadcomments",place.loadComments);

router.post("/addcomment",place.addComment);

router.post("/updatelikecomment",place.updateLikeComment);

router.post("/deletecomment",place.deleteComment);

router.post("/deletepost",place.deletePost);

router.post("/addpost",place.addPost);

//login
router.post("/signup",signup.signUpController);

router.post("/login",login.loginController);

//trip
router.get("/loadtripbyidplace",trip.loadTripByIdPlace);

router.get("/gettrip",trip.getTripByIdUserController);

router.get("/getinformationtrip",trip.getTripInformationByIdTrip);

router.get("/getplaceintrip",trip.getPlaceInTrip);

router.get("/getallusername",trip.getAllUser);

router.post("/postAddTrip",trip.addTrip);

router.post("/postedittrip",trip.updateNameDescriptionTrip);

router.post("/updatetimetrip",trip.updateTimeTrip);

router.post("/deleteplaceintrip",trip.deletePlaceInTrip);

router.post("/addPlaceInTrip",trip.addPlaceInTrip);

router.post("/deletetrip",trip.deleteTrip);

router.post("/deletetripmember",trip.deleteTripMember);

router.post("/addusertrip",trip.addUserTrip);

//notification
router.post("/jointrip",notification.joinTrip);

router.post("/rejecttrip",notification.rejectTrip);

router.post("/updatestatusnotification",notification.updateStatusNotification);

router.get("/loadnotification", notification.loadNotification);

//account
router.post("/changepassword",changepassword.changePasswordController);

router.get("/getinfoaccount", user.userGetInfoController);

router.post("/changeinformationaccount", user.changeInforAccount);

//manager

router.post("/loginmanager", manager.loginmanager);

router.get("/getallplaceinfomanager", manager.getAllPlaceInfoManager);

router.get("/getallusermanager", manager.getAllUserManager);

router.post("/deleteplace", manager.deletePlace);

router.post("/deleteuser", manager.deleteUser);

router.get("/loadnotificationmanager", manager.loadNotificationManager);
module.exports = router;
