function generateBannerFacebook () {

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
                //Draw canvasFacebook w/ images
                drawCanvasFacebook(canvasFacebook, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape);
                insertTextFacebook(canvasFacebook, fullName, awardTitle, sideText, profilePicCheck);
            }
        } else {
            if(backgroundInput.value != ''){
                var backgroundReader = new FileReader();
                backgroundReader.onload = function(){
                    let img = new Image;
                    img.src = backgroundReader.result;
                    img.addEventListener("load", () => {
                        //Draw canvasFacebook w/ images
                        drawCanvasFacebook(canvasFacebook, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape);
                        insertTextFacebook(canvasFacebook, fullName, awardTitle, sideText, profilePicCheck);
                    });
                }
                backgroundReader.readAsDataURL(backgroundInput.files[0]);
            } else {
                let img = new Image;
                img.src = ".\\imgs\\SiemensBackgroundNodes.png";
                img.addEventListener("load", () => {
                    //Draw canvasFacebook w/ images
                    drawCanvasFacebook(canvasFacebook, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape);
                    insertTextFacebook(canvasFacebook, fullName, awardTitle, sideText, profilePicCheck);
                });
            }
        }
    }
}

function drawCanvasFacebook(canvasFacebook, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape){
    // Size canvasFacebook to image
    canvasFacebook.width = 820;
    canvasFacebook.height = 312;

    // Size Siemens Logo
    imgLogo.width = 170;
    imgLogo.height = 70;

    // Size convergeLogo
    convergeLogo.width = 170;
    convergeLogo.height = 70;

    const logoBuffer = canvasFacebook.height * .06;
 
    // Clear canvasFacebook
    ctxFacebook.clearRect(0, 0, canvasFacebook.width, canvasFacebook.height);

    // Draw main image
    ctxFacebook.drawImage(img, 0, 0, canvasFacebook.width, canvasFacebook.height);

    // Draw Logo
    ctxFacebook.drawImage(imgLogo, canvasFacebook.width - (imgLogo.width + logoBuffer), logoBuffer, imgLogo.width, imgLogo.height);

    // Draw converge logo if requested
    if(convergeLogoCheck == true){
        ctxFacebook.drawImage(convergeLogo, canvasFacebook.width - (convergeLogo.width + logoBuffer), canvasFacebook.height - (convergeLogo.height + logoBuffer), convergeLogo.width, convergeLogo.height);
    }

    // canvasFacebook height - award font
    const profileImgFrameVert = canvasFacebook.height - canvasFacebook.width * .04;
    // canvasFacebook width up until the text starts
    const profileImgFrameHor = canvasFacebook.width / 3;
    // Grab Profile Image
    if(profileImg.value != '' && profilePicCheck == true){
        var reader = new FileReader();
        reader.onload = function(){
            profileImgReader = new Image;
            profileImgReader.src = reader.result;
            profileImgReader.addEventListener("load", () => {
                // Resize picture to fit canvasFacebook
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
                        ctxFacebook.arc(profileImgFrameHor / 2, canvasFacebook.height / 2 + ((canvasFacebook.height - profileImgFrameVert) / 2), profileImgReader.width / 2, 0, Math.PI * 2, true);
                    }
                    else{
                        ctxFacebook.arc(profileImgFrameHor / 2, canvasFacebook.height / 2 + ((canvasFacebook.height - profileImgFrameVert) / 2), profileImgReader.height / 2, 0, Math.PI * 2, true);
                    }
                    ctxFacebook.clip();
                    // Draw Image and auto-center it
                    ctxFacebook.drawImage(profileImgReader, profileImgFrameHor / 2 - profileImgReader.width / 2, canvasFacebook.height / 2 + ((canvasFacebook.height - profileImgFrameVert) / 2)  - profileImgReader.height / 2 , profileImgReader.width, profileImgReader.height);
                    // Create the border around the circle
                    ctxFacebook.strokeStyle = 'white';
                    ctxFacebook.lineWidth = 3;
                    ctxFacebook.arc(profileImgFrameHor / 2, canvasFacebook.height / 2 + ((canvasFacebook.height - profileImgFrameVert) / 2), profileImgReader.width / 2 + ctxFacebook.lineWidth, 0, Math.PI * 2, true);
                    ctxFacebook.stroke();
                }
                else{
                    ctxFacebook.drawImage(profileImgReader, profileImgFrameHor / 2 - profileImgReader.width / 2, canvasFacebook.height / 2 + ((canvasFacebook.height - profileImgFrameVert) / 2)  - profileImgReader.height / 2 , profileImgReader.width, profileImgReader.height);
                    ctxFacebook.strokeStyle = 'white';
                    ctxFacebook.lineWidth = '2';
                    ctxFacebook.strokeRect(profileImgFrameHor / 2 - profileImgReader.width / 2, canvasFacebook.height / 2 + ((canvasFacebook.height - profileImgFrameVert) / 2)  - profileImgReader.height / 2 , profileImgReader.width, profileImgReader.height);
                }
            });
        }
        // Load reader file
        reader.readAsDataURL(profileImg.files[0]);
    }
}

