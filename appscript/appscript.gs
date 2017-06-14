// Do change it your email address.
var emailTo= "" // Optional if you want to recive notifications when form is submited by anyone

function doPost(e) {

  try {
    var data = e.parameter.fileContent;
    var filename = e.parameter.filename;
    var email = e.parameter.email;
    var name = e.parameter.name;
    var result=uploadFileToGoogleDrive(data,filename,name,email,e);
    var t = HtmlService.createTemplateFromFile('success');
    // Link and URL parameters generated using "Get Prefilled Link" option in the Google form.
    t.formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSer00gd4UP8Q4RfSYNqp-ObZ2Ob-AgE-xpNZ-8HCbcePW_k_A/viewform?usp=pp_url"
    t.formUrl += "&entry.428433454=" + encodeURIComponent(e.parameter.name);
    t.formUrl += "&entry.43426329=" + encodeURIComponent(e.parameter.last_name);
    t.formUrl += "&entry.1302531912=" + encodeURIComponent(e.parameter.email);
    return t.evaluate();

  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * record_data inserts the data received from the html form submission
 * e is the data received from the POST
 */

function record_data(e,fileUrl) {
  try {
    var doc     = SpreadsheetApp.getActiveSpreadsheet();
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
    var dropbox = "Fotos B15";
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

        // URL to read the image directly given the file's ID
        // from https://stackoverflow.com/questions/10311092/displaying-files-e-g-images-stored-in-google-drive-on-a-website
        var fileUrl = "https://drive.google.com/uc?export=view&id=" + file.getId();

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

    MailApp.sendEmail(emailTo, "Nuevo registro de alumno - Batch 15","Nuevo registro de alumno - Batch 15 Request Recieved",{htmlBody:html});
        return file.getUrl();
  } catch (f) {
    return ContentService    // return json success results
          .createTextOutput(
            JSON.stringify({"result":"file upload failed",
                            "data": JSON.stringify(f) }))
          .setMimeType(ContentService.MimeType.JSON);
  }
}
