var productDetails =[
    {
        imageUrl: './images/slider/image1.png' 
    },
    {
        imageUrl: './images/slider/image2.png' 
    },
    {
        imageUrl: './mages/slider/image3.png' 
    },
    {
        imageUrl: './images/slider/image4.png' 
    },
    {
        imageUrl: './images/slider/image5.png' 
    },
    {
        imageUrl: './images/slider/image6.png' 
    },
    {
        imageUrl: './images/slider/image7.png' 
    },
    {
        imageUrl: './images/slider/image8.png' 
    },
    {
        imageUrl: './images/slider/image9.png' 
    },
    {
        imageUrl: './images/slider/image10.png' 
    },
    {
        imageUrl: './images/slider/image11.png' 
    }



];
var createProductDetailsTemplate = (pdetails,no) => {

    //This is created for Carousel hyphen button
    var buttonSlide = document.createElement("button");
    buttonSlide.setAttribute("type","button");
    buttonSlide.setAttribute("data-bs-target","#carouselId");
    buttonSlide.setAttribute("data-bs-slide-to",no);
    if(no == 0){
        buttonSlide.setAttribute("class","active");
        buttonSlide.setAttribute("aria-current","true"); 
    }
    buttonSlide.setAttribute("aria-label","Slide "+ (no +1));
    buttonSlide.style.backgroundColor ="black";
    console.log(buttonSlide);
    console.log(document.querySelector("#carouselHyphenId"));
    document.querySelector("#carouselHyphenId").append(buttonSlide);

    //This is created for Carousel Items

    var childDiv = document.createElement("div");
    if(no == 0){
        childDiv.setAttribute("class","carousel-item active");
    }else{
        childDiv.setAttribute("class","carousel-item");
    }
    childDiv.style.height = "450px";

    
    var image = document.createElement("img");
    image.setAttribute("src",pdetails.imageUrl);
    image.setAttribute("class","d-block w-95");
    image.setAttribute("alt", no +" Slide");
    image.style.height = "65%";
    image.style.width = "100%" ;
    image.style.objectFit = "cover";
    image.style.position = "absolute";
    image.style.marginTop = "70px";
    childDiv.append(image);

    var childOfChildDiv = document.createElement("div");
    childOfChildDiv.setAttribute("class", "carousel-caption d-none d-md-block");


    var paragraph = document.createElement("p");
    paragraph.innerText = ""
    childOfChildDiv.append(paragraph);


    
    
    childDiv.append(childOfChildDiv);
    console.log(childDiv);
    document.querySelector("#carouselItemsId").append(childDiv);
   
}

document.addEventListener("DOMContentLoaded", () => {
            // loadSlider();
      }
);


var loadSlider = () => {
    var div1 = document.createElement("div");
    div1.setAttribute("class","container mt-5");
    document.querySelector("#sliderId").append(div1);

    var div21 = document.createElement("div");
    div21.setAttribute("class","carousel slide");
    div21.setAttribute("data-bs-ride", "carousel");
    div21.setAttribute("id", "carouselId");
    div1.append(div21);

    //Carousel hyphen button
    var div31 = document.createElement("div");
    div31.setAttribute("class","carousel-indicators");
    div31.setAttribute("id", "carouselHyphenId");
    div21.append(div31);

    //Carousel Items
    var div32 = document.createElement("div");
    div32.setAttribute("class","carousel-inner");
    div32.setAttribute("id", "carouselItemsId");
    div21.append(div32);

    //Controls/Arrows 
    var buttonPrev = document.createElement("button");
    buttonPrev.setAttribute("class","carousel-control-prev");
    buttonPrev.setAttribute("type", "button");
    buttonPrev.setAttribute("data-bs-target", "#carouselId");
    buttonPrev.setAttribute("data-bs-slide", "prev");

    var spanPrev = document.createElement("span");
    spanPrev.setAttribute("class","carousel-control-prev-icon");
    spanPrev.setAttribute("aria-hidden", "true");
    spanPrev.style.backgroundColor = "black"
    buttonPrev.append(spanPrev);


    div21.append(buttonPrev);


    var buttonNext = document.createElement("button");
    buttonNext.setAttribute("class","carousel-control-next");
    buttonNext.setAttribute("type", "button");
    buttonNext.setAttribute("data-bs-target", "#carouselId");
    buttonNext.setAttribute("data-bs-slide", "next");

    var spanNext = document.createElement("span");
    spanNext.setAttribute("class","carousel-control-next-icon");
    spanNext.setAttribute("aria-hidden", "true");
    spanNext.style.backgroundColor = "black"
    buttonNext.append(spanNext);

    div21.append(buttonNext);
    



      for(var i =0 ; i < productDetails.length ; i++){
          createProductDetailsTemplate(productDetails[i],i);
          }

}