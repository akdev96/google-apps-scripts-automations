// UID Creation : =ARRAYFORMULA("YTPV21-"&text(ROW(B$2:INDEX(C2:C,COUNTA(C2:C)-1)),"000"))
// Auto Increment No : =ARRAYFORMULA((ROW(A$2:INDEX(C2:C,COUNTA(C2:C)-1))))  
// where time stamp is C


function sendMails() {

  var EMAIL_SENT = 'EMAIL_SENT'; //notification status
  var NOT_SENT = 'NOT_SENT';  // notification status
  var sheet = SpreadsheetApp.getActiveSheet();  // getting active spread sheet
  var startRow = 2; // Start at second row because the first row contains the data labels
  var numRows = sheet.getRange(2,16).getValue(); // max value of count (number of submissions) takes the max(column_values) to get the number of rows where colum is auto incremented 


  // Fetch the range of cells A2:XX
  var dataRange = sheet.getRange(startRow, 1, numRows, 9)
  
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (i in data) {
   var row = data[i];
   var emailAddress = row[8];  // email address column
   var message = "Dear Applicant, Message. Your ID is = " + row[1] + "Thanks"; // Assemble the body text


   var subject = "Email Subject";
   var emailSent = row[14];  // email status column
   if (emailSent !== EMAIL_SENT) { // Prevents sending duplicates
    MailApp.sendEmail(emailAddress, subject, message);  //sending email
    sheet.getRange(2,14, numRows).setValue(EMAIL_SENT); //
    SpreadsheetApp.flush();  // Make sure the cell is updated right away in case the script is interrupted
   }
   else{
     sheet.getRange(2,14, numRows).setValue(NOT_SENT);  // set value in case mail is not sent
   }
  }
}
