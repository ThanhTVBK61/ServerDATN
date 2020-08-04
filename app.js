var http = require('http');
var express = require('express');
var route = require("./server/route/GetDatabase")
var path = require('path');
var bodyParser = require('body-parser');
const { json } = require('body-parser');
var app = express();
var server = http.createServer(app);

var connection = require("./server/db/connection")
var exec = require("./server/db/exec_query")
var get = require("./server/db/queryNotification")

var io = require("socket.io").listen(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'image')))

console.log("Image source: " + path.join(__dirname, 'image'));
console.log("Server is running ...");

app.use("/", route);

server.listen(3000);


var listUser = [];

io.sockets.on("connection", function (socket) {

    //Thêm kết nối mới
    socket.on("new connection", function (username) {
        console.log("Co nguoi ket noi den: " + username);
        listUser.push({ id: socket.id, username });
        console.log("Number connection: " + listUser.length);
    })
    //Xóa kết nối
    socket.on("disconnection", function (username) {
        var index = -1;
        console.log("Number connection before: " + listUser.length);
        index = listUser.findIndex((item) => item.username == username);

        console.log("Huy ket noi " + index + " : " + username);
        listUser.splice(index);
        console.log("Number connection after: " + listUser.length);
    })

    //Thêm thành viên vào chuyến đi
    socket.on("add member", function (message) {
        var mMessage = JSON.parse(message);

        var idTrip = mMessage.idTrip;
        var idUserSend = mMessage.idUserSend;
        var nameTrip = mMessage.nameTrip;
        var usernameSend = mMessage.usernameSend;
        var imageUrlSend = mMessage.imageUrlSend;
        var type = mMessage.type;
        var time = mMessage.time;
        var usernameReceive = mMessage.usernameReceive;
        var idUserReceive = mMessage.idUserReceive;

        console.log("******Thông tin lời mời*******");
        console.log("idTrip: " + idTrip);
        console.log("idUserSend: " + idUserSend);
        console.log("nameTrip: " + nameTrip);
        console.log("usernameSend: " + usernameSend);
        console.log("imageUrlSend: " + imageUrlSend);
        console.log("type: " + type);
        console.log("time: " + time);
        console.log("usernameReceive: " + usernameReceive);
        console.log("idUserReceive: " + idUserReceive);

    
        //Thêm thông báo mới vào trong cơ sở dữ liệu
        exec.exec_query(get.addNotification(idUserReceive,idUserSend,idTrip,nameTrip,type,1,time));

       
        listUser.forEach(e => {
            if (e.username == usernameReceive) {
                console.log("Socket des: " + e.username);
                io.to(e.id).emit("new notification",
                    {
                        idTrip: idTrip,
                        name: nameTrip,
                        type: type,
                        usernameSend: usernameSend,
                        imageUrl: imageUrlSend,
                        status: 1
                    });
            }
        });
    })

    //Thêm bình luận vào chuyến đi
    socket.on("new comment", function (message) {
        var mMessage = JSON.parse(message);

        var idPlace = mMessage.idPlace;
        var idUserSend = mMessage.idUserSend;
        var usernameSend = mMessage.usernameSend;
        var idUserReceive = mMessage.idUserReceive;
        var namePlace = mMessage.namePlace;
        var Content = mMessage.Content;
        var time = mMessage.time;
        var type = mMessage.type;
        var usernameReceive = mMessage.usernameAdminPost;
        var imageUrlSend = "";

        console.log("******Thông tin bình luận*******");
        console.log("idPlace: " + idPlace);
        console.log("idUserSend: " + idUserSend);
        console.log("idUserReceive: " + idUserReceive);
        console.log("namePlace: " + namePlace);
        console.log("Content: " + Content);
        console.log("time: " + time);
        console.log("type: " + type);
        console.log("usernameAdminPost: " + usernameReceive);
    
        //Thêm thông báo mới vào trong cơ sở dữ liệu
        exec.exec_query(get.addNotification(idUserReceive,idUserSend,idPlace,namePlace,type,1,time));

        listUser.forEach(e => {
            if (e.username == usernameReceive) {
                console.log("Socket des: " + e.username);
                io.to(e.id).emit("new notification",
                    {
                        idTrip: idPlace,
                        name: namePlace,
                        type: type,
                        time: time,
                        usernameSend: usernameSend,
                        imageUrl: imageUrlSend,
                        status: 1
                    });
            }
        });
    })
    
   
    socket.on("new report", function (message) {
        var mMessage = JSON.parse(message);

        
        var idUserSend = mMessage.idUserSend;
        var time = mMessage.time;
        //iduser idcomment phản hồi bình luận, phản hồi bài viết
        var type = mMessage.type;
        var idPlace = mMessage.idPlace;
        var idUserReceive = 16;
        var nameUserSend = mMessage.nameUserSend;
        var report =mMessage.report;
        var imageUrlSend = "";

        console.log("******Thông tin bình luận*******");

        console.log("idUserReceive: " + idUserReceive);
        console.log("idUserSend: " + idUserSend);
        console.log("type: " + type);
        console.log("nameUserSend: " + nameUserSend);
        console.log("report: " + report);
        console.log("idPlace: " + idPlace);
        console.log("time: " + time);
        console.log("imageUrlSend: " + imageUrlSend);
    
        // Thêm thông báo mới vào trong cơ sở dữ liệu
        exec.exec_query(get.addNotification(idUserReceive,idUserSend,idPlace,report,type,1,time));

        listUser.forEach(e => {
            if (e.username == "manager") {
                console.log("Socket des: " + e.username);
                io.to(e.id).emit("new report",
                    {
                        nameUserSend: nameUserSend,
                        imageUrl: imageUrlSend,
                        report: report,
                        type: type,
                        time: time
                    });
            }
        });
    })

});
