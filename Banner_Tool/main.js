let fullName, sideText, fullNameSizeInput, sideTextSizeInput, imageInput, generateBtn, canvas, ctx;

function drawCanvas (canvas, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape){
    // Size canvas to image
    canvas.width = 792;
    canvas.height = 198;

    // Size Siemens Logo
    imgLogo.width = 160;
    imgLogo.height = 60;

    // Size convergeLogo
    convergeLogo.width = 160;
    convergeLogo.height = 60;
 
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw main image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw Logo
    ctx.drawImage(imgLogo, canvas.width - (imgLogo.width + 12), 12, imgLogo.width, imgLogo.height);

    // Draw converge logo if requested
    if(convergeLogoCheck == true){
        ctx.drawImage(convergeLogo, canvas.width - (convergeLogo.width + 12), canvas.height - (convergeLogo.height + 12), convergeLogo.width, convergeLogo.height);
    }

    // Canvas height - award font
    const profileImgFrameVert = canvas.height - canvas.width * .04;
    // Canvas width up until the text starts
    const profileImgFrameHor = canvas.width / 3;
    // Grab Profile Image
    if(profileImg.value != '' && profilePicCheck == true){
        var reader = new FileReader();
        reader.onload = function(){
            profileImgReader = new Image;
            profileImgReader.src = reader.result;
            profileImgReader.addEventListener("load", () => {
                // Resize picture to fit canvas
                let ratio = 0;
                if(profileImgReader.width > 150 || profileImgReader.height > 130){
                    if(profileImgReader.width > profileImgReader.height){
                        var profileWidthOld = profileImgReader.width;
                        profileImgReader.width = 150;
                        profileImgReader.height = profileImgReader.height * profileImgReader.width / profileWidthOld;
                        ratio = 1;
                    }
                    else{
                        var profileHeightOld = profileImgReader.height;
                        profileImgReader.height = 130;
                        profileImgReader.width = profileImgReader.width * profileImgReader.height / profileHeightOld;
                        ratio = 0;
                    }
                }
                // Check if heigt or width of picture is larger and create circle with variable radius
                if(!profilePicShape){
                    if(ratio == 0){
                        ctx.arc(profileImgFrameHor / 2, canvas.height / 2 + ((canvas.height - profileImgFrameVert) / 2), profileImgReader.width / 2, 0, Math.PI * 2, true);
                    }
                    else{
                        ctx.arc(profileImgFrameHor / 2, canvas.height / 2 + ((canvas.height - profileImgFrameVert) / 2), profileImgReader.height / 2, 0, Math.PI * 2, true);
                    }
                    ctx.clip();
                    // Draw Image and auto-center it
                    ctx.drawImage(profileImgReader, profileImgFrameHor / 2 - profileImgReader.width / 2, canvas.height / 2 + ((canvas.height - profileImgFrameVert) / 2)  - profileImgReader.height / 2 , profileImgReader.width, profileImgReader.height);
                    // Create the border around the circle
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 3;
                    ctx.arc(profileImgFrameHor / 2, canvas.height / 2 + ((canvas.height - profileImgFrameVert) / 2), profileImgReader.width / 2 + ctx.lineWidth, 0, Math.PI * 2, true);
                    ctx.stroke();
                }
                else{
                    ctx.drawImage(profileImgReader, profileImgFrameHor / 2 - profileImgReader.width / 2, canvas.height / 2 + ((canvas.height - profileImgFrameVert) / 2)  - profileImgReader.height / 2 , profileImgReader.width, profileImgReader.height);
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = '2';
                    ctx.strokeRect(profileImgFrameHor / 2 - profileImgReader.width / 2, canvas.height / 2 + ((canvas.height - profileImgFrameVert) / 2)  - profileImgReader.height / 2 , profileImgReader.width, profileImgReader.height);
                }
            });
        }
        // Load reader file
        reader.readAsDataURL(profileImg.files[0]);
    }
}

