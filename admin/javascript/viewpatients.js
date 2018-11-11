$(document).ready(function(){
	var edit = "edit";
	var del = "delete";
	$("#viewpatients").click(function(){
			$.ajax({
			url:"http://localhost:3000/users",
			type:"Get",
			dataType:"json",
			success:function(data){
				// iterate over the data using jquery .each method
				$(data).each(function(index, value){
					// use each sub object to form a complete row of table data
					var username = value["Username"];
					var record = "<tr><td>" + value["id"]  + "</td><td>" + value["Username"] + "</td><td>" +
					value["First Name"] + "</td><td>" + value["Last Name"] + "</td><td>" + value["Gender"] +
					 "</td><td>" +	value["Phone No"] + "</td><td>" + value["E-mail"] + "</td><td>" +
					    value["L.G.A"] + "</td><td>" + value["State"]  + "</td><td>" + `<span class="${edit}"  value="${username}">&#x270e;</span>` +
					    "</td><td>" + `<span class="${del}" value="${username}">&#x274C;</span>` + "</td><tr>"
				     $("table").append(record)
					})
					$(".edit").click(function(){
					var username = $("this").attr("value");
					
					$(".delete").click(function(){
						deleteRecord(username); // delete record
					})
				})

			}
		})
	})

   function deleteRecord(username){
   		    $.ajax({
			url:"http://localhost:3000/users",
			type:"DELETE",
			data:{
				Username: "username",
			}
			dataType:"json",
			success: function(data){
				// alert("Record Deleted Sucessfully")
			}

   		})

   		 $.ajax({
			url:"http://localhost:3000/checkin",
			type:"DELETE",
			data:{
				Username: "username",
			}
			dataType:"json",
			success: function(data){
				alert("Record Deleted Sucessfully")
			}

        })

   
    }

	
})

