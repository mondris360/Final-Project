$(document).ready(function() {
  loadDoctors(); // load doctors name into the  assign doctor select box
 
  $("#submit").click(function() {
    var patPhoneNo = $("#phoneNo").val();
    var docPhoneNo = $("#doctorName").val();
    var docName = $("#doctorName").val();
    var healthComp = $("#complain").val();
 
    validate(patPhoneNo, docPhoneNo, docName, healthComp); // validate data
  });
 
  function validate(patPhoneNo, docPhoneNo, docName, healthComp) {
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
          option.text = docName; // change the option text to the doctor name
          option.value = value; // change the option html value to the doctor's username
          selectBox.add(option);
        });
      }
    });
  }
 
  // display all checked in patients
 
  $("#viewCheckin").click(function() {
    $.ajax({
      url: "http://localhost:3000/checkin",
      type: "GET",
      success: function(data) {
        // iterate over the data using jquery .each method
        $(data).each(function(index, value) {
          // use each sub object to form a
          //complete row of table data // store the following values in the local storage
          const data = {};
          data.id = value.id;
          data.patPhoneNo = value["Patient PhoneNo"];
          data.healthChallenge = value["Health Challenge"];
          data.patPhoneNo = value["Patient PhoneNo"];
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
    //grab the values from local storage and assign them to variables
    var {
      id,
      patName,
      patPhoneNo,
      docName,
      date,
      healthChallenge,
      status
    } = checkinData;
    // console.log(
    //   sn,
    //   patName,
    //   patPhoneNo,
    //   docName,
    //   date,
    //   healthChallenge,
    //   status
    // );

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
              $row.find('.edit').click(function() { //function to  extract patient's phone no from selected row
              var patId  = checkinData.id;
              updateRecord(patId)
             
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
  

  //function to update patient's record
  function updateRecord(patId){
      $.ajax({
      url:`http://localhost:3000/checkin?id=${patId}`,
      type:"DELETE",
      success: function(data){
        alert("Record Deleted Successfully")
        
      }

    })
  }
  // function to display edit button  modal box
  function showModalBox(patPhoneNo, docPhoneNo, docName, healthComp){
    console.log(patPhoneNo, docPhoneNo, docName, healthComp)
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



});