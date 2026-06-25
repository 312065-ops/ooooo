const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // 替換成你的 Google 試算表 ID，例如從試算表 URL 取得 `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/...`
const SHEET_NAME = 'Countries';

function createJsonOutput(payload, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  if (action === 'read') {
    return handleRead();
  }
  if (action === 'save') {
    return handleSave(e);
  }
  return createJsonOutput({ success: false, message: 'Invalid action' });
}

function doPost(e) {
  const action = (e.parameter.action || '').toLowerCase();
  if (action === 'save') {
    return handleSave(e);
  }
  return createJsonOutput({ success: false, message: 'Invalid action' });
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

  return createJsonOutput({ success: true, items });
}

function parsePayload(e) {
  if (e.postData && e.postData.type && e.postData.type.indexOf('application/json') === 0) {
    try {
      return JSON.parse(e.postData.contents || '{}');
    } catch (error) {
      return null;
    }
  }

  return {
    country: e.parameter.country || '',
    flag: e.parameter.flag || '',
    tagline: e.parameter.tagline || '',
    culture: e.parameter.culture || '',
    taboo: e.parameter.taboo || '',
    festival: e.parameter.festival || '',
    greeting: e.parameter.greeting || ''
  };
}

function handleSave(e) {
  const payload = parsePayload(e);
  if (!payload || !payload.country) {
    return createJsonOutput({ success: false, message: 'Invalid payload or missing country' });
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

  return createJsonOutput({ success: true, message: 'Data saved' });
}
