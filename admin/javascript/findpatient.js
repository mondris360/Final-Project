$(document).ready(function(){
	// $("#viewpatients").click(function(){

		$("#searchButton").click(function(){
			var query = $("#searchbox").val(); 
			if(query === ""){
				alert("please enter search word");
			}
			else{

			$.ajax({
			url:"http://localhost:3000/users",
			type:"Get",
			 data:{ 
			 	 "Username": query 
			 	 // "E-mail":query
			    },
			dataType:"json",
			success:function(data){
				result = Object.keys(data).length;

			    if( result <= 0){
			    	$("#output").html("No Match Found")
			    }
			    else{
				// iterate over the data using jquery .each method
					$(data).each(function(index, value){
					// use each sub object to form a complete row of table data
						var record = "<tr><td>" + value["id"]  + "</td><td>" + value["Username"] + "</td><td>" +
						value["First Name"] + "</td><td>" + value["Last Name"] + "</td><td>" + value["Gender"] +
					 	"</td><td>" +	value["Phone No"] + "</td><td>" + value["E-mail"] + "</td><td>" +
					    value["L.G.A"] + "</td><td>" + value["State"]  + "</td><tr>"
				     	$("table").append(record);
				    $("#output").html(result +" Match(s) Found")
				})
			    }
			}
		})
			
	    }


			
	})



			
	// })
})


