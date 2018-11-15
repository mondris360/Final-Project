$(document).ready(function() {

 
  $("#searchButton").click(function() {
    var patPhoneNo = $("#searchbox").val();
    console.log(patPhoneNo);
    // validate(patPhoneNo); // validate data
  });
 
  function validate(PatPhoneNo) {
    if (patPhoneNo === "" && patPhoneNo.length >=11) {
      alert("Please Enter Phone No");
      searchbox.focus();
      return false;
    }
    else {
      // console.log(patPhoneNo)
      callCheckinTable(patPhoneNo);
    }
  }
  
 
  // get current date
  function getDate() {
    date = new Date();
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug","Sep", "Oct", "Nov", "Dec"];
    day = days[date.getDay()];
    month = months[date.getMonth()];
    year = date.getFullYear();
 
    var currentDate =date.getDay() + "[" + day + "]" + "/" + month + "/" + year;
 
    return currentDate;
  }

  function callCheckinTable(patPhoneNo){
    console.log(patPhoneNo)
    $.ajax({
      url: "http://localhost:3000/checkin",
      type: "GET",
      data: patPhoneNo,
      success: function(data) {
        if(Object.keys(data).length = 0){  // check if any match was returned
           alert("Patient Record Not Found");
           return
        }
        else { 
          $(data).each(function(index, value) {
            const data = {};  // an object to accummulate all the  required values
            data.patPhoneNo = value["Patient PhoneNo"];
            data.healthChallenge = value["Health Challenge"];
            data.patPhoneNo = value["Patient PhoneNo"];
            data.date = value["Date"];
            data.docPhoneNo = value["Doctor PhoneNo"];
            data.status = value["Status"];
            console.log(data);
            // callPatientsTable(data); // ajax call to Patients Table
          });
        }
      }
    });
  }
 
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
            checkinData.patName =
              value["First Name"] + " " + value["Last Name"];
            
            callDoctorTable(checkinData);
          }
        });
      }
    });
  }
 
  function callDoctorTable(checkinData) {
    var docPhoneNo = checkinData.docPhoneNo; // grab Doctor's phone from local storage
    $.ajax({
      url: "http://localhost:3000/doctors",
      type: "GET",
      data: docPhoneNo,
      dataType: "json",
      // contentType: "application/json"
      success: function(data) {
        // iterate over the data using jquery .each method
        $(data).each(function(index, value) {
          // use each sub object to form a complete row of table data
          // store the following values in the local storage
          if (value["Phone No"] == docPhoneNo) {
            var docName = value["First Name"] + " " + value["Last Name"];
            checkinData.docName = docName; //store patient's fullname in local storage
            appendRow(checkinData); // append data to the table
          }
        });
      }
    });
  }
 
  function appendRow(checkinData) {
    //  extract the  obj properties and assign them to variables using distructing operator
    var {
      patName,
      patPhoneNo,
      docName,
      date,
      healthChallenge,
      status
    } = checkinData;
    console.log(
      patName,
      patPhoneNo,
      docName,
      date,
      healthChallenge,
      status
    );
    var $row = $(`
        <tr>
        <td>${patName}</td>
        <td>${patPhoneNo}</td>
        <td>${docName}</td>
        <td>${date}</td>
        <td>${healthChallenge}</td>
        <td>${status}</td>
                                                           
        </tr>`);
    $("table").append($row);
 
    return
  };
})