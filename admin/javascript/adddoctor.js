$(document).ready(function(){
  $("#add").click(function(){
    var firstName = $("#Fname").val();
    var lastName = $("#Lname").val();
    var gender = $("#sex").val();
    var phone = $("#phoneNo").val();
    var emailVal =$("#email").val();
    var usernameVal = $("#username").val();
    var passwordVal = $("#password").val();
    var confirmPassVal = $("#confirmPass").val();

    console.log(firstName);
         /* validate data */
    validate(firstName, lastName, gender, phone, emailVal, usernameVal, passwordVal, confirmPassVal);
     
    function validate(firstName, lastName, gender, phone, emailVal, usernameVal, passwordVal,confirmPassVal){
         if(firstName ===""){
           alert("Invalid First Name");
           Fname.focus();
           console.log(firstName)
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
          }    
          else{    
        
       // store the user's data to the database
        insertData(firstName, lastName, gender, phone, emailVal, usernameVal, passwordVal)
      }
    }
		//constructor for creating the  an object using the user's input
    function CreateAccObj(firstName, lastName, gender, phone, emailVal, usernameVal, passwordVal){
      this["First Name"] = firstName;
      this["Last Name"] = lastName;
      this.gender = gender;
      this["Phone No"] = phone;
      this["E-mail"] = emailVal;
      this.username = usernameVal;
      this.password = passwordVal
     }
  
  // insert the data into the doctors table and make another call to insert the login details into admin table
    function insertData(firstName, lastName, gender, phone, emailVal, usernameVal, passwordVal){
      // use the user's input to create an object
      var userDetails =  new CreateAccObj(firstName, lastName, gender, phone, emailVal,  usernameVal, passwordVal);
      $.ajax({
          url:"http://localhost:3000/doctors",
          type:"POST",
          data:userDetails,
          success: function(result){
                createAdminAccess(usernameVal, passwordVal);
              // window.location.href ="./index.html"
            }
      });
       function createAdminAccess(usernameVal, passwordVal){
              	alert("i got here")
                $.ajax({
                  url:"http://localhost:3000/admin",
                  type:"POST",
                  data:{
                      "Username":usernameVal,
                      "Password":passwordVal
                      },
                  success: function(result){
                  		alert("Account Created Successfully");
                  }
                });
        }
    }
  })
})

