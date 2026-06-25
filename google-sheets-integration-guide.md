# Google Sheets + Google Apps Script 整合指南

本專案為「全球國家文化探索 App」，包含前端卡片探索頁、管理後台，以及透過 Google Apps Script 將資料寫入 Google 試算表的完整整合教學。

## 1. 你的目標

- 讓 `index.html` 從 Google 試算表讀取國家資料
- 讓 `admin.html` 新增資料時寫入 Google 試算表
- 使用 `backend_gas.js` 作為 Apps Script 後端
- 設定以下兩個值：
  - `SPREADSHEET_ID`
  - `GAS_WEB_APP_URL`

---

## 2. 建立 Google 試算表

1. 登入 Google 帳號，開啟 Google Sheets。
2. 建立新的空白試算表。
3. 將工作表名稱改為 `Countries`。
4. 在第一列填入下列欄位名稱：
   - `country`
   - `flag`
   - `tagline`
   - `culture`
   - `taboo`
   - `festival`
   - `greeting`

例如：

| country | flag | tagline | culture | taboo | festival | greeting |
|---|---|---|---|---|---|---|
| 日本 | 🇯🇵 | 以細膩與禮節著稱的島國 | ... | ... | ... | ... |

---

## 3. 建立 Apps Script 後端

1. 在試算表功能表點選 `擴充功能` → `Apps Script`。
2. 建立新專案。
3. 將 `backend_gas.js` 的完整程式內容貼到 Apps Script 編輯器中。
4. 修改 `SPREADSHEET_ID` 為你的試算表 ID：
   - 從試算表網址擷取，例如 `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit`
   - 將 `<SPREADSHEET_ID>` 貼到 `backend_gas.js` 中
5. 確認 `SHEET_NAME = 'Countries'`。

---

## 4. 部署 Web App

1. 在 Apps Script 編輯器右上角點選 `部署` → `新建部署`。
2. 部署類型選擇 `Web 應用程式`。
3. `執行身分` 選擇 `我`。
4. `應用程式存取權` 選擇：
   - `任何人`，或
   - `任何有 Google 帳號的人`
5. 按下 `部署`。
6. 複製部署完成後的 Web 應用程式 URL。

---

## 5. 更新前端設定

### 5.1 更新 `script.js`

找到檔案開頭：

```js
const GAS_WEB_APP_URL = ''; // 部署 Google Apps Script 後請填入 Web App URL，例如：https://script.google.com/macros/s/XXXXXXXXXXXX/exec
```

填入你剛才複製的 Web App URL。

### 5.2 更新 `admin.html`

找到：

```js
const GAS_WEB_APP_URL = ''; // 設定 Google Apps Script Web App URL，例如：https://script.google.com/macros/s/XXXXXXXXXXXX/exec
```

同樣填入同一個 URL。

---

## 6. 確認應該可以正常運作的功能

### `index.html`
- 載入時會先嘗試呼叫 `GET ?action=read`。
- 若成功，頁面會顯示試算表中的國家資料。
- 若失敗，會回退成內建本機示範資料。

### `admin.html`
- 按下 `儲存國家資料` 後，會發送 `POST ?action=save` 到 GAS Web App。
- 試算表會將內容寫入 `Countries` 工作表最後一列。

---

## 7. 本機測試方式

建議在本機啟動 HTTP 伺服器，避免直接以 `file://` 開啟造成資源或跨域問題。

```bash
cd /workspaces/ooooo
python3 -m http.server 8000
```

然後瀏覽：
- `http://localhost:8000/index.html`
- `http://localhost:8000/admin.html`

---

## 8. 常見問題與快速排錯

### 8.1 GAS Web App 讀不到資料

- 確認 `SPREADSHEET_ID` 正確
- 確認試算表工作表名稱為 `Countries`
- 確認第 1 列欄位名稱正確
- 確認 Apps Script 部署已成功
- 確認 `script.js` 的 `GAS_WEB_APP_URL` 已填入 Web App URL

### 8.2 新增資料寫入失敗

- 確認 `admin.html` 的 `GAS_WEB_APP_URL` 已填入同一個 Web App URL
- 確認瀏覽器 Console 沒有 `CORS` 錯誤
- 確認 Apps Script `doPost()` 可以處理 `action=save`

### 8.3 想要管理員驗證或 AI 生成

- 若要啟用完整管理員登入，請在 `admin.html` 填入 `GOOGLE_CLIENT_ID`，並補上 Google Identity Services 初始化程式碼。
- 若要啟用 AI 自動生成，請填入 `AI_API_URL` 與 `AI_API_KEY`。

---

## 9. 進階補充

- `backend_gas.js` 已支援：
  - `GET?action=read` → 讀取試算表資料
  - `POST?action=save` → 寫入試算表資料
- `script.js` 與 `admin.html` 均已調整為透過 `application/x-www-form-urlencoded` 傳送 POST 資料，讓 GAS 後端能正確解析。
