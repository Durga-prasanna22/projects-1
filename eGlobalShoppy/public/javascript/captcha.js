
document.addEventListener("DOMContentLoaded", () => {
    // (function () {
    const fonts = ["cursive", "sans-serif", "serif", "monospace"];
    let captchavalue = "";
    
    function generatecaptcha() {
        let value = btoa(Math.random() * 1000000000);
        value = value.substr(0, 5 + Math.random() * 5);
        captchavalue = value;
    }
    
    function setcaptcha() {
        let html = captchavalue.split("").map((char) => {
            const rotate = -20 + Math.trunc(Math.random() * 30);
            const font = Math.trunc(Math.random() * fonts.length);
            return `<span style="transform:rotate(${rotate}deg); font-family:${fonts[font]}">${char}</span>`;
        }).join("");
        document.querySelector(".preview").innerHTML = html;
    }
    function initcaptcha() {

        document.querySelector(".login-text").addEventListener("click", function () {
            generatecaptcha();
            setcaptcha();
        });
        console.log("login by click on login button")
        document.querySelector(".refresh").addEventListener("click", function () {
            generatecaptcha();
            setcaptcha();
        });
    
    }
    initcaptcha();
     generatecaptcha();
     setcaptcha();
     
});

    
// });




