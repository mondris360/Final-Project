$(document).ready(function(){

		$("#submit").click(function(){
			var usernameVal = $("#username").val(); 
			var docName = $("#doctorName").val();
			var healthComp = $("#complain").val();
			validate(usernameVal, docName, healthComp); // validate data
			      
		$.ajax({
			url:"http://localhost:3000/checkin",
			type:"Post",
			 data:{ 
			 	 "Username": usernameVal,
			 	 "Assigned Doctor": docName,
			 	 "Health Challenge":healthComp,
			 	 "Date":getDate()
			 	
			    },
			dataType:"json",
			success:function(data){
			    $("#output").html("Patient Checked In Successfully")
			}
		})
		

	

	  // validate users input
	function validate(usernameVal, docNameVal, healthComplainVal){
		if(usernameVal === ""){
				alert("Please Enter Username");
				username.focus();
				return false
			}
			else if(docNameVal === "Select Doctor"){
				alert("Please Select  A Doctor");
				doctorName.focus();
		     	return false
			} 
			else if(healthComplainVal === ""){
				alert("Please Enter Helth Challenge");
				complain.focus();
    			return false
			}
			else if(healthComplainVal.length < 10){
				alert("Health Challenge Decribption is too short");
				complain.focus();
				return false
			}
	
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

			
	})

	// display all checked in patients

	 function displayAllCheckIn(){

	 $.ajax({
			url:"http://localhost:3000/users?embed=checkin", // pending donot know how to do relationship btw tables
			type:"GET",
			dataType:"json",
			success:function(data){
			    $(data).each(function(index, value){
			    	var record = "<tr><td>" + (index +1) + "</td><td>" + data["First Name"] +"</td><td>" +
			    		data["Last Name"] +"</td><td>" + data["Gender"] + "</td><td>" + data["Phone No"] +
			    		"</td><td>" + data["Assigned Doctor"] + "<td/><td>" + data["Date"] + "</td>"</td> +
			    		data["Health Challenge"]
			     		$("table").append(record);

			    })
			}
        })
    }

})		

		






