var singleProductTemplate;

document.addEventListener("DOMContentLoaded", () => {
    singleProductTemplate = Handlebars.compile($("#singleProductTmplt").html());
});

var loadProductsToPage = () => {
    axios.get('/get/productDetails', {params: {}, headers: {"Authorization" : `Bearer ${sessionStorage.getItem("jwtToken")}`} }).then((response) => {
        var productDetails = response.data.productDetails;
        productDetails.forEach(details => {
            var subDesc = details.description;
            details.subDes = subDesc.substr(0, 40) + '...';
            $("#productDetailsContainer").append(singleProductTemplate(details));
        });
    }).catch((err) => {
        console.log(err);
    })
}
