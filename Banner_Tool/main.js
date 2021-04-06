let fullName, sideText, fullNameSizeInput, sideTextSizeInput, imageInput, generateBtn, canvas, ctx;

function drawCanvas (canvas, img, imgLogo, convergeLogo, convergeLogoCheck){
    // Size canvas to image
    canvas.width = "792";
    canvas.height = "198";
 
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw main image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw Logo
    ctx.drawImage(imgLogo, canvas.width - 172, 12, 160, 60);

    // Draw converge logo if requested
    if(convergeLogoCheck == true){
        ctx.drawImage(convergeLogo, canvas.width - 140, canvas.height - 40, 140, 41);
    }
    /* if(profileImg != ""){
        if(profileImg.width > 200 || profileImg.height > 100){
            if(profileImg.width > profileImg.height){
                var profileWidthOld = profileImg.width;
                profileImg.width = 200;
                profileImg.height = profileImg.height * profileImg.width / profileWidthOld;
            }
            else{
                var profileHeightOld = profileImg.height;
                profileImg.height = 100;
                profileImg.width = profileImg.width * profileImg.height / profileHeightOld;
            }
        }
        ctx.drawImage(profileImg, canvas.width/5, canvas.height / 2);
    } */
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

function generateBanner (img, imgLogo, convergeLogo) {
    //Grab html variables
    fullName = document.getElementById('firstname').value + " " + document.getElementById('lastname').value;
    awardTitle = document.getElementById('award').value;
    sideText = document.getElementById('addtext').value;
    convergeLogoCheck = document.getElementById('convergelogo').checked;
    downloadBtn = document.getElementById('download-btn');
    //profileImg = document.getElementById('profileInput')

    //Draw canvas w/ images
    drawCanvas(canvas, img, imgLogo, convergeLogo, convergeLogoCheck);

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

function init () {
    // Initialize variables
    canvas = document.getElementById('banner-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 0;

    // Converge Logo
    let convergeLogo = new Image;
    convergeLogo.src = "C:\\Users\\g8uqyr\\Documents\\siemensConvergeLogo.jpg"

    // Siemens Logo
    let imgLogo = new Image;
    imgLogo.src = "C:\\Users\\g8uqyr\\Documents\\siemensLogo.jpg"

    // Banner generation
    generateBtn = document.getElementById('generate-btn');
    $("#generate-btn").click(function () {
        let imgbackground = new Image;
        imgbackground.src = "C:\\Users\\g8uqyr\\Documents\\SiemensBackground3.jpg";
        imgbackground.onload = function(){
            generateBanner(imgbackground, imgLogo, convergeLogo);
        }
    });
}

init();