function insertTextFacebook(canvasFacebook, fullName, awardTitle, sideText, profilePicCheck){
    //Text style initially
    const fontSizeAward = canvasFacebook.width * .035;
    const fontSizeName = canvasFacebook.width * .04;
    const fontSizeAdd = canvasFacebook.width * .025;
    ctxFacebook.fillStyle = 'white';
    ctxFacebook.textAlign = 'center';

    const awardSpacePic = canvasFacebook.height * .05;
    const awardSpaceNoPic = canvasFacebook.height * .15;

    // Text font settings for Award
    ctxFacebook.font = fontSizeAward + 'px Open Sans, Arial';
    ctxFacebook.lineWidth = fontSizeAward / 20;
    ctxFacebook.textAlign = "start";

    // Draw Award
    // Move text if profile picture is or is not present
    ctxFacebook.textBaseline = 'top';
    if(profilePicCheck){
        ctxFacebook.fillText(awardTitle, awardSpacePic, awardSpacePic, canvasFacebook.width); 
    }else{
        ctxFacebook.fillText(awardTitle, awardSpaceNoPic, awardSpaceNoPic, canvasFacebook.width);
    }

    // Text font settings for name
    ctxFacebook.textBaseline = 'middle';
    ctxFacebook.font = fontSizeName + 'px Open Sans, Arial';
    ctxFacebook.lineWidth = fontSizeName / 20;

    // Draw Name
    // Move text if profile picture is or is not present
    if(profilePicCheck){
        ctxFacebook.fillText(fullName, canvasFacebook.width / 3, canvasFacebook.height/2.2, canvasFacebook.width);
    }else{
        ctxFacebook.fillText(fullName, canvasFacebook.width / 3.5, canvasFacebook.height/2, canvasFacebook.width);
    }

    // Text font settings for additional text
    ctxFacebook.font = fontSizeAdd + 'px Open Sans, Arial';
    ctxFacebook.lineWidth = fontSizeAdd / 20;

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
            // Move text if profile picture is or is not present
            if(profilePicCheck){
                ctxFacebook.fillText(t, canvasFacebook.width / 3, canvasFacebook.height/2.2 + i * fontSizeAdd + fontSizeName, canvasFacebook.width);
            }
            else{
                ctxFacebook.fillText(t, canvasFacebook.width / 3.5, canvasFacebook.height/2 + i * fontSizeAdd + fontSizeName, canvasFacebook.width);
            }
        }
    });
    if(rowsError){
        alert("Too many additional text rows (limit 3)");
    }
    if(charsError){
        alert("row " + charsErrorLine + " exceeds the character limit of 31 characters");
    }
}

function initFacebook() {
    // Initialize variables
    canvasFacebook = document.getElementById('banner-canvas-facebook');
    ctxFacebook = canvasFacebook.getContext('2d');
    canvasFacebook.width = canvasFacebook.height = 0;

    // Banner generation
    window.onload = function(){
        generateBannerFacebook();
    }
}

initFacebook();

