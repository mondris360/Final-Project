$(document).ready(function(){
		loadDoctors() // load doctors name into the  assign doctor select box

		$("#submit").click(function(){
			var patPhoneNo = $("#phoneNo").val();
			var docPhoneNo = $("#doctorName").val();
			var docName = $("#doctorName").val();
			var healthComp = $("#complain").val();
			
			


		validate(patPhoneNo, docPhoneNo, docName, healthComp); // validate data
			
	})

	function validate(patPhoneNo, docPhoneNo, docName, healthComp){
			if(patPhoneNo === ""){
				alert("Please Enter A Valid Phone No");
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
		    	storeData(patPhoneNo, docPhoneNo, docName, healthComp); // save the data to the database
		    }
	 }
function CreateDataObj(patPhoneNo, docPhoneNo, healthComp){
      this["Patient PhoneNo"] = patPhoneNo;
      this["Doctor PhoneNo"] = docPhoneNo;
      this["Health Challenge"] = healthComp;
      this["Date"] = getDate();
      this["Status"] = "Waiting";
     }
	//Save data to DB

	function storeData(patPhoneNo, docPhoneNo, docName, healthComp){
		var checkinDetails =  new CreateDataObj(patPhoneNo, docPhoneNo, healthComp);
		$.ajax({
			url:"http://localhost:3000/checkin",
			type:"POST",
			 data: checkinDetails,
			dataType:"json",
			success:function(data){
			    alert("Patient Checked In Successfully")
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
    // load doctors names from the db and insert them to the assign doctor select box
    function loadDoctors(){
    	$.ajax({
			url:"http://localhost:3000/doctors",
			type:"GET",
			success:function(data){
				$(data).each(function(index, value){
				var selectBox = document.getElementById("doctorName");
				var option = document.createElement("option");
			 	var  docName = value["First Name"] + " " + value["Last Name"];
			 	var value = value["Phone No"];  
			 	option.text = docName; // change the option text to the doctor name
			 	option.value = value; // change the option html value to the doctor's username
			 	selectBox.add(option)
			 	})
			}
		})
  
    }



	// display all checked in patients

	$("#viewCheckin").click(function(){  
	$.ajax({
	url:"http://localhost:3000/checkin",
	type:"GET",
	success:function(data){
	// iterate over the data using jquery .each method
	$(data).each(function(index, value){  // use each sub object to form a
	//complete row of table data // store the following values in the local storage

		localStorage.setItem("sn", index);
		localStorage.setItem("Patient PhoneNo",value["Patient PhoneNo"]);
		localStorage.setItem("Doctor PhoneNo",value["Doctor PhoneNo"]);
		localStorage.setItem("Health Challenge",value["Health Challenge"]);
		localStorage.setItem("Date",value["Date"]);
		localStorage.setItem("Status",value["Status"]);
		callPatientsTable(index); // ajax call to Patients Table

				})
			}
		})
	})


	function callPatientsTable(index){
		var patPhoneNo = localStorage.getItem("Patient PhoneNo") // grab patient phone from local storage
		$.ajax({					
			url:"http://localhost:3000/patients",
			type:"GET",
			data: patPhoneNo,
			dataType:"json",
				// contentType: "application/json"
			success:function(data){ 
			// iterate over the data using jquery .each method
					var result = data[index]
					console.log(result)
					// use each sub object to form a complete row of table data
							// store the following values in the local storage
					if(Object.keys(result).length != 0){
						if(patPhoneNo == result["Phone No"]){
							var patientName = result["First Name"] + " " +  result["Last Name"];
							localStorage.setItem("Patient Name", patientName) //store patient's fullname in local storage
						callDoctorTable(index);
							
					}
					

				}
			}

		})
	}


	function callDoctorTable(index){
		var docPhoneNo = localStorage.getItem("Doctor PhoneNo") // grab Doctor's phone from local storage
		$.ajax({					
		url:"http://localhost:3000/doctors",
		type:"GET",
		data: docPhoneNo,
		dataType:"json",
				// contentType: "application/json"
		success:function(data){ 
			    console.log(docPhoneNo)
				var result = (data[index])
				// console.log(result)
				// iterate over the data using jquery .each method
			// $(data).each(function(index, value){ 
						// use each sub object to form a complete row of table data
							// store the following values in the local storage
				  console.log(result)
		    if(Object.keys(result).length != 0){
				if(docPhoneNo == result["Phone No"]){
					var docName = result["First Name"] + " " +  result["Last Name"];
					localStorage.setItem("Doctor Name", docName); //store patient's fullname in local storage

					appendRow();
				}
			}
			  	// appendRow(); // append data to the table
						
				// });
			 }

		});


	};
						


	function appendRow(){
					//grab the values from local storage and assign them to variables
		var  sn = localStorage.getItem("sn");
		var  patName = localStorage.getItem("Patient Name");
		var  patPhoneNo = localStorage.getItem("Patient PhoneNo");
		var  docName = localStorage.getItem("Doctor Name");
		var  date = localStorage.getItem("Date");
		var	 healthChallenge = localStorage.getItem("Health Challenge");
		var  status = localStorage.getItem("Status");
		console.log(sn, patName, patPhoneNo, docName, date, healthChallenge, status)
		var $row = $(`
		<tr>
		<td>${sn}</td>
		<td>${patName}</td>
		<td>${patPhoneNo}</td>
		<td>${docName}</td>
		<td>${date}</td>
		<td>${healthChallenge}</td>
		<td>${status}</td>
														 	
		</tr>`);
		$("table").append($row);

				
		localStorage.clear(); // empty local storage for  more space to the next loop
	 	return				
				           
	}

   
})		