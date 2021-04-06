var form = document.querySelector('#generate');
var covergelogo = document.getElementById('convergelogo').checked

//Display the "choose file" for the profile picture checked
function profilepicfunction() {
var checkprofilepic = document.getElementById('profilepic')
var addprofileinput = document.getElementById('profilepicinput')

    if (checkprofilepic.checked == true){
        addprofileinput.style.display="block";
    }else{
        addprofileinput.style.display= "none";
    }
}

//Evenlistner to not have the browser do the validation
form.addEventListener('submit', function (event) {
    if (form.checkValidity() == false) {
        // No request can be sent
        event.preventDefault();
        // When you are not sending the datawith an ajax request
        event.stopPropagation();
    }
    form.classList.add('was-validated')
})