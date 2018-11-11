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

     fetchData(usernameVal, passwordVal) 

	}


	// store the data
	function fetchData(usernameVal, passwordVal){
       $.ajax({
            url:"http://localhost:3000/users",
            type:"GET",
            data:{
              "Username" : usernameVal,
              "Password" : passwordVal,
              },
            success: function(response){
            	result = Object.keys(response).length
              if( result <= 0){  //  if no match found
              	console.log("Invalid Login");
              }
              else{
              	window.location.href ="../welcomeuser.html"; // redirect page
              }
            }
        });

       }

	})
})
console.log("I am working")