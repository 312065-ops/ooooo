# Google Sheets + Google Apps Script 整合指南

本專案為「全球國家文化探索 App」，包含前端卡片探索頁、管理後台，以及透過 Google Apps Script 將資料寫入 Google 試算表的完整範例。

## 一、專案功能對應

1. **前端網頁效果**
   - `index.html`：首頁卡片探索頁，支援卡片翻轉動畫、隨機抽取、國家搜尋。
   - `style.css`：卡片 3D 翻轉特效、版面配置與響應式設計。
   - `script.js`：前端資料渲染、卡片互動、搜尋邏輯、Google Sheets 讀取呼叫。

2. **呼叫 API 自動填入資料**
   - `admin.html`：管理後台頁面提供「AI 自動生成」按鈕介面。
   - 可設定 `AI_API_URL` 與 `AI_API_KEY`，串接 OpenAI / Gemini 或自訂文化資料 API。

3. **系統資料存入 Google Sheets**
   - `backend_gas.js`：Google Apps Script 後端範例，支援讀取 (`read`) 與儲存 (`save`) 動作。
   - 在 `script.js` 與 `admin.html` 中設定 `GAS_WEB_APP_URL`，即可連接 Google Sheets 後端。

4. **GitHub Pages 網址**
   - 若已部署 GitHub Pages，網址通常為：
     `https://<GitHub 使用者名稱>.github.io/ooooo/`
   - 請在 GitHub repo 的 `Settings` → `Pages` 設定分支為 `main`、根目錄 `/`。

---

## 二、建立 Google 試算表與 Apps Script

### 1. 建立試算表
1. 登入 Google 帳號，打開 Google Sheets。
2. 建立新的空白試算表。
3. 新增工作表並命名為 `Countries`。
4. 在第一列填入欄位：`country`, `flag`, `tagline`, `culture`, `taboo`, `festival`, `greeting`。

### 2. 建立 Google Apps Script
1. 在試算表中點選 `擴充功能` → `Apps Script`。
2. 新增專案後，貼入專案中的 `backend_gas.js` 內容。
3. 修改 `SPREADSHEET_ID` 為實際試算表 ID。

### 3. 部署 Web App
1. 在 Apps Script 中點選 `部署` → `新建部署`。
2. 選擇 `Web 應用程式`。
3. `執行身分` 選擇 `我`。
4. `存取權限` 選擇 `任何人` 或 `任何有 Google 帳號的人`。
5. 點擊 `部署`，並複製產生的 URL。
6. 將 URL 設定到 `script.js` 與 `admin.html` 的 `GAS_WEB_APP_URL`。

---

## 三、前端整合說明

### 首頁 `index.html`
- 載入時會嘗試從 `GAS_WEB_APP_URL?action=read` 讀取國家資料。
- 若未設定 URL，則使用內建示範資料。
- 使用者可輸入國家名稱或點擊「隨機抽取國家」。
- 點擊卡片後會觸發翻轉動畫，查看詳細資訊。

### 管理後台 `admin.html`
- 支援 mock 模式的管理員登入測試。
- 填寫國家資料後，點擊「儲存國家資料」會發送 `POST` 請求到 GAS 後端。
- 若設定 AI API，可點擊「AI 自動生成」，自動填入欄位內容。

### 資料儲存流程
- 前端會發送 JSON 到 `GAS_WEB_APP_URL?action=save`。
- Apps Script 會將資料 append 到試算表最後一列。

---

## 四、GitHub Pages 部署

### 1. 將專案推上 GitHub
1. 確認專案已經在 GitHub repository 中。
2. 若尚未，建立 repo 並推送目前檔案。

### 2. 設定 GitHub Pages
1. 進入 GitHub repo 的 `Settings`。
2. 找到 `Pages` 或 `GitHub Pages`。
3. 選擇分支 `main`、根目錄 `/`。
4. 儲存設定並稍等部署完成。

### 3. 取得 Pages 網址
- GitHub Pages 會顯示部署後的網站網址。
- 範例： `https://312065-ops.github.io/ooooo/`。
- 若使用不同帳號，請改為自己的 GitHub 使用者名稱。

---

## 五、補充說明

- 若要實作完整 OAuth 管理員驗證，請在 `admin.html` 中填入 `GOOGLE_CLIENT_ID`，並串接 Google Identity Services。
- 若要正式啟用 AI 自動填入，請在 `admin.html` 中填入 `AI_API_URL` 與 `AI_API_KEY`。
- 本專案已經包含前端效果、AI 自動填入按鈕介面、以及 Google Sheets 寫入後端範例。
