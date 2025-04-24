const displayProductDetails = (productData) => {
  //get product id from electronics.json
  const productDisplayTemplate = Handlebars.compile(
    document.getElementById("productDisplayTemplate").innerHTML
  );
  const product = productData[0];

  product.price = parseFloat(product.price);
  product.discount = parseFloat(product.discount);

  product.newPrice = (product.price * (1 - product.discount / 100)).toFixed(2); // Calculate new price and format to two decimal places

  const html = productDisplayTemplate(product);
  document.getElementById("productDisplayContainer").innerHTML += html;


  $("#userRatingStars i").click((event) => {
      $("#userRatingStars i").removeClass("fas").addClass("far"); //every star as deselected

      $(event.target).removeClass("far").addClass("fas");
      $(event.target).prevAll().removeClass("far").addClass("fas");
  })
};

const smallImagesClickHandler = () => {
  $(".small-images img").on("click", function () {
    $(".small-images img").removeClass("active");
    $(this).addClass("active");
    const mainImageSrc = $(this).attr("src");
    $(".main-image img").attr("src", mainImageSrc);
  });
};

// helper function to render stars
Handlebars.registerHelper("renderStars", (rating) =>{
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 >= 0.5 ? 1 : 0;
  let emptyStars = 5 - fullStars - halfStar;

  let stars = "";
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  return new Handlebars.SafeString(stars);
});


