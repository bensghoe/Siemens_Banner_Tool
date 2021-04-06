let fullName, sideText, fullNameSizeInput, sideTextSizeInput, imageInput, generateBtn, canvas, ctx;

function drawCanvas (canvas, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck){
    // Size canvas to image
    canvas.width = 792;
    canvas.height = 198;

    // Size Siemens Logo
    imgLogo.width = 160;
    imgLogo.height = 60;

    // Size convergeLogo
    convergeLogo.width = 140;
    convergeLogo.height = 41;
 
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw main image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw Logo
    ctx.drawImage(imgLogo, canvas.width - (imgLogo.width + 12), 12, imgLogo.width, imgLogo.height);

    // Draw converge logo if requested
    if(convergeLogoCheck == true){
        ctx.drawImage(convergeLogo, canvas.width - convergeLogo.width, canvas.height - convergeLogo.height, convergeLogo.width, convergeLogo.height);
    }

    // Grab Profile Image
    if(profileImg.value != '' && profilePicCheck == true){
        var reader = new FileReader();
        reader.onload = function(){
            profileImgReader = new Image;
            profileImgReader.src = reader.result;
            profileImgReader.addEventListener("load", () => {
                // Resize picture to fit canvas
                if(profileImgReader.width > 150 || profileImgReader.height > 130){
                    if(profileImgReader.width > profileImgReader.height){
                        var profileWidthOld = profileImgReader.width;
                        profileImgReader.width = 150;
                        profileImgReader.height = profileImgReader.height * profileImgReader.width / profileWidthOld;
                    }
                    else{
                        var profileHeightOld = profileImgReader.height;
                        profileImgReader.height = 130;
                        profileImgReader.width = profileImgReader.width * profileImgReader.height / profileHeightOld;
                    }
                }
                // Draw Image
                ctx.drawImage(profileImgReader, canvas.width / 12, canvas.height / 4, profileImgReader.width, profileImgReader.height);
            });
        }
        // Load reader file
        reader.readAsDataURL(profileImg.files[0]);
    }
}

function insertText(canvas, fullName, awardTitle, sideText){
    //Text style initially
    const fontSizeAward = canvas.width * .04;
    const fontSizeName = canvas.width * .04;
    const fontSizeAdd = canvas.width * .025;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    // Text font settings for Award
    ctx.font = fontSizeAward + 'px Trocchi';
    ctx.lineWidth = fontSizeAward / 20;
    ctx.textAlign = "start";

    // Draw Award
    ctx.textBaseline = 'top';
    ctx.fillText(awardTitle, 10, 10, canvas.width);

    // Text font settings for name
    ctx.textBaseline = 'middle';
    ctx.font = fontSizeName + 'px Trocchi';
    ctx.lineWidth = fontSizeName / 20;

    // Draw Name
    ctx.fillText(fullName, canvas.width / 3, canvas.height/2.2, canvas.width);

    // Text font settings for additional text
    ctx.font = fontSizeAdd + 'px Trocchi';
    ctx.lineWidth = fontSizeAdd / 20;

    //Draw Additional Text
    rowsError = false;
    sideText.split('\n').forEach(function(t,i){
        if(i >= 3){
            rowsError = true;
        }
        else{
            ctx.fillText(t, canvas.width / 3, canvas.height/2.2 + i * fontSizeAdd + fontSizeName, canvas.width);
        }
    });
    if(rowsError){
        alert("Too many additional text rows");
    }
}

function generateBanner () {
    // Converge Logo
    let convergeLogo = new Image;
    convergeLogo.src = "C:\\Users\\g8uqyr\\Documents\\siemensConvergeLogo.jpg"

    // Siemens Logo
    let imgLogo = new Image;
    imgLogo.src = "C:\\Users\\g8uqyr\\Documents\\siemensLogo.jpg"

    //Background
    let img = new Image;
    img.src = "C:\\Users\\g8uqyr\\Documents\\SiemensBackground3.jpg";
    
    img.onload = function(){
        //Grab html variables
        fullName = document.getElementById('firstname').value + " " + document.getElementById('lastname').value;
        awardTitle = document.getElementById('award').value;
        sideText = document.getElementById('addtext').value;
        convergeLogoCheck = document.getElementById('convergelogo').checked;
        downloadBtn = document.getElementById('download-btn');
        profileImg = document.getElementById('profileinput');
        profilePicCheck = document.getElementById('profilepic').checked;

        //Draw canvas w/ images
        drawCanvas(canvas, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck);

        insertText(canvas, fullName, awardTitle, sideText);

        //Download Button
        if(downloadBtn.style = "none"){
            downloadBtn.style = "block";
        }
        $("#download-btn").click(function () {
            // img.crossOrigin = 'anonymous';
            // imgLogo.crossOrigin = 'anonymous';
            // convergeLogo.crossOrigin = 'anonymous';
            canvas.toDataURL("image/pgn");
        });
    }
}

function init () {
    // Initialize variables
    canvas = document.getElementById('banner-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 0;

    // Banner generation
    generateBtn = document.getElementById('generate-btn');
    window.onload = function(){
        generateBanner();
    }
    $("#generate-btn").click(function () {
        generateBanner();
    });
}

//Display the "choose file" for the profile picture checked
function profilepicfunction() {
var checkprofilepic = document.getElementById('profilepic')
var addprofileinput = document.getElementById('profilepicinput')

    if (checkprofilepic.checked == true){
        addprofileinput.style.display="block";
    }else{
        addprofileinput.style.display= "none";
    }
    generateBanner();
}

// //Evenlistner to not have the browser do the validation
// form.addEventListener('submit', function (event) {
//     if (form.checkValidity() == false) {
//         // No request can be sent
//         event.preventDefault();
//         // When you are not sending the datawith an ajax request
//         event.stopPropagation();
//     }
//     form.classList.add('was-validated')
// })

init();