function insertText(canvas, fullName, awardTitle, sideText){
    //Text style initially
    const fontSizeAward = canvas.width * .035;
    const fontSizeName = canvas.width * .04;
    const fontSizeAdd = canvas.width * .025;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    // Text font settings for Award
    ctx.font = fontSizeAward + 'px Open Sans, Arial';
    ctx.lineWidth = fontSizeAward / 20;
    ctx.textAlign = "start";

    // Draw Award
    ctx.textBaseline = 'top';
    ctx.fillText(awardTitle, 10, 10, canvas.width);

    // Text font settings for name
    ctx.textBaseline = 'middle';
    ctx.font = fontSizeName + 'px Open Sans, Arial';
    ctx.lineWidth = fontSizeName / 20;

    // Draw Name
    ctx.fillText(fullName, canvas.width / 3, canvas.height/2.2, canvas.width);

    // Text font settings for additional text
    ctx.font = fontSizeAdd + 'px Open Sans, Arial';
    ctx.lineWidth = fontSizeAdd / 20;

    //Draw Additional Text
    rowsError = false;
    charsError = false;
    charsErrorLine = null;
    sideText.split('\n').forEach(function(t,i){
        if(i >= 3){
            rowsError = true;
        }
        else if(t.length > 31){
            charsError = true;
            charsErrorLine = i + 1;
        }
        else{
            ctx.fillText(t, canvas.width / 3, canvas.height/2.2 + i * fontSizeAdd + fontSizeName, canvas.width);
        }
    });
    if(rowsError){
        alert("Too many additional text rows");
    }
    if(charsError){
        alert("row " + charsErrorLine + " exceed character limit");
    }
}

function generateBanner () {

    // Converge Logo
    let convergeLogo = new Image;
    convergeLogo.src = ".\\imgs\\siemensConvergeLogo.jpg"

    // Siemens Logo
    let imgLogo = new Image;
    imgLogo.src = ".\\imgs\\siemensLogo.jpg"

    // Only execute after Siemens logo is up
    imgLogo.onload = function(){
        //Grab html variables
        fullName = document.getElementById('firstname').value + " " + document.getElementById('lastname').value;
        awardTitle = document.getElementById('award').value;
        sideText = document.getElementById('addtext').value;
        convergeLogoCheck = document.getElementById('convergelogo').checked;
        profileImg = document.getElementById('profileinput');
        profilePicCheck = document.getElementById('profilepic').checked;
        profilePicShape = document.getElementById('profilePicShapeRect').checked;
        backgroundImg = document.getElementById('backgroundChoice').value;
        backgroundInput = document.getElementById('backgroundUploadInput');

        //if background is pre-loaded or uploaded
        if(backgroundImg != 'Upload'){
            let img = new Image;
            img.src = backgroundImg;
            //For some reason, taking img out of this conditional did not work. Maybe declaring a var "new" only works locally?
            img.onload = function(){    
                //Draw canvas w/ images
                drawCanvas(canvas, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape);
                insertText(canvas, fullName, awardTitle, sideText);
            }
        } else {
            if(backgroundInput.value != ''){
                var backgroundReader = new FileReader();
                backgroundReader.onload = function(){
                    let img = new Image;
                    img.src = backgroundReader.result;
                    img.addEventListener("load", () => {
                        //Draw canvas w/ images
                        drawCanvas(canvas, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape);
                        insertText(canvas, fullName, awardTitle, sideText);
                    });
                }
                backgroundReader.readAsDataURL(backgroundInput.files[0]);
            }
        }
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
}

function backgroundpicfunction(){
    var checkBackgroundUpload = document.getElementById('backgroundChoice').value;
    var backgroundInput = document.getElementById('backgroundUpload');
    if(checkBackgroundUpload == 'Upload'){
        backgroundInput.style.display = "block";
    }
    else{
        backgroundInput.style.display = "none";
    }
    generateBanner();
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

downloadImg = function(el){
    var banner = canvas.toDataURL("image/png");
    el.href = banner;
}

init();
