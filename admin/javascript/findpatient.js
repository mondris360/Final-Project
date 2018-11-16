$(document).ready(function() {

 
  $("#searchButton").click(function() {
    var patPhoneNo = $("#searchbox").val();
    validate(patPhoneNo); // validate data
  });
 
  function validate(patPhoneNo) {
    if (patPhoneNo === "") {
      alert("Please Enter Phone No");
      searchbox.focus();
      return false;
    }
    else {
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
    $.ajax({
      url: "http://localhost:3000/checkin",
      type: "GET",
      data: {"Patient PhoneNo":patPhoneNo},
      success: function(data) {
        if(Object.keys(data).length = 0){  // check if any match was returned
           alert("Patient Record Not Found");
           return
        }
        else { 
          $(data).each(function(index, value) {
            const dataBag = {};  // an object to accummulate all the  required values
            dataBag.patPhoneNo = value["Patient PhoneNo"];
            dataBag.healthChallenge = value["Health Challenge"];
            dataBag.patPhoneNo = value["Patient PhoneNo"];
            dataBag.date = value["Date"];
            dataBag.docPhoneNo = value["Doctor PhoneNo"];
            dataBag.status = value["Status"];
                        
            callPatientsTable(dataBag); // ajax call to Patients Table using the partial accummulated data
          });
        }
      }
    });
  }
 
  function callPatientsTable(dataBag) {  
    var patPhoneNo = dataBag.patPhoneNo; 
    $.ajax({
      url: "http://localhost:3000/patients",
      type: "GET",
      data: patPhoneNo,
      dataType: "json",
      success: function(data) {
        // iterate over the ajax response 
        $(data).each(function(index, value) {
            if (patPhoneNo == value["Phone No"]) {
            dataBag.patName =
              value["First Name"] + " " + value["Last Name"];
            
            callDoctorTable(dataBag); // 
          }
        });
      }
    });
  }
 
  function callDoctorTable(dataBag) {
    var docPhoneNo = dataBag.docPhoneNo; // grab Doctor's phone from   the object that is accumulate our values
    $.ajax({
      url: "http://localhost:3000/doctors",
      type: "GET",
      data: docPhoneNo,
      dataType: "json",
      success: function(data) {
      // iterate  the ajax response using  jquery method
        $(data).each(function(index, value) {
          if (value["Phone No"] == docPhoneNo) {
            var docName = value["First Name"] + " " + value["Last Name"];
            dataBag.docName = docName; // add Doctor's name to our databag
            appendRow(dataBag); 
          }
        });
      }
    });
  }
 
  function appendRow(dataBag) {
    //  extract the  obj properties and assign them to variables using distructing operator
    var patName = dataBag.patName;
    var patPhoneNo =  dataBag.patPhoneNo;
    var docName =  dataBag.docName;
    var date = dataBag.date;
    var healthChallenge = dataBag.healthChallenge;
    var status = dataBag.status;
  
    var $row = $(`
        <tr>
        <td>${patName}</td>
        <td>${patPhoneNo}</td>
        <td>${docName}</td>
        <td>${date}</td>
        <td>${healthChallenge}</td>
        <td>${status}</td>
                                                           
        </tr>`);
    $("table").append($row); // append our complete collected data to the table

    return
  };
})