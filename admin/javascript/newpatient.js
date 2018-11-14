$(document).ready(function(){
  $("#submit").click(function(){
    var firstName = $("#Fname").val();
    var lastName = $("#Lname").val();
    var gender = $("#sex").val();
    var phone = $("#phoneNo").val();
    var emailVal =$("#email").val();
    var addressVal = $("#address").val();
    var stateVal = $("#state").val();
    var lgaVal = $("#lga").val();

          /* validate data */
    validate(firstName, lastName, gender, phone, emailVal, addressVal, stateVal, lgaVal);
     
    function validate(firstName, lastName, gender, phone, emailVal, addressVal, stateVal, lgaVal){
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

         if(addressVal === "" || addressVal.length < 4){
           alert("Invalid Address");
           address.focus();
           return false
         }
         if(stateVal === "Select State"){
           alert("Please Select A State");
           state.focus();
           return false
         }
         if(lgaVal === ""){
           alert("Invalid L.G.A")
           lga.focus();
           return false
          }  

          else{    
        
       // store the user's data to the database
        insertData(firstName, lastName, gender, phone, emailVal, addressVal, stateVal, lgaVal)
      }
    }
 
		//create an object with the user's input
    function CreateAccObj(firstName, lastName, gender, phone, emailVal, addressVal, stateVal, lgaVal){
      this["First Name"] = firstName;
      this["Last Name"] = lastName;
      this.Gender = gender;
      this["Phone No"] = phone;
      this["E-mail"] = emailVal;
      this.Address = addressVal;
      this.State = stateVal
      this["L.G.A"] = lgaVal
     }
  
  // insert the data into the doctors table and make another call to insert the login details into admin table
    function insertData(firstName, lastName, gender, phone, emailVal, addressVal, stateVal, lgaVal){
      // use the user's input to create an object
      var userDetails =  new CreateAccObj(firstName, lastName, gender, phone, emailVal, addressVal, stateVal, lgaVal);
      $.ajax({
          url:"http://localhost:3000/patients",
          type:"POST",
          data:userDetails,
          success: function(result){
               alert("Patient Details Has Been Added Successfully")    
            
            }
      });
      
    }
  })
})

