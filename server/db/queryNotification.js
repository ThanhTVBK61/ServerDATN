
const addNotification = (idUser,idUserSend,idTrip,name,type,status,time)=>{
    const query = `INSERT INTO notification(notification.IdUser, notification.IdUserSend,notification.IdTrip,notification.Name,notification.Type,notification.Status,notification.Time) 
    VALUES (${idUser},${idUserSend},${idTrip},"${name}","${type}",${status},"${time}")`;
    return query;
}

const updateNotification = (idNotification,type,status)=>{
    const query = `UPDATE notification SET Type = "${type}", Status = ${status}
    WHERE IdNotification = ${idNotification}`;
    return query;
}

const loadNotification = (idUser)=>{
    const query = `SELECT notification.IdNotification,trip.IdTrip,notification.Name AS NameTrip,user.Username,notification.Type,notification.Status,notification.Time,
    CASE WHEN user.ImageUrlUser IS NOT NUll THEN user.ImageUrlUser ELSE "" END AS ImageUrlUser
    FROM notification
    LEFT JOIN trip ON trip.IdTrip = notification.IdTrip
    LEFT JOIN user ON user.IdUser = notification.IdUserSend
    WHERE notification.IdUser = ${idUser}`;
    return query;
}

const updateStatusNotification = (idNotification)=>{
    const query = `UPDATE notification SET Status = 0
    WHERE IdNotification = ${idNotification}`;
    return query;
}
module.exports = {
    addNotification,
    updateNotification,
    loadNotification,
    updateStatusNotification
}