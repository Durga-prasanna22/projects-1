var loginModal;

document.addEventListener("DOMContentLoaded", () => {
    loginModal = new bootstrap.Modal('#loginModal', {
        keyboard: false
    })
  if (localStorage.getItem("accId") && localStorage.getItem("accPwd")) {
    document.querySelector("#accountId").value = localStorage.getItem("accId");
    document.querySelector("#password").value = localStorage.getItem("accPwd");
  }
});

var readAccountDetails = () => {
  var userDetails = {};
  if (document.getElementById("rememberMe").checked) {
    localStorage.setItem("accId", userDetails.accountId);
    localStorage.setItem("accPwd", userDetails.password);
  }
  userDetails.accountId = $("#accountId").val();
  userDetails.password = $("#password").val();
  //Remebering Details
  if (document.getElementById("rememberMe").checked) {
    localStorage.setItem("accId", userDetails.accountId);
    localStorage.setItem("accPwd", userDetails.password);
  }
  // axios.get("/validate/credentials", {params: userDetails}).then((result) => {
  //     console.log(result);
  // }).catch((err) => {

    axios.post("/validate/credentials", userDetails).then((result) => {
        if (result.data.msg == 'Valid') {
          sessionStorage.setItem('jwtToken', result.data.token);
            // close the popup
            loginModal.hide();
            loadSelectedPage('productsLoad')
        } else { // Invalid credentials
            $(".invalidCredentials").show(100);
        }
    }).catch((err) => {
      console.log("err");
      console.log(err);
        
    });
}


