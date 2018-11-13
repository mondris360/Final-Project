$(document).ready(function(){ 
	var edit = "edit";
	var del = "delete";
	$("#viewpatients").click(function(){ 
		$.ajax({					
			url:"http://localhost:3000/users",
			type:"Get",
			dataType:"json",
			// contentType: "application/json"
			success:function(data){   
				// iterate over the data using jquery .each method
				$(data).each(function(index, value){ 
					// use each sub object to form a complete row of table data
					var $row = $(`
							<tr>
								<td>${value.id}</td>
								<td>${value.Username}</td>
								<td>${value['First Name']}</td>
								<td>${value['Last Name']}</td>
								<td>${value.Gender}</td>
								<td>${value['Phone No']}</td>
								<td>${value['E-mail']}</td>
								<td>${value['L.G.A']}</td>
							 	<td>${value.State}</td>
							 	 ${value.Password}
							 	 ${value.ConfirmPass}
								<td><span class="edit" value="${value.Username}">&#x270e;</span></td>
								<td><span class="delete" value="${value.Username}">&#x274c;</span></td>
							</tr>`);


					        $("table").append($row);
					            $row.find('.edit').click(function() {
					            var id  = value.id
					        	var firstName = value['First Name'];
								var lastName = value['Last Name'];
								var gender = value.Gender;
								var phoneNo = value["Phone No"];
								var email = value['E-mail'];
								var state = value.State;
								var lga = value['L.G.A'];
								var username = value.Username;
								var password = value.Password;
								var confirmPassword =  value.ConfirmPass;
									// display modal box
					          showModalBox(id, firstName,lastName,gender,phoneNo,email,lga,state,username,password,confirmPassword);
					           
					        })

							$row.find(".delete").click(function(){  
						    var id = value.id;
						    console.log(id);
							deleteRecord(id); // delete record
							})

							
			
				})
			}
		}) 
	})

   function deleteRecord(id){
   			$.ajax({
			url:`http://localhost:3000/users/${id}`,
			type:"DELETE",
			ContentType: "application/json",
			success: function(data){
				alert("Record Deleted Sucessfully")
				console.log(data)
				// refresh the page
				window.location.href= "./viewpatients.html"
			}

   		})
    }
  
   // display the modal box

   function showModalBox(id, firstName,lastName,gender,phoneNo,email,lga,state,username, password, confirmPassword){
    console.log(firstName,lastName,gender,phoneNo,email,lga,state,username, password, confirmPassword)
    console.log("username:",username);
    var modalBox = document.getElementById("modalBox");
   	var table = document.getElementById("table");
   	 $("#FnameVal").val(firstName);
   	 $("#FnameVal").val(firstName);
   	 $("#LnameVal").val(lastName);
   	 $("#sexVal").val(gender);
   	 $("#phoneNoVal").val(phoneNo);
   	 $("#emailVal").val(email);
   	 $("#stateVal").val(state);
   	 $("#lgaVal").val(lga);
   	 $("#usernameVal").html(username);
   	 $("#passwordVal").val(password);
   	 $("#confirmPassVal").val(confirmPassword);
   	 modalBox.style.visibility = "visible"
   	 table.style.visibility = "hidden" // hide the table
   	 
   	 $("#update").click(function(){
		validate(id,firstName, lastName, gender, phoneNo, email, state, lga, username, password,confirmPassword);
		
		})
   
   }
// validate the data
function validate(id){
	//grab values from the update form i.e incase there are some changes
	 var firstName = $("#FnameVal").val();
	 var lastName = $("#LnameVal").val();
	 var gender = $("#sexVal").val();
	 var phoneNo = $("#phoneNoVal").val();
	 var email = $("#emailVal").val(); 
	 var state = $("#stateVal").val();
	 var lga =  $("#lgaVal").val();
	 var username = $("#usernameVal").html();
	 var password = $("#passwordVal").val();
	 var confirmPassword = $("#confirmPassVal").val();
	console.log("hello", firstName,lastName, gender, phoneNo, email, state, lga, username,password, confirmPassword );
  if(firstName ===""){
       alert("Invalid First Name");
       FnameVal.focus();
       return false
     }
     if(lastName ===""){
       alert("Invalid  Last Name");
       LnameVal.focus();
       return false
     }

     if(gender === ""){
       alert("Invalid Gender");
       sexVal.focus();
       return false
     }
     if(phoneNo === "" || phoneNo.length <11){
       alert("Invalid Phone No");
       phoneNoVal.focus();
       return false
     }
     if(email === ""){
       alert("Invalid Email");
       emailVal.focus();
       return false
     }

     if(state === "Select State"){
       alert("Invalid State");
       stateVal.focus();
       return false
     }
     if(lga === ""){
       alert("Invalid L.G.A")
       lgaVal.focus();
       return false
     }
     if(password == "" || password < 5){
       alert("Invalid Password");
       passwordVal.focus();
       return false
     }
     if(confirmPassword != password){
       alert("Confirm Pass must Match Password")
       confirmPassVal.focus();
       return false
    }
    insertData(id, firstName, lastName, gender, phoneNo, email, state, lga, username, password,confirmPassword)
    //insert the data to the database
    
}   


  // insert the data into Json server
    function insertData(id,firstName, lastName, gender, phoneNo, email, state, lga, username, password,confirmPassword){
    	console.log("i am here", username)
       $.ajax({
            url:`http://localhost:3000/users/${id}`,
            type:"PUT",
            data:{
              "First Name" : firstName,
              "Last Name" : lastName,
              "Gender" : gender,
              "Phone No" : phoneNo,
              "E-mail" : email,
              "State" : state,
              "L.G.A" : lga,
              "Username":username,
              "Password" : password,
              },
            success: function(result){
              alert("Record Updated Sucessfully");
            }
        });

  }


	
})//

