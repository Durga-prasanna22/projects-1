document.addEventListener("DOMContentLoaded", () => {
        axios.get("/session/checkUserSession").then((response) => {
            console.log("session details");
            console.log(response);
            if (response.data.isUserLoggedin) {
                loadSelectedPage('productsLoad');
            } else {
                loadSelectedPage('onload');
            }
        }).catch((err) => {

        });
       
            
       
    // loadSelectedPage('productsLoad');
    // loadSelectedPage('onload');
   //TODO test product display page on load - remove this line
    // loadSelectedPage('productDisplay');
});

var logOutUser = () => {
    axios.get("/terminate/session").then(() => {
        loadSelectedPage('onload');
    })
}

var loadSelectedPage = (pageType) => {
    console.log(location);
    var templateUrl = '';
    switch(pageType) {
        case 'onload':
            location.hash = 'onloadPage';
            templateUrl = '/templates/onload.htm';
            break;
        case 'productsLoad':
            location.hash = 'loadProductDetails';
            templateUrl = '/templates/productDetails.htm';
            break;
        case 'viewCart':
            location.hash = 'viewCart';
            templateUrl = '/templates/viewCart.htm';
            break;
        case "productDisplay":
            location.hash = 'loadProducts';
            templateUrl = '/templates/productDisplay.htm';
            break;
    }
    axios.get(templateUrl).then((response) => {
        console.log(response);
        $("main").html(response.data);
        if (pageType == 'productsLoad') {
            loadProductsToPage();
        }
        if (pageType == 'productDisplay') {
            displayProductDetails();
        }
    })
}


var sendMailWithOTP = () => {
    var url = "http://localhost:8081/send/mail";
    axios.get(url, {params: {otpValue: 'AB123%'}}).then(() => {
        alert("mail been sent")
    })

    
}