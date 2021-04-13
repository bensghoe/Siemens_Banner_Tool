function generateBannerTwitter () {

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
                //Draw canvasTwitter w/ images
                drawCanvasTwitter(canvasTwitter, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape);
                insertTextTwitter(canvasTwitter, fullName, awardTitle, sideText, profilePicCheck);
            }
        } else {
            if(backgroundInput.value != ''){
                var backgroundReader = new FileReader();
                backgroundReader.onload = function(){
                    let img = new Image;
                    img.src = backgroundReader.result;
                    img.addEventListener("load", () => {
                        //Draw canvasTwitter w/ images
                        drawCanvasTwitter(canvasTwitter, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape);
                        insertTextTwitter(canvasTwitter, fullName, awardTitle, sideText, profilePicCheck);
                    });
                }
                backgroundReader.readAsDataURL(backgroundInput.files[0]);
            } else {
                let img = new Image;
                img.src = ".\\imgs\\SiemensBackgroundNodes.png";
                img.addEventListener("load", () => {
                    //Draw canvasTwitter w/ images
                    drawCanvasTwitter(canvasTwitter, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape);
                    insertTextTwitter(canvasTwitter, fullName, awardTitle, sideText, profilePicCheck);
                });
            }
        }
    }
}

function drawCanvasTwitter(canvasTwitter, img, imgLogo, convergeLogo, convergeLogoCheck, profileImg, profilePicCheck, profilePicShape){
    // Size canvasTwitter to image
    canvasTwitter.width = 1500;
    canvasTwitter.height = 500;

    // Size Siemens Logo
    imgLogo.width = 294;
    imgLogo.height = 121;

    // Size convergeLogo
    convergeLogo.width = 294;
    convergeLogo.height = 121;

    const logoBuffer = canvasTwitter.height * .06;
 
    // Clear canvasTwitter
    ctxTwitter.clearRect(0, 0, canvasTwitter.width, canvasTwitter.height);

    // Draw main image
    ctxTwitter.drawImage(img, 0, 0, canvasTwitter.width, canvasTwitter.height);

    // Draw Logo
    ctxTwitter.drawImage(imgLogo, canvasTwitter.width - (imgLogo.width + logoBuffer), logoBuffer, imgLogo.width, imgLogo.height);

    // Draw converge logo if requested
    if(convergeLogoCheck == true){
        ctxTwitter.drawImage(convergeLogo, canvasTwitter.width - (convergeLogo.width + logoBuffer), canvasTwitter.height - (convergeLogo.height + logoBuffer), convergeLogo.width, convergeLogo.height);
    }

    // canvasTwitter height - award font
    const profileImgFrameVert = canvasTwitter.height - canvasTwitter.width * .04;
    // canvasTwitter width up until the text starts
    const profileImgFrameHor = canvasTwitter.width / 3;
    // Grab Profile Image
    if(profileImg.value != '' && profilePicCheck == true){
        var reader = new FileReader();
        reader.onload = function(){
            profileImgReader = new Image;
            profileImgReader.src = reader.result;
            profileImgReader.addEventListener("load", () => {
                // Resize picture to fit canvasTwitter
                let ratio = 0;
                if(profileImgReader.width > 285 || profileImgReader.height > 325){
                    if(profileImgReader.width > profileImgReader.height){
                        var profileWidthOld = profileImgReader.width;
                        profileImgReader.width = 285;
                        profileImgReader.height = profileImgReader.height * profileImgReader.width / profileWidthOld;
                        ratio = 1;
                    }
                    else{
                        var profileHeightOld = profileImgReader.height;
                        profileImgReader.height = 325;
                        profileImgReader.width = profileImgReader.width * profileImgReader.height / profileHeightOld;
                        ratio = 0;
                    }
                }
                // Check if heigt or width of picture is larger and create circle with variable radius
                if(!profilePicShape){
                    if(ratio == 0){
                        ctxTwitter.arc(profileImgFrameHor / 2, canvasTwitter.height / 2 + ((canvasTwitter.height - profileImgFrameVert) / 2), profileImgReader.width / 2, 0, Math.PI * 2, true);
                    }
                    else{
                        ctxTwitter.arc(profileImgFrameHor / 2, canvasTwitter.height / 2 + ((canvasTwitter.height - profileImgFrameVert) / 2), profileImgReader.height / 2, 0, Math.PI * 2, true);
                    }
                    ctxTwitter.clip();
                    // Draw Image and auto-center it
                    ctxTwitter.drawImage(profileImgReader, profileImgFrameHor / 2 - profileImgReader.width / 2, canvasTwitter.height / 2 + ((canvasTwitter.height - profileImgFrameVert) / 2)  - profileImgReader.height / 2 , profileImgReader.width, profileImgReader.height);
                    // Create the border around the circle
                    ctxTwitter.strokeStyle = 'white';
                    ctxTwitter.lineWidth = 3;
                    ctxTwitter.arc(profileImgFrameHor / 2, canvasTwitter.height / 2 + ((canvasTwitter.height - profileImgFrameVert) / 2), profileImgReader.width / 2 + ctxTwitter.lineWidth, 0, Math.PI * 2, true);
                    ctxTwitter.stroke();
                }
                else{
                    ctxTwitter.drawImage(profileImgReader, profileImgFrameHor / 2 - profileImgReader.width / 2, canvasTwitter.height / 2 + ((canvasTwitter.height - profileImgFrameVert) / 2)  - profileImgReader.height / 2 , profileImgReader.width, profileImgReader.height);
                    ctxTwitter.strokeStyle = 'white';
                    ctxTwitter.lineWidth = '2';
                    ctxTwitter.strokeRect(profileImgFrameHor / 2 - profileImgReader.width / 2, canvasTwitter.height / 2 + ((canvasTwitter.height - profileImgFrameVert) / 2)  - profileImgReader.height / 2 , profileImgReader.width, profileImgReader.height);
                }
            });
        }
        // Load reader file
        reader.readAsDataURL(profileImg.files[0]);
    }
}

function insertTextTwitter(canvasTwitter, fullName, awardTitle, sideText, profilePicCheck){
    //Text style initially
    const fontSizeAward = canvasTwitter.width * .035;
    const fontSizeName = canvasTwitter.width * .04;
    const fontSizeAdd = canvasTwitter.width * .025;

    const awardSpacePic = canvasTwitter.height * .05;
    const awardSpaceNoPic = canvasTwitter.height * .15;

    ctxTwitter.fillStyle = 'white';
    ctxTwitter.textAlign = 'center';

    // Text font settings for Award
    ctxTwitter.font = fontSizeAward + 'px Open Sans, Arial';
    ctxTwitter.lineWidth = fontSizeAward / 20;
    ctxTwitter.textAlign = "start";

    // Draw Award
    // Move text if profile picture is or is not present
    ctxTwitter.textBaseline = 'top';
    if(profilePicCheck){
        ctxTwitter.fillText(awardTitle, awardSpacePic, awardSpacePic, canvasTwitter.width); 
    }else{
        ctxTwitter.fillText(awardTitle, awardSpaceNoPic, awardSpaceNoPic, canvasTwitter.width);
    }

    // Text font settings for name
    ctxTwitter.textBaseline = 'middle';
    ctxTwitter.font = fontSizeName + 'px Open Sans, Arial';
    ctxTwitter.lineWidth = fontSizeName / 20;

    // Draw Name
    // Move text if profile picture is or is not present
    if(profilePicCheck){
        ctxTwitter.fillText(fullName, canvasTwitter.width / 3, canvasTwitter.height/2.2, canvasTwitter.width);
    }else{
        ctxTwitter.fillText(fullName, canvasTwitter.width / 3.5, canvasTwitter.height/2, canvasTwitter.width);
    }

    // Text font settings for additional text
    ctxTwitter.font = fontSizeAdd + 'px Open Sans, Arial';
    ctxTwitter.lineWidth = fontSizeAdd / 20;

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
                ctxTwitter.fillText(t, canvasTwitter.width / 3, canvasTwitter.height/2.2 + i * fontSizeAdd + fontSizeName, canvasTwitter.width);
            }
            else{
                ctxTwitter.fillText(t, canvasTwitter.width / 3.5, canvasTwitter.height/2 + i * fontSizeAdd + fontSizeName, canvasTwitter.width);
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

function initTwitter () {
    // Initialize variables
    canvasTwitter = document.getElementById('banner-canvas-twitter');
    ctxTwitter = canvasTwitter.getContext('2d');
    canvasTwitter.width = canvasTwitter.height = 0;

    // Banner generation
    window.onload = function(){
        generateBannerTwitter();
    }
}

initTwitter();
