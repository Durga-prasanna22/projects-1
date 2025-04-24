
var selectedProductId = '';
var userCommentsTemplate = ''; 

axios.get("templates/viewComments.htm").then((response) => {
  userCommentsTemplate = Handlebars.compile(response.data);
})

var loadMoreProductDetailsToPage = (productData) => {
  location.hash = 'viewMoreProductDetails';
  axios
    .get("/templates/productMoreDetails.htm")
    .then((response) => {
      console.log(response);
        $("main").html(response.data);
        displayProductDetails(productData);
    })
    .catch((err) => {
      console.log(err);
    });
};

var viewSlectedProductDetails = (productId) => {
  selectedProductId = productId;

  console.log("DAta been passed")
  console.log({params: { id: productId }, headers: {"Authorization" : `Bearer ${sessionStorage.getItem("jwtToken")}`} })
  axios
    .get("/get/productDetails", {params: { id: productId }, headers: {"Authorization" : `Bearer ${sessionStorage.getItem("jwtToken")}`} })
    .then((response) => {
      var productDetails = response.data.productDetails;
      loadMoreProductDetailsToPage(productDetails);
    })
    .catch((err) => {
      console.log(err);
    });
};


var addUserFeedback = () => {
  var userFeedbackData = {
    id: selectedProductId,
    name: 'Test'
  };
  userFeedbackData.rating = $("#userRatingStars .fas").length;
  userFeedbackData.comment = $("#userFeedback").val();
  resetCommentsDFields(); // empty filled data
  axios.post('/add/userComment', userFeedbackData).then((response) => {
    $(".reviews").append(userCommentsTemplate(userFeedbackData));
  }).catch((error) => {
    console.log(error);
  });
}

var resetCommentsDFields = () => {
  $("#userFeedback").val('');
  $("#userRatingStars i").removeClass("fas").addClass("far");
}