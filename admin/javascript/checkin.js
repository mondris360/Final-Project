$(document).ready(function() {
  loadDoctors(); // load doctors name into the  assign doctor select box
 
  $("#submit").click(function() {
    var patPhoneNo = $("#phoneNo").val();
    var docPhoneNo = $("#doctorName").val();
    var docName = $("#doctorName").val();
    var healthComp = $("#complain").val();
 
    validateChekinData(patPhoneNo, docPhoneNo, docName, healthComp); // validate data
  });
 
  function validateChekinData(patPhoneNo, docPhoneNo, docName, healthComp) {
    if (patPhoneNo === "") {
      alert("Please Enter A Valid Phone No");
      phoneNo.focus();
      return false;
    }
 
    if (docName === "Select Doctor") {
      alert("Please Select A Doctor");
      doctorName.focus();
      return false;
    }
    if (healthComp === "") {
      alert("Please Enter Helth Challenge");
      complain.focus();
      return false;
    }
    if (healthComp.length < 10) {
      alert("Health Challenge Decribption is too short");
      complain.focus();
      return false;
    } else {
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
    var checkinDetails = new CreateDataObj(patPhoneNo, docPhoneNo, healthComp);
    $.ajax({
      url: "http://localhost:3000/checkin",
      type: "POST",
      data: checkinDetails,
      dataType: "json",
      success: function(data) {
        alert("Patient Checked In Successfully");
      }
    });
  }
 
  // get current date
  function getDate() {
    date = new Date();
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    day = days[date.getDay()];
    month = months[date.getMonth()];
    year = date.getFullYear();
 
    var currentDate =
      date.getDay() + "[" + day + "]" + "/" + month + "/" + year;
 
    return currentDate;
  }
  // load doctors names from the db and insert them to the assign doctor select box
  function loadDoctors() {
    $.ajax({
      url: "http://localhost:3000/doctors",
      type: "GET",
      success: function(data) {
        $(data).each(function(index, value) {
          var selectBox = document.getElementById("doctorName");
          var option = document.createElement("option");
          var docName = value["First Name"] + " " + value["Last Name"];
          var value = value["Phone No"];
          option.text = docName; // change the option text to doctor's name
          option.value = value; // change the option html value to the doctor's username
          selectBox.add(option);
        });
      }
    });
  }
 
  // display all checked in patients
 
  $("#viewCheckin").click(function() { // ajax call to the checkin table
    $.ajax({
      url: "http://localhost:3000/checkin",
      type: "GET",
      success: function(data) {
        // iterate over the data using jquery .each method
        $(data).each(function(index, value) {
          const data = {};    // container to hold all values
          data.id = value.id;
          data.patPhoneNo = value["Patient PhoneNo"];
          data.healthChallenge = value["Health Challenge"];
          data.date = value["Date"];
          data.docPhoneNo = value["Doctor PhoneNo"];
          data.status = value["Status"];
          callPatientsTable(data); // ajax call to Patients Table
        });
      }
    });
  });
 
  function callPatientsTable(checkinData) {
    var patPhoneNo = checkinData.patPhoneNo;
    $.ajax({
      url: "http://localhost:3000/patients",
      type: "GET",
      data: patPhoneNo,
      dataType: "json",
      success: function(data) {
        // iterate over the data using jquery .each method
        $(data).each(function(index, value) {
            if (patPhoneNo == value["Phone No"]) {
              checkinData.patName = value["First Name"] + " " + value["Last Name"];
            callDoctorTable(checkinData);
          }

        });
      }
    });
  }
 
  function callDoctorTable(checkinData) {
    var docPhoneNo = checkinData.docPhoneNo; 
      
      $.ajax({
      url: `http://localhost:3000/doctors`,
      type: "GET",
      data: docPhoneNo,
      dataType: "json",
      // contentType: "application/json"
      success: function(data) {
               //loop through the  object
        $(data).each(function(index, value) {
          if (value["Phone No"] == docPhoneNo) {
            var docName = value["First Name"] + " " + value["Last Name"];
            checkinData.docName = docName; //add doctor's name to the obj container

             appendRow(checkinData); // append data to the table
          }
        });
      }
    });

  }
 
  function appendRow(checkinData) {
    var {
      id,
      patName,
      patPhoneNo,
      docName,
      date,
      healthChallenge,
      status
    } = checkinData;

    var $row = $(`
        <tr>
        <td>${id}</td>
        <td>${patName}</td>
        <td>${patPhoneNo}</td>
        <td>${docName}</td>
        <td>${date}</td>
        <td>${healthChallenge}</td>
        <td>${status}</td>
        <td><span class="edit" value="${checkinData.id}">&#x270e;</span></td>
        <td><span class="delete" value="${checkinData.id}">&#x274c;</span></td>                               
        </tr>`);

     $("table").append($row);
              $row.find('.edit').click(function() { 
              var id  = checkinData.id
              var patFullName = checkinData.patName;
              var patFirstName = patFullName.split(" ")[1]
              var patLastName = patFullName.split(" ")[0];
              var docFullName = checkinData.docName;
              var docFirstName = docFullName.split(" ")[1]
              var docLastName = docFullName.split(" ")[0];
              var patPhoneNo = checkinData.patPhoneNo;
              var patDate = checkinData.date;
              var patHealthChallenge = checkinData.healthChallenge;
              var patStatus = checkinData.status;
              var docPhoneNo = checkinData.docPhoneNo;
             
              showModalBox(id, patFullName, patFirstName, patLastName, docFullName, docFirstName, docLastName,docPhoneNo, patPhoneNo,
              patHealthChallenge, patStatus, patDate) 
             
              })
              
              $row.find('.delete').click(function() { //function to  extract patient's phone no from selected row
              var patId  = checkinData.id;
               deleteRecord(patId);
              })
    return;
  }

  // function to delete patient's record
  function deleteRecord(patId){
      $.ajax({
      url:`http://localhost:3000/checkin/${patId}`,
      type:"DELETE",
      ContentType: "application/json",
      success: function(data){
        alert("Record Deleted Sucessfully")
        console.log(phoneNo)
        // refresh the page
        // window.location.href= "./viewpatients.html"
      }

      })
    }
        

   // function to display edit button  modal box
  function showModalBox(id, patFullName, patFirstName, patLastName, docFullName, docFirstName, docLastName,docPhoneNo, patPhoneNo,
              patHealthChallenge, patStatus, patDate){
      // loadDoctors() // load doctors name from db
     var modalBox = document.getElementById("modalBox");
     var table = document.getElementById("table");
     $("#patid").val(id);
     $("#patFirstName").val(patFirstName);
     $("#patLastName").val(patLastName);
     $("#patPhoneNo").val(patPhoneNo);
     $("#docName").val(docFullName);
     $("#heathChal").val(patHealthChallenge);
     $("#date").val(patDate);
     $("#Status").val(patStatus);
     var docNameSelectBox = document.getElementById("docName"); //add the doctor's name to the selected menu
     var option = document.createElement("option");
     option.text = docFullName;
     option.value = docPhoneNo;
     docNameSelectBox.add(option);
     var statusSelectBox = document.getElementById("status"); //add the doctor's name to select option
     var option = document.createElement("option");
     option.text = patStatus;
     option.value = patStatus;
     statusSelectBox.add(option);

     $("#update").click(function() {
        validate();
      });
  }

 function validate(){ // extract data from the modal box and validate them
  var userId = $("#patid").val();
  var patientFName = $("#patFirstName").val();
  var patientLName = $("#patLastName").val();
  var patientPhoneNo = $("#patPhoneNo").val();
  var doctorPhoneNo = $("#docName").val();  
  var patHealthCha = $("#heathChal").val();
  var checkinDate = $("#date").val();
  var checkinStatus = $("#status").val();
  

  if(patientFName === ""){
    alert("Invalid Name")
    patFirstName.focus();
    return false
  }

  if(patientLName === ""){
    alert("Invalid Name")
    patLastName.focus();
    return false
  }

  if(patientPhoneNo.length < 11){
    alert("Invalid Phone No")
    patPhoneNo.focus();
    return false
  }

  if(patHealthCha === ""){
    alert("Please Enter Health Challenge")
    heathChal.focus();
    return false;
  };

  if(patHealthCha.length < 11){
    alert("Your health challenge description is too short")
    date.focus();
    return false;
  };

  if(checkinStatus === "Status"){
    alert("Please Select Checking Status")
    Status.focus();
    return false
  };
  updateRecord(userId, patientFName, patientLName, patientPhoneNo, doctorPhoneNo, patHealthCha, checkinDate,checkinStatus);
};


  function updateRecord(userId, patientFName, patientLName, patientPhoneNo, doctorPhoneNo, patHealthCha, checkinDate,checkinStatus){
      // $.ajax({   
      //   url: `http://localhost:3000/checkin/${userId}`, // update checkin Table
      //   type: "PUT",
      //   dataType: "json",
      //   data: {
      //     "Patient PhoneNo": patientPhoneNo,
      //     "Doctor PhoneNo":doctorPhoneNo,
      //     "Health Challenge": patHealthCha,
      //     "Date": checkinDate,
      //     "Status": checkinStatus,
      //   },
      //   success: function(data) {
      //     alert("Record Updated Successfully");
  
      //     }
      // });
      $.ajax({   
        url: `http://localhost:3000/patients/`, // call to patient table to get the correct user's id
        type: "GET",
        dataType: "json",
        data: {
          "Phone No": patientPhoneNo,
          // "Doctor PhoneNo":doctorPhoneNo,
          // "Health Challenge": patHealthCha,
          // "Date": checkinDate,
          // "Status": checkinStatus,
        },
        success: function(data) {
          var patDetails = data[0];
          var patIdInPtable = patDetails.id;  
          }
      });
  }

});