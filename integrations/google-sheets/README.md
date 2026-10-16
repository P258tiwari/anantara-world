# Website lead storage

Workbook: https://docs.google.com/spreadsheets/d/1VZFMkAXx28pAhf_CkXwORoCB_5cvFrw8wdAnj3SHqSU/edit

The website uses its existing forms and `/api/enquiry`. The server sends authenticated requests to a Google Apps Script receiver, which routes `enquiry`, `visit` and `campaign` into Enquiries, Site Visits and Campaign Leads. No Google Form is needed. The spreadsheet remains private.

## One-time Google setup

1. Open the workbook, then **Extensions → Apps Script**.
2. Replace the editor contents with the private, ready-to-paste `.tmp/Anantara-Lead-Receiver.gs` file. It contains the matching secret, so keep it private and out of Git.
3. Save, select `setup` and click **Run**. Authorize spreadsheet access with the owning Google account.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. The receiver checks the secret before accepting writes; it exposes no lead-reading endpoint.
5. Copy the deployed URL ending in `/exec` into `GOOGLE_SHEETS_WEBHOOK_URL` in `.env.local`. Restart the local server. Keep `GOOGLE_SHEETS_WEBHOOK_SECRET` unchanged.
6. Configure the same two server-side secrets on the production host before publishing. Do not use `NEXT_PUBLIC_` variables for these values.
7. Submit one clearly labelled test from each website form and verify the row appears in the corresponding tab. Delete only these test rows after verification.

The Google deployment and live end-to-end test are still pending. Browser automation was unavailable when this integration was prepared. Connector access can create the workbook but cannot deploy Apps Script.

Source: https://developers.google.com/apps-script/guides/web

## Delivery behaviour

With a Sheets endpoint configured, the API only confirms success after a matching saved-lead receipt. Retries keep the same lead ID; the receiver locks writes and deduplicates that ID. User text is escaped to prevent spreadsheet formulas. Existing email notifications remain optional; a failed notification does not reject a lead already saved in Sheets. Without a Sheets endpoint, existing configured email delivery continues. With neither configured, submissions return an error instead of silently discarding the lead.

The `Status`, `Assigned to`, `Next follow-up` and `Sales notes` columns are for the sales team. New rows start with status `New`. Received timestamps use the workbook's India timezone. Keep the first-row headers and tab names unchanged.
