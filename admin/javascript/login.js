$(document).ready(function(){
	$("#login").click(function(){
		var usernameVal = $("#username").val();
		var passwordVal = $("#password").val();
		

		validate(usernameVal, passwordVal) //validate data



    // function to validate user's input
	function validate(usernameVal, passwordVal){

	   if(usernameVal ===""){
       alert("Please Enter Username");
       username.focus();
       return false
      }
     if(passwordVal ===""){
       alert("Please Enter Password");
       password.focus();
       return false
     }

     verifyDetails(usernameVal, passwordVal) 

    }


	// store the data
	function verifyDetails(usernameVal, passwordVal){
		console.log(usernameVal, passwordVal)
		    $.ajax({
            url:`http://localhost:3000/admin?username=`,
            type:"GET",
            data:{
              "Username" : usernameVal,
              "Password" : passwordVal,
              },
            success: function(response){
            	console.log(response);
              result = Object.keys(response).length
              if( result <= 0){  //  if no match found
              	alert("Invalid Login");
              }

               else{

              	window.location.href ="./dashboard.html"; // redirect page
              }
            }
        });

       }

	})
})
console.log("I am working")