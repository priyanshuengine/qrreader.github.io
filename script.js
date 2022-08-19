let QRImgUrl,is_img_selected=false,is_qr_code_decoded=false;

let decoded_qr_text = document.querySelector("#decoded_qr_text");
let qr_code_view_area = document.querySelector(".qr_code_view_area");
let qr_code_img = document.querySelector("#qr_code_img");

let input_select_image = document.querySelector("#input_select_image");
let select_image_btn = document.querySelector("#select_image_btn");

let read_qr_btn = document.querySelector(".read_qr_btn");
let copy_txt_btn = document.querySelector(".copy_txt_btn");

select_image_btn.addEventListener("click", ()=>{
    input_select_image.click();
})

// choose image
input_select_image.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();

        select_image_btn.classList.add("hide_view");
        qr_code_img.classList.remove("hide_view");

        reader.addEventListener("load", function(){
            QRImgUrl = this.result;
            qr_code_img.setAttribute("src", this.result);
        })
        reader.readAsDataURL(file);
        is_img_selected=true;
    }
})

// read qr code
read_qr_btn.addEventListener("click", ()=>{
    if(is_qr_code_decoded==false){
        if(is_img_selected==false){
            alert("Please select QR code image!");
        }else{
            ReadQRCode();
        }
    }else{
        // reset qr code
        is_qr_code_decoded=false;
        is_img_selected=false;
        QRImgUrl = "";
        decoded_qr_text.classList.add("hide_view");
        qr_code_view_area.classList.remove("hide_view");
        select_image_btn.classList.remove("hide_view");
        qr_code_img.classList.add("hide_view");
        read_qr_btn.innerHTML = "Read QR <i class='bx bx-chevron-right' ></i>";
        copy_txt_btn.classList.add("disable_btn");
    }
})

// read qr code function
function ReadQRCode(){
    function decodeImageFrombase64(data, callback){
        qrcode.callback = callback;
        qrcode.decode(data);
    }

    decodeImageFrombase64(QRImgUrl, function(decodedInformation){
        decoded_qr_text.value = decodedInformation;
        decoded_qr_text.classList.remove("hide_view");
        qr_code_view_area.classList.add("hide_view");

        is_qr_code_decoded =true;
        read_qr_btn.innerHTML = "Reset QR  <i class='bx bx-reset'></i>";
        copy_txt_btn.classList.remove("disable_btn");
    });
}


// copy qr code text
copy_txt_btn.addEventListener("click", ()=>{
    if(is_qr_code_decoded==true){
        decoded_qr_text.select();
        decoded_qr_text.setSelectionRange(0,99999);
        document.execCommand('copy');
    }
})
