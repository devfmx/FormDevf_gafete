// Do change it your email address.
var emailTo= "iancarloz27g@gmail.com"

function doPost(e) {

  try {
    var data = e.parameter.fileContent;
    var filename = e.parameter.filename;
    var email = e.parameter.email;
    var name = e.parameter.name;
    var result=uploadFileToGoogleDrive(data,filename,name,email,e);
    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(result) }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

// new property service GLOBAL
var SCRIPT_PROP = PropertiesService.getScriptProperties();
// see: https://developers.google.com/apps-script/reference/properties/

/**
 * select the sheet
 */
function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}

/**
 * record_data inserts the data received from the html form submission
 * e is the data received from the POST
 */

function record_data(e,fileUrl) {
  try {
    var doc     = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet   = doc.getSheetByName('responses'); // select the responses sheet

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1; // get next row
    var row     = [ new Date() ]; // first element in the row should always be a timestamp
    // loop through the header columns
    for (var i = 1; i < headers.length; i++) { // start at 1 to avoid Timestamp column

      if(headers[i].length > 0 && headers[i] == "photo") {
        row.push(fileUrl); // add data to row
      }
      else if(headers[i].length > 0) {
        row.push(e.parameter[headers[i]]); // add data to row
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  }
  catch(error) {
    Logger.log(e);
  }
  finally {
    return;
  }

}

function uploadFileToGoogleDrive(data, file, name, email,e) {
  try {
    var dropbox = "Fotos";
    var folder, folders = DriveApp.getFoldersByName(dropbox);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }

    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, file);
        var file = folder.createFolder([name, email].join("-")).createFile(blob);

        var fileUrl=file.getUrl();

		//Generating Email Body
		var html =
    '<body>' +
      '<h2> Form Gafetes </h2>' +
        '<p>Name : '+e.parameters.name+'</p>' +
        '<p>Last Name : '+e.parameters.last_name+'</p>' +
        '<p>Email : '+e.parameters.email+'</p>' +
        '<p>Marca : '+e.parameters.marca+'</p>' +
        '<p>Serie : '+e.parameters.serie+'</p>' +
        '<p>File Name  : '+e.parameters.filename+'</p>' +
        '<p><a href='+file.getUrl()+'>Photo Link</a></p><br />' +
    '</body>';

    record_data(e,fileUrl);

    MailApp.sendEmail(emailTo, "New Job Application Recieved","New Job Application Request Recieved",{htmlBody:html});
        return file.getUrl();
  } catch (f) {
    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"file upload failed",
                            "data": JSON.stringify(f) }))
          .setMimeType(ContentService.MimeType.JSON);
  }
}
