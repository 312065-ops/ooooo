const GAS_WEB_APP_URL = ''; // 部署 Google Apps Script 後請填入 Web App URL
const LOCAL_COUNTRIES = {
    日本: {
        flag: '🇯🇵',
        tagline: '以細膩與禮節著稱的島國',
        culture: '日本文化重視禮節、謙遜與秩序。茶道、和服、祭典與傳統手工藝，展現有序與細膩的生活美學。',
        taboo: '在公共場合大聲喧嘩、邊走邊吃、將筷子直插在飯中、送禮時避免送尖銳物品都是不禮貌。',
        festival: '春櫻祭、祇園祭、盂蘭盆節',
        greeting: 'こんにちは、ありがとうございます'
    },
    法國: {
        flag: '🇫🇷',
        tagline: '浪漫與品味兼具的藝術之國',
        culture: '法國文化以美食、藝術與浪漫聞名。重視品味、用餐禮儀與悠閒的生活節奏。',
        taboo: '赴宴時遲到超過 10 分鐘、在餐桌上講求效率、隨意評論餐點與忽略敬酒禮節會被視為失禮。',
        festival: '坎城影展、巴士底日慶典',
        greeting: 'Bonjour、Merci'
    },
    印度: {
        flag: '🇮🇳',
        tagline: '宗教與節慶交織的色彩國度',
        culture: '印度文化融合宗教、節慶與家族生活。重視敬神、尊重長者與善用香料的飲食習慣。',
        taboo: '觸碰他人頭部、用左手遞送食物或禮物、在寺廟內拍照或穿著過於暴露都應避免。',
        festival: '排燈節、胡里節、印度獨立日',
        greeting: 'नमस्ते (Namaste)、धन्यवाद (Dhanyavaad)'
    },
    義大利: {
        flag: '🇮🇹',
        tagline: '藝術、美食與歷史的生活舞台',
        culture: '義大利文化充滿藝術、咖啡與家庭聚餐。熱愛美食、葡萄酒與歷史街區的生活氛圍。',
        taboo: '不要在餐桌上剪麵條、在教堂內穿著暴露、隨意觸碰藝術品或食物上灑鹽。',
        festival: '威尼斯嘉年華、聖雷莫音樂節',
        greeting: 'Ciao、Buongiorno'
    },
    美國: {
        flag: '🇺🇸',
        tagline: '創新與多元並行的廣闊國度',
        culture: '美國文化重視個人主義、創新和多元。日常生活中講究效率、自由表達與便捷服務。',
        taboo: '在多人場合打斷別人談話、問私人收入或政治立場、忽略排隊與小費習慣可能引起反感。',
        festival: '感恩節、獨立日、萬聖節',
        greeting: 'Hello、Thank you'
    },
    台灣: {
        flag: '🇹🇼',
        tagline: '熱情友善與傳統風情並存',
        culture: '台灣文化是中華傳統與現代多元的融合，重視人情味、夜市美食與節慶活動。',
        taboo: '拿筷子敲碗、公開挑剔食物、送鐘、送傘、以及在正式場合用手指指人都不禮貌。',
        festival: '元宵節、端午節、燈會',
        greeting: '你好、謝謝、麻煩你了'
    }
};

const countryInput = document.getElementById('country-input');
const searchBtn = document.getElementById('search-btn');
const randomBtn = document.getElementById('random-btn');
const resultCountry = document.getElementById('result-country');
const resultTagline = document.getElementById('result-tagline');
const countryFlag = document.getElementById('country-flag');
const cultureText = document.getElementById('culture-text');
const tabooText = document.getElementById('taboo-text');
const festivalText = document.getElementById('festival-text');
const greetingText = document.getElementById('greeting-text');
const statusBox = document.getElementById('status-box');
const adminEntry = document.getElementById('admin-entry');
const countryCard = document.getElementById('country-card');

let countries = { ...LOCAL_COUNTRIES };
let countryNames = Object.keys(countries);

function normalizeName(name) {
    return name.trim().replace(/\s+/g, '').toLowerCase();
}

function findCountry(name) {
    if (!name) return null;
    const normalizedQuery = normalizeName(name);
    return countryNames.find(key => normalizeName(key) === normalizedQuery);
}

function setStatus(message, isError = false) {
    statusBox.textContent = message;
    statusBox.classList.toggle('status-error', isError);
}

function renderCountry(name) {
    if (!name) {
        resultCountry.textContent = '請選擇國家';
        resultTagline.textContent = '點擊卡片翻轉，查看文化與禁忌。';
        countryFlag.textContent = '🌏';
        cultureText.textContent = '你可以輸入國家名稱或按下「隨機抽取國家」來開始。';
        tabooText.textContent = '每個國家都有獨特的習俗與禁忌，請尊重當地文化。';
        festivalText.textContent = '-';
        greetingText.textContent = '-';
        return;
    }

    const country = countries[name];
    if (!country) {
        resultCountry.textContent = `${name}（資料暫無）`;
        resultTagline.textContent = '請嘗試其他國家名稱。';
        countryFlag.textContent = '❓';
        cultureText.textContent = '目前尚未收錄此國家的詳細文化資訊。';
        tabooText.textContent = '請確認國家名稱拼寫，或嘗試搜尋其他國家。';
        festivalText.textContent = '-';
        greetingText.textContent = '-';
        return;
    }

    resultCountry.textContent = name;
    resultTagline.textContent = country.tagline || '探索當地文化與禁忌。';
    countryFlag.textContent = country.flag || '🌍';
    cultureText.textContent = country.culture;
    tabooText.textContent = country.taboo;
    festivalText.textContent = country.festival || '暫無資料。';
    greetingText.textContent = country.greeting || '暫無資料。';
}

function showCountry(name) {
    const matched = findCountry(name);
    if (matched) {
        renderCountry(matched);
        return;
    }

    if (!name.trim()) {
        renderCountry(null);
        return;
    }

    renderCountry(name.trim());
}

function pickRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countryNames.length);
    const randomCountry = countryNames[randomIndex];
    countryInput.value = randomCountry;
    renderCountry(randomCountry);
}

async function loadCountryData() {
    if (!GAS_WEB_APP_URL) {
        setStatus('未設定 Google Apps Script URL，使用本機示範資料。');
        return;
    }

    try {
        setStatus('從 Google 試算表載入國家資料…');
        const response = await fetch(`${GAS_WEB_APP_URL}?action=read`);
        if (!response.ok) throw new Error('API 連線失敗');
        const data = await response.json();
        if (data && Array.isArray(data.items)) {
            countries = data.items.reduce((acc, row) => {
                if (row.country) {
                    acc[row.country] = {
                        flag: row.flag || '🌍',
                        tagline: row.tagline || '',
                        culture: row.culture || '',
                        taboo: row.taboo || '',
                        festival: row.festival || '',
                        greeting: row.greeting || ''
                    };
                }
                return acc;
            }, {});
            countryNames = Object.keys(countries);
            setStatus('已從試算表載入資料，現在可搜尋或抽取國家。');
        } else {
            setStatus('試算表資料格式異常，使用本機示範資料。', true);
        }
    } catch (error) {
        console.error(error);
        setStatus('無法載入試算表資料，使用本機示範資料。', true);
    }
}

searchBtn.addEventListener('click', () => {
    showCountry(countryInput.value);
    countryCard.classList.remove('is-flipped');
});

countryInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        showCountry(countryInput.value);
        countryCard.classList.remove('is-flipped');
    }
});

randomBtn.addEventListener('click', () => {
    pickRandomCountry();
    countryCard.classList.remove('is-flipped');
});

countryCard.addEventListener('click', () => {
    countryCard.classList.toggle('is-flipped');
});

adminEntry.addEventListener('click', () => {
    window.location.href = 'admin.html';
});

window.addEventListener('load', async () => {
    renderCountry(null);
    await loadCountryData();
});