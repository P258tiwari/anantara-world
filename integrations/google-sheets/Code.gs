// Deploy as a web app: Execute as Me; Who has access: Anyone.
// Requests still require the private shared secret. Never publish the secret.
const LEAD_TABS = { enquiry: 'Enquiries', visit: 'Site Visits', campaign: 'Campaign Leads' };

function response_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function cellText_(value, limit) {
  const text = String(value == null ? '' : value).slice(0, limit || 1000);
  // Keep user input literal, including phone numbers beginning with +.
  return /^[\s]*[=+@-]/.test(text) ? "'" + text : text;
}

function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 32000) return response_({ ok: false });
    const body = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty('WEBHOOK_SECRET');
    if (!secret || body.secret !== secret) return response_({ ok: false });
    const data = body.lead;
    if (!data || !Object.prototype.hasOwnProperty.call(LEAD_TABS, data.formType) ||
        !/^[a-f0-9-]{36}$/i.test(data.submissionId || '') || data.consent !== 'yes' ||
        String(data.fullName || '').trim().length < 2 || !/^[+0-9 ()-]{8,18}$/.test(data.phone || '') ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) return response_({ ok: false });
    lock = LockService.getScriptLock();
    lock.waitLock(5000);
    const sheet = SpreadsheetApp.openById(props.getProperty('SPREADSHEET_ID')).getSheetByName(LEAD_TABS[data.formType]);
    if (!sheet || sheet.getRange(1, 1).getValue() !== 'Lead ID') return response_({ ok: false });
    const last = sheet.getLastRow();
    if (last > 1 && sheet.getRange(2, 1, last - 1, 1).createTextFinder(data.submissionId).matchEntireCell(true).findNext()) {
      return response_({ ok: true, submissionId: data.submissionId, duplicate: true });
    }
    const utm = data.utm || {};
    const row = [data.submissionId, new Date(), data.fullName, data.phone, data.email, data.city,
      data.interest, data.purpose, data.contactTime, data.message, data.pageUrl,
      utm.utm_source, utm.utm_medium, utm.utm_campaign, utm.utm_term, utm.utm_content,
      data.consent, 'New', '', '', ''].map(value => value instanceof Date ? value : cellText_(value));
    if (last >= sheet.getMaxRows()) sheet.insertRowsAfter(last, 100);
    sheet.getRange(last + 1, 1, 1, row.length).setValues([row]);
    sheet.getRange(last + 1, 2).setNumberFormat('dd mmm yyyy hh:mm:ss');
    SpreadsheetApp.flush();
    return response_({ ok: true, submissionId: data.submissionId });
  } catch (_) {
    return response_({ ok: false });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function doGet() {
  // No lead data or configuration is exposed publicly.
  return response_({ service: 'Anantara World enquiry receiver' });
}
