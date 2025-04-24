var readUserDetails = () => {
    var userData = {};
    userData.accountId = $("#s_accountId").val();
    userData.fullName = $("#fullName").val();
    userData.mailId = $("#mailId").val();
    userData.password = $("#s_password").val();
    console.log(userData);
    axios.post("/new/userSignup", userData).then((response) => {
        console.log(response);
        $("#success_signup").show(100);
        resetFields();
    }).catch((err) => {

    })
}

var resetFields = () => {
    $("#s_accountId").val('');
    $("#fullName").val('');
    $("#s_password").val('');
    $("#s_rePassword").val('');
    $("#mailId").val('');
}