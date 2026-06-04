# 全球國家文化探索 App

這是一個純前端 HTML / CSS / JavaScript 的國家文化探索頁面，並提供後台管理頁面與 Google 試算表整合範例。

主要內容：
- `index.html`：首頁卡片探索頁面，支援隨機抽取及國家搜尋
- `style.css`：卡片 3D 翻轉特效與響應式樣式
- `script.js`：資料載入、搜尋、隨機抽取、翻頁特效與 Google Sheets API 呼叫架構
- `admin.html`：管理後台頁面，含 OAuth 管理員登入與 AI 自動生成按鈕介面
- `backend_gas.js`：Google Apps Script 範例後端，支援讀取與寫入 Google 試算表

操作說明：
1. 將 `backend_gas.js` 部署為 Google Apps Script Web App，並設定 `SPREADSHEET_ID` 與 `SHEET_NAME`
2. 在 `script.js` 與 `admin.html` 中填入 `GAS_WEB_APP_URL`
3. 若啟用 OAuth，請在 `admin.html` 中填入 `GOOGLE_CLIENT_ID` 與管理員 `ALLOWED_EMAILS`
4. 若啟用 AI 自動生成，請在 `admin.html` 中填入 `AI_API_URL` 與 `AI_API_KEY`

> 目前若未設定 Google Apps Script URL，首頁仍會使用內建示範資料。