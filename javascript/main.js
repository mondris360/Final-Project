<!DOCTYPE html>
<html>
    <head>
        <title>Jquery in Decagon</title>
        <link href ="main.css" rel ="stylesheet" type ="text/css">
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"
			  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
			  crossorigin="anonymous"></script>
        <script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></script>
        <script src = "./jquery.js"></script>

    </head>
    <body>
          <div class ="Add student">
          <p> Add student Record To Database</p>
          <form>
              <strong>Student Name:</strong><input id ="name" type ="text" name ="studentName"></input><br>
              <strong>Student Class</strong><select id="class">
                  <option>Select Class</option>
                  <option value ="HND1">HND 1</option>
                  <option value = "HND2">HND 2</option>
                  <option value ="ND1">ND 1</option>
                  <option value = "ND2">ND 2</option>
              </select> <br>
              <strong>Student PhoneNo:</strong><input id ="phoneNo" type ="text" name ="studentPhoneNo"></input><br>
              <input  id ="submit"  type ="submit">
          </form>
          <div>
            <textarea id= "database" value="">

            </textarea>
          </div>
          </div>

    </body>

</html>
