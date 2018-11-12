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
								<td><span class="edit" value="${value.Username}">&#x270e;</span></td>
								<td><span class="delete" value="${value.Username}">&#x274c;</span></td>
							</tr>`);
					        $("table").append($row);
					        $row.find('.edit').click(function() {
					          console.log('edit clicked', value.Username);
					        })

							$row.find(".delete").click(function(){  
								var username = value.Username;
								deleteRecord(username); // delete record
							})
			
				})
			}
		}) 
	})

   function deleteRecord(username){
   			alert(username);
    		$.ajax({
			url:"http://localhost:3000/users/",
			type:"DELETE",
			data:{
				"Username": username
			     },
			dataType:"json",
			ContentType: "application/json",
			success: function(data){
				alert("Record Deleted Sucessfully")
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

	
})//

