import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../app/lib/lead-storage.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function storage(fetch) {
  const context = { exports: {}, fetch, AbortSignal };
  vm.runInNewContext(js, context);
  return context.exports.saveLeadToSheet;
}
const url = 'https://script.google.com/macros/s/test-deployment/exec';
const lead = { submissionId: '11111111-1111-4111-8111-111111111111', formType: 'enquiry', fullName: 'Test Lead', phone: '+919000000000', email: 'test@example.com', consent: 'yes', message: '=IMPORTXML("https://example.com", "x")' };

test('storage sends authenticated server payload and requires matching receipt', async () => {
  let request;
  const save = storage(async (_, init) => { request = init; return Response.json({ ok: true, submissionId: lead.submissionId }); });
  await save(lead, url, 'private-test-secret');
  assert.equal(JSON.parse(request.body).secret, 'private-test-secret');
  assert.equal(JSON.parse(request.body).lead.formType, 'enquiry');
  assert.equal(request.redirect, 'follow');
  await assert.rejects(storage(async () => Response.json({ ok: true, submissionId: 'wrong' }))(lead, url, 'secret'));
});
test('storage rejects bad configuration and provider failures', async () => {
  let calls = 0;
  const save = storage(async () => { calls++; return new Response('error', { status: 503 }); });
  await assert.rejects(save(lead, 'https://example.com', 'secret'));
  await assert.rejects(save(lead, url, ''));
  assert.equal(calls, 0);
  await assert.rejects(save(lead, url, 'secret'));
  await assert.rejects(storage(async () => new Response('<html>Sign in</html>'))(lead, url, 'secret'));
  await assert.rejects(storage(async () => { throw new Error('timeout'); })(lead, url, 'secret'));
});

function receiver() {
  const rows = Object.fromEntries(['Enquiries', 'Site Visits', 'Campaign Leads'].map(name => [name, []]));
  let locked = false;
  const context = {
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => key === 'WEBHOOK_SECRET' ? 'secret' : 'sheet-id' }) },
    LockService: { getScriptLock: () => ({ waitLock: () => { locked = true; }, hasLock: () => locked, releaseLock: () => { locked = false; } }) },
    SpreadsheetApp: { flush() {}, openById: () => ({ getSheetByName: name => ({
      getLastRow: () => rows[name].length + 1, getMaxRows: () => 1000,
      getRange: () => ({ getValue: () => 'Lead ID', setNumberFormat() {},
        setValues: value => { assert.equal(locked, true); rows[name].push(value[0]); },
        createTextFinder: id => ({ matchEntireCell: () => ({ findNext: () => rows[name].some(row => row[0] === id) }) }) }),
    }) }) },
  };
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL('../integrations/google-sheets/Code.gs', import.meta.url), 'utf8'), context);
  return { rows, post: (data, secret = 'secret') => context.doPost({ postData: { contents: JSON.stringify({ secret, lead: data }) } }) };
}
test('receiver routes all three forms, escapes formulas, and deduplicates retries', () => {
  const app = receiver();
  for (const [formType, name] of [['enquiry','Enquiries'],['visit','Site Visits'],['campaign','Campaign Leads']]) {
    const data = { ...lead, formType };
    assert.equal(app.post(data).ok, true);
    assert.equal(app.post(data).duplicate, true);
    assert.equal(app.rows[name].length, 1);
    assert.equal(app.rows[name][0][9], "'" + lead.message);
    assert.equal(app.rows[name][0][3], "'" + lead.phone);
    assert.equal(app.rows[name][0][17], 'New');
  }
});
test('receiver refuses unauthenticated, unknown-form and unconsented submissions', () => {
  const app = receiver();
  assert.equal(app.post(lead, 'wrong').ok, false);
  assert.equal(app.post({ ...lead, formType: '__proto__' }).ok, false);
  assert.equal(app.post({ ...lead, consent: 'no' }).ok, false);
  assert.equal(app.post({ ...lead, submissionId: 'bad-id' }).ok, false);
  assert.equal(Object.values(app.rows).flat().length, 0);
});
