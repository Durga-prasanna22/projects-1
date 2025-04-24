var socket = io("http://localhost:8081");

socket.on("receiveMsg", (receivedmsg) => {
    console.log("receivedmsg");
    console.log(receivedmsg);
    receivedmsg = JSON.parse(receivedmsg);
    addMsgToContainer(receivedmsg.msg, 'receive')
    console.log(object);
})


var sendMsg = () => {
    var msg = $("#userMsg").val();
    $("#userMsg").val('');
    var userData = {};
    userData.msg = msg;
    userData.date = new Date();
    addMsgToContainer(msg, 'send');

    socket.emit("userSendMsg", JSON.stringify(userData));
}

var addMsgToContainer = (msg, type) => {
    var clasName = '';
    switch(type) {
        case 'send':
            clasName = 'sendMsg';
            break;
        case 'receive':
            clasName = 'receiveMsg';
            break;
    }
    var divTag = $("<div />").addClass(clasName).text(msg);
    $(".msgBlock").append(divTag);
}