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
					        console.log(value.Password)
					        $row.find('.edit').click(function() {
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
					          showModalBox(firstName,lastName,gender,phoneNo,email,lga,state,username,password,confirmPassword);
					           
					        })

							$row.find(".delete").click(function(){  
										
							deleteRecord(firstName,lastName,gender,phoneNo,email,lga,state,username); // delete record
							})
			
				})
			}
		}) 
	})

   function deleteRecord(username){
   			alert(username);
    		$.ajax({
			url:`http://localhost:3000/users?Username=${username}`,
			type:"DELETE",
			ContentType: "application/json",
			success: function(data){
				alert("Record Deleted Sucessfully")
				console.log(data)
			}

   		})
    }
   // 		$.ajax({
			// url:"http://localhost:3000/checkin",
			// type:"DELETE",
			// data:{
			// 	Username: "username",
			// }
			// dataType:"json",
			// success: function(data){
			// 	alert("Record Deleted Sucessfully")
			// });

   //      });

   
   //  }

   // display the modal box

   function showModalBox(firstName,lastName,gender,phoneNo,email,lga,state,username, password, confirmPassword){
   	console.log(firstName,lastName,gender,phoneNo,email,lga,state,username, password, confirmPassword)
   	var modalBox = document.getElementById("modalBox");
   	var table = document.getElementById("table");
   	 $("#Fname").val(firstName);
   	 $("#Lname").val(lastName);
   	 $("#sex").val(gender);
   	 $("#phoneNo").val(phoneNo);
   	 $("#email").val(email);
   	 $("#state").val(state);
   	 $("#lga").val(lga);
   	 $("#username").html(username);
   	 $("#password").val(password);
   	 $("#confirmPass").val(confirmPassword);
   	 modalBox.style.visibility = "visible"
   	 table.style.visibility = "hidden" // hide the table

   
   }




	
})//

