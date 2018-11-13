$(document).ready(function(){
		$("#submit").click(function(){
			var usernameVal = $("#username").val(); 
			var firstName = $("#Fname").val();
    		var lastName = $("#Lname").val();
    		var phoneNoVal = $("#phoneNo").val();
    		var docName = $("#doctorName").val();
			var healthComp = $("#complain").val();

			validate(usernameVal, firstName, lastName, phoneNoVal,docName, healthComp); // validate data
			
	})

	function validate(usernameVal, firstName, lastName, phoneNoVal,docName, healthComp){
			if(usernameVal === ""){
				alert("Please Enter Username");
				username.focus();
				return false
			}

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
	     	if(phoneNoVal === "" || phoneNoVal.length <11){
	       		alert("Invalid Phone No");
	       		phoneNo.focus();
	       		return false
	       	}
			if(docName === "Select Doctor"){
				alert("Please Select  A Doctor");
				doctorName.focus();
			    return false
			} 
			if(healthComp === ""){
				alert("Please Enter Helth Challenge");
				complain.focus();
	    		return false
			}
			if(healthComp.length < 10){
				alert("Health Challenge Decribption is too short");
				complain.focus();
				return false
		    }
		    else{
		    	storeData(usernameVal, firstName, lastName, phoneNoVal,docName, healthComp);
		    }

	
    }

	//Save data to DB

	function storeData(usernameVal, firstName, lastName, phoneNoVal,docName, healthComp){
		$.ajax({
			url:"http://localhost:3000/checkin",
			type:"Post",
			 data:{ 
			 	 "Username": usernameVal,
			 	 "First Name": firstName,
			 	 "Last Name": lastName,
			 	 "Phone No": phoneNoVal,
			 	 "Assigned Doctor": docName,
			 	 "Health Challenge":healthComp,
			 	 "Date":getDate()	
			    },
			dataType:"json",
			success:function(data){
			    $("#output").html("Patient Checked In Successfully")
			}
		})
	}

	   // get current date
    function getDate(){
    	date = new Date();
    	days= ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    	months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    	day = days[date.getDay()];
    	month = months[date.getMonth()];
    	year = date.getFullYear();

    	var currentDate = date.getDay() + "[" + day + "]" + "/" + month + "/" + year;

   	return currentDate

    }



	// display all checked in patients

	$("#viewCheckin").click(function(){ 
		$.ajax({					
			url:"http://localhost:3000/checkin",
			type:"Get",
			dataType:"json",
			// contentType: "application/json"
			success:function(data){ 
					console.log(data);  
				// iterate over the data using jquery .each method
				$(data).each(function(index, value){ 
					// use each sub object to form a complete row of table data
					var $row = $(`
							<tr>
								<td>${value.id}</td>
								<td>${value['First Name']}</td>
								<td>${value['Last Name']}</td>
								<td>${value['Phone No']}</td>
								<td>${value['Assigned Doctor']}</td>
								<td>${value.Date}</td>
								<td>${value['Health Challenge']}</td>
							 	
							</tr>`);
					$("table").append($row);
					console.log($row)
				});	            
		    }

	    })
    })	


})		

		






