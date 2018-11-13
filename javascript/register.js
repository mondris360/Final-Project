$(document).ready(function(){
  $("#submit").click(function(){
    var firstName = $("#Fname").val();
    var lastName = $("#Lname").val();
    var gender = $("#sex").val();
    var phone = $("#phoneNo").val();
    var emailVal =$("#email").val();
    var stateVal = $("#state").val();
    var lgaVal =$("#lga").val();
    var usernameVal = $("#username").val();
    var passwordVal = $("#password").val();
    var confirmPassVal = $("#confirmPass").val();
         /* validate data */
    validate(firstName, lastName, gender, phone, emailVal, stateVal, lgaVal, usernameVal, passwordVal, confirmPassVal);
    // save the data to the database
    insertData(firstName, lastName, gender, phone, emailVal, stateVal, lgaVal, usernameVal, passwordVal);

function validate(firstName, lastName, gender, phone, emailVal, stateVal, lgaVal, usernameVal, passwordVal,confirmPassVal){
  if(firstName ===""){
       alert("Invalid First Name");
       Fname.focus();
       return false
     }
     if(lastName ===""){
       alert("Invalid  Last Name");
       Lname.focus();
       return false
     }

     if(gender === ""){
       alert("Invalid Gender");
       sex.focus();
       return false
     }
     if(phone === "" || phone.length <11){
       alert("Invalid Phone No");
       phoneNo.focus();
       return false
     }
     if(emailVal === ""){
       alert("Invalid Email");
       email.focus();
       return false
     }

     if(stateVal === "Select State"){
       alert("Invalid State");
       state.focus();
       return false
     }
     if(lgaVal === ""){
       alert("Invalid L.G.A")
       lga.focus();
       return false
     }
     if(usernameVal === "" || username.length < 4){
       alert("invalid Username");
       username.focus();
       return false
     }
     if(passwordVal == "" || passwordVal < 5){
       alert("Invalid Password");
       password.focus();
       return false
     }
     if(confirmPassVal != passwordVal){
       alert("Confirm Pass must Match Password")
       confirmPass.focus();
       return false
}    }


  // insert the data into Json server
    function insertData(firstName, lastName, gender, phone, emailVal, stateVal, lgaVal, usernameVal, passwordVal){
       $.ajax({
            url:" http://localhost:3000/users",
            type:"POST",
            data:{
              "First Name" : firstName,
              "Last Name" : lastName,
              "Gender" : gender,
              "Phone No" : phone,
              "E-mail" : emailVal,
              "State" : stateVal,
              "L.G.A" : lgaVal,
              "Username" : usernameVal,
              "Password" : passwordVal,
              "ConfirmPass" : confirmPassVal
              },
            success: function(result){
              console.log(result)
            }
        });

  }
    })
})

