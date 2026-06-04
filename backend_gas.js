const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Countries';

function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  if (action === 'read') {
    return handleRead();
  }
  return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

function doPost(e) {
  const action = (e.parameter.action || '').toLowerCase();
  if (action === 'save') {
    return handleSave(e);
  }
  return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

function handleRead() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const header = rows.shift();
  const items = rows.map(row => {
    const record = {};
    row.forEach((value, index) => {
      record[header[index].toString().trim().toLowerCase()] = value;
    });
    return {
      country: record.country || '',
      flag: record.flag || '',
      tagline: record.tagline || '',
      culture: record.culture || '',
      taboo: record.taboo || '',
      festival: record.festival || '',
      greeting: record.greeting || ''
    };
  });

  return ContentService.createTextOutput(JSON.stringify({ success: true, items }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

function handleSave(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Invalid JSON payload' }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(h => h.toString().trim().toLowerCase());
  const row = headers.map(header => {
    switch (header) {
      case 'country': return payload.country || '';
      case 'flag': return payload.flag || '';
      case 'tagline': return payload.tagline || '';
      case 'culture': return payload.culture || '';
      case 'taboo': return payload.taboo || '';
      case 'festival': return payload.festival || '';
      case 'greeting': return payload.greeting || '';
      default: return '';
    }
  });

  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Data saved' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}
