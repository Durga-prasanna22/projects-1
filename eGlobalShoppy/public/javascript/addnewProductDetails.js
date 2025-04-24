var productImagePath = '';
var addNewProductDetails = () => {
    var features = $("#s_features").val();
    features = features.split(",");
    var pdetails = {
        "id": $("#s_id").val(),
        "name": $("#s_name").val(),
        "title": $("#s_title").val(),
        "price": $("#s_price").val(),
        "image": productImagePath,
        "description": $("#s_prodDesc").val(),
        "discount": $("#s_discount").val(),
        "category": $("#s_category").val(), 
        "rating": $("#s_rating").val(),
        "images": [],
        "features": features,
        "reviews": []
    }

    console.log(pdetails);
    return;
    
    axios.post("/add/newProduct", pdetails).then((result) => {
        console.log("result");
        console.log(result);
        restFields();
        $(".msgBlock").text("Successfly added Product");
        $(".msgBlock").show(1000);
    }).catch((err) => {
        
    });
}

var restFields = () => {
    $("#s_id").val('');
    $("#s_name").val('');
    $("#s_title").val('');
    $("#s_price").val(0)
    $("#s_prodDesc").val('');
    $("#s_discount").val(0);
    $("#s_category").val('');
    $("#s_rating").val('');
    $("#s_features").val('');
}

var uploadProductImage = () => {
    let uploadfile = $("input[name=prodImage]")[0].files[0] // file from input
    console.log(uploadfile);
    var selectedFileType = uploadfile.type;
    if (!selectedFileType.match(/image/)) {
        alert("Selected image format is not allowed");
        return;
    }
    let formData = new FormData();
    formData.append("prodImage", uploadfile);
    if (uploadfile.size >= 30000) {
        alert("file is bigger than accepted - > 1500 b");
        return;
    } else {
    
    }

    axios.post('/upload/image', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
    }).then((response) => {
        console.log(response);
         //handle success
         productImagePath = response.data.filePath;
    }).catch((error) => {
        // handle error
    })
}