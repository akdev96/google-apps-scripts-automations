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
   var message = "Dear Applicant, \nThank you for registering to the  \“Young Technopreneur 2021\” video competition. \nYour registration number  = " + row[1] + ",\n\nTo submit your video and for  more details please visit  https://sltc.ac.lk/young-technopreneur-2021. \n\nTerms and Conditions - Young Technopreneur 2021” video competition \n\nThis competition is open only for current A/L Technology stream students or the students who have done their A/L s in 2018/ 2019/ 2020 under Technology stream. \nCan submit only one video per registered participant. \nParticipants should register on or before the deadline for the registrations. \nVideo submission closes on 7th  February. Submissions received after this time will not be considered. \nThe video should be a maximum of 10 minutes long. (Maximum file size 350MB) \nVideos should either be in English or Sinhala. \nAll entries should begin with a 3-second full-screen “title screen” that includes the following information: \n\tProducer’s name \n\tProducer’s registration number (This will be given  to the participants after registration) \n\tSchool name and address \n\tTitle of video \n\nThere is no entry fee. \nThe judge's decision is final and no correspondence will be entered into."; // Assemble the body text


   var subject = "Video Submission ID - SLTC Young Technopreneur 2021";
   var emailSent = row[13];  // email status column
   if (emailSent !== EMAIL_SENT) { // Prevents sending duplicates
    MailApp.sendEmail(emailAddress, subject, message);  //sending email
    sheet.getRange(2,14, numRows).setValue(EMAIL_SENT); //
    // Make sure the cell is updated right away in case the script is interrupted
    SpreadsheetApp.flush();
   }
   else{
     sheet.getRange(2,14, numRows).setValue(NOT_SENT);
   }
  }
}
