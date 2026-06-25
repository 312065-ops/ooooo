const GAS_WEB_APP_URL = ''; // 部署 Google Apps Script 後請填入 Web App URL，例如：https://script.google.com/macros/s/XXXXXXXXXXXX/exec
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
    中國: {
        flag: '🇨🇳',
        tagline: '歷史悠久與多元地域融合的大國',
        culture: '中國文化擁有千年歷史，重視家庭、禮節與節慶。中華美食與傳統習俗在各地呈現豐富面貌。',
        taboo: '在正式場合隨意評論政治、送鐘送傘、公開挑剔長輩，以及在餐桌上插筷子都是禁忌。',
        festival: '春節、中秋節、端午節',
        greeting: '你好、謝謝、辛苦了'
    },
    英國: {
        flag: '🇬🇧',
        tagline: '傳統與現代兼具的皇室國度',
        culture: '英國文化講究禮貌、幽默與隊列文化。茶文化、文學與皇室儀式是其重要特色。',
        taboo: '在公共場合大聲喧嘩、插隊、隨意評論天氣以外的私人事務，尤其是皇室，是不禮貌的。',
        festival: '皇家賽馬節、聖誕節、復活節',
        greeting: 'Hello、Cheers'
    },
    加拿大: {
        flag: '🇨🇦',
        tagline: '自然廣闊與友善多元的北美國家',
        culture: '加拿大文化重視友善、包容與自然保育。雙語社會與多元民族共存，是其核心特色。',
        taboo: '忽略排隊、在公共場合大聲講話或對少數族群言語不尊重，是極不禮貌的行為。',
        festival: '加拿大國慶日、魁北克狂歡節、楓葉節',
        greeting: 'Hello、Thank you'
    },
    德國: {
        flag: '🇩🇪',
        tagline: '精準、效率與工藝的歐洲心臟',
        culture: '德國文化講求守時、規則與品質。啤酒節、古典音樂與汽車工業都是其標誌。',
        taboo: '遲到、忽略交通規則、在正式場合大聲談話，或在公共場合腳踩桌椅都被視為不尊重。',
        festival: '慕尼黑啤酒節、聖誕市集',
        greeting: 'Guten Tag、Danke'
    },
    澳洲: {
        flag: '🇦🇺',
        tagline: '戶外生活與多元文化交織的大洋洲國家',
        culture: '澳洲文化崇尚戶外運動、友善平等與休閒生活。海灘、野生動物與燒烤派對是日常的一部分。',
        taboo: '對陌生人過於冒犯、在公共場所大聲嚷嚷、無視海灘安全警示都很不受歡迎。',
        festival: '澳洲國慶日、悉尼跨年煙火、墨爾本藝術節',
        greeting: "G'day、Thanks"
    },
    巴西: {
        flag: '🇧🇷',
        tagline: '熱情活力與嘉年華節拍的拉丁大國',
        culture: '巴西文化以音樂、舞蹈和足球著稱。熱情好客，節慶與街頭派對是重要生活元素。',
        taboo: '對外表過度批評、忽視歡迎禮儀、在公共場合表現出冷漠會被視為不友善。',
        festival: '里約嘉年華、嘉年華節',
        greeting: 'Olá、Obrigado'
    },
    俄羅斯: {
        flag: '🇷🇺',
        tagline: '廣袤土地與深厚文學藝術傳統的大國',
        culture: '俄羅斯文化講求堅韌與熱情好客。芭蕾、文學與民間傳說是其文化核心。',
        taboo: '在公共場合大聲談論私事、未經邀請進入住宅、忽略敬酒禮節都不禮貌。',
        festival: '勝利日、聖彼得堡白夜節',
        greeting: 'Здравствуйте、Спасибо'
    },
    西班牙: {
        flag: '🇪🇸',
        tagline: '節慶、鬥牛與美食共舞的陽光國度',
        culture: '西班牙文化充滿節日、午休與社交時光。美食、弗拉明戈與地中海風情是標誌。',
        taboo: '隨意評論飲食、未尊重午餐時間、在公共場合太過拘謹會讓當地人覺得不自在。',
        festival: '番茄節、奔牛節、聖費爾明節',
        greeting: 'Hola、Gracias'
    },
    墨西哥: {
        flag: '🇲🇽',
        tagline: '色彩繽紛與傳統節慶充滿生命力的國家',
        culture: '墨西哥文化重視家庭、宗教與節慶。飲食香料濃郁、音樂節奏熱情，生活充滿熱情與傳承。',
        taboo: '不尊重宗教節慶、在私人聚會未先打招呼、輕視家庭價值都很不禮貌。',
        festival: '亡靈節、獨立日',
        greeting: 'Hola、Gracias'
    },
    韓國: {
        flag: '🇰🇷',
        tagline: '現代流行與傳統文化共存的亞洲強國',
        culture: '韓國文化融合傳統禮節與現代流行。重視長幼尊卑、團隊精神與社交禮節。',
        taboo: '未長幼有序、在公共場合大聲講話、直接拒絕他人或在餐桌上插嘴都不禮貌。',
        festival: '中秋節、春節、釜山國際影展',
        greeting: '안녕하세요、감사합니다'
    },
    南非: {
        flag: '🇿🇦',
        tagline: '多元文化與自然景觀交匯的非洲國家',
        culture: '南非文化呈現多民族、多語言與豐富傳統。野生動物保育、音樂與部落藝術都是文化亮點。',
        taboo: '忽視安全警示、在文化景區行為輕率、對不同族群言語不敬都是大忌。',
        festival: '國家花節、文化節',
        greeting: 'Hello、Thank you'
    },
    埃及: {
        flag: '🇪🇬',
        tagline: '古文明與現代生活交織的尼羅河國度',
        culture: '埃及文化深受古埃及文明與伊斯蘭傳統影響。家庭、宗教儀式與熱情款待是生活核心。',
        taboo: '在宗教場所穿著不當、對宗教敏感話題不敬、拍攝陌生人前未徵求許可是不禮貌。',
        festival: '齋戒月、埃及國慶',
        greeting: 'مرحبا (Marhaba)、شكرا (Shukran)'
    },
    阿根廷: {
        flag: '🇦🇷',
        tagline: '足球、探戈與廣闊草原的南美國度',
        culture: '阿根廷文化充滿探戈、足球與濃厚的社交氛圍。家族聚會與美食是日常的重點。',
        taboo: '隨意評論足球隊、遲到、在餐桌上對食物過於挑剔都是不禮貌。',
        festival: '探戈節、阿根廷國慶',
        greeting: 'Hola、Gracias'
    },
    印尼: {
        flag: '🇮🇩',
        tagline: '島嶼民族與多元宗教共榮的大國',
        culture: '印尼文化結合宗教、音樂與傳統舞蹈。重視和諧、禮貌與家庭價值。',
        taboo: '在宗教場所穿著不當、觸碰他人頭部、在公共場合表現出過度親密行為都是禁忌。',
        festival: '巴厘島節、勝利日',
        greeting: 'Selamat siang、Terima kasih'
    },
    台灣: {
        flag: '🇹🇼',
        tagline: '熱情友善與傳統風情並存',
        culture: '台灣文化是中華傳統與現代多元的融合，重視人情味、夜市美食與節慶活動。',
        taboo: '拿筷子敲碗、公開挑剔食物、送鐘、送傘、以及在正式場合用手指指人都不禮貌。',
        festival: '元宵節、端午節、燈會',
        greeting: '你好、謝謝、麻煩你了'
    },
    沙烏地阿拉伯: {
        flag: '🇸🇦',
        tagline: '石油與宗教聖地並存的中東大國',
        culture: '沙烏地阿拉伯文化深受伊斯蘭信仰影響，重視禮節、家庭與宗教儀式。',
        taboo: '在公共場合飲酒、穿著不當、對宗教或政治發表批評都是嚴重禁忌。',
        festival: '齋戒月結束節、獨立日、朝覲季節',
        greeting: 'السلام عليكم (As-salamu alaykum)、شكرا (Shukran)'
    },
    土耳其: {
        flag: '🇹🇷',
        tagline: '歐亞交匯、歷史與美食兼具的國家',
        culture: '土耳其文化融合亞洲與歐洲影響，重視待客之道與傳統市場文化。',
        taboo: '隨意批評宗教、在公共場所大聲喧嘩、遲到或拒絕招待客人都不禮貌。',
        festival: '開齋節、宰牲節、土耳其青少年節',
        greeting: 'Merhaba、Teşekkürler'
    },
    荷蘭: {
        flag: '🇳🇱',
        tagline: '自由開放與自行車文化著稱的低地國家',
        culture: '荷蘭文化講求開放、直接與環保。自行車與國際化是其生活重要元素。',
        taboo: '在公開場合諷刺他人、忽略交通規則及不尊重私人空間是失禮行為。',
        festival: '國王節、鬱金香節',
        greeting: 'Hallo、Dank je'
    },
    瑞士: {
        flag: '🇨🇭',
        tagline: '精準中立與高山景緻共存的歐洲之國',
        culture: '瑞士文化重視守時、隱私與自然保護。多語言與各地區傳統並存。',
        taboo: '遲到、打擾私人生活、在公共空間製造噪音都被視為不禮貌。',
        festival: '日內瓦電影節、伯爾尼國慶',
        greeting: 'Grüezi、Merci'
    },
    瑞典: {
        flag: '🇸🇪',
        tagline: '社會福利與自然生活並重的北歐國家',
        culture: '瑞典文化強調平等、可持續與簡約生活。傳統節慶與設計美學廣為人知。',
        taboo: '在社交場合誇耀、打斷別人說話、忽視環保與個人空間都不受歡迎。',
        festival: '仲夏節、聖露西節',
        greeting: 'Hej、Tack'
    },
    挪威: {
        flag: '🇳🇴',
        tagline: '峽灣與極光見證的北歐自然國度',
        culture: '挪威文化重視自然、平衡工作與生活。戶外活動與極地探索是重要特色。',
        taboo: '對自然缺乏尊重、在公共交通大聲說話或未遵守排隊規則都被視為不禮貌。',
        festival: '國慶日、北極光節',
        greeting: 'Hei、Takk'
    },
    芬蘭: {
        flag: '🇫🇮',
        tagline: '森林、湖泊與寧靜生活交織的北歐國家',
        culture: '芬蘭文化重視隱私、簡約與自然生活。桑拿文化和設計理念廣受世界注目。',
        taboo: '在私密空間內打斷談話、未遵守公共禮儀或打擾他人安靜時間很不禮貌。',
        festival: '仲夏節、燈塔日',
        greeting: 'Hei、Kiitos'
    },
    紐西蘭: {
        flag: '🇳🇿',
        tagline: '毛利文化與冒險旅遊並存的南太平洋國家',
        culture: '紐西蘭文化結合毛利傳統與西方生活方式。重視自然保護、社區精神與戶外活動。',
        taboo: '不尊重毛利文化、破壞自然環境、忽略社區禮儀會被視為不禮貌。',
        festival: '毛利新年、國慶日',
        greeting: 'Kia ora、Thank you'
    },
    泰國: {
        flag: '🇹🇭',
        tagline: '微笑王國與佛教文化交織的東南亞國家',
        culture: '泰國文化以佛教、節慶與熱情好客聞名。寺廟、夜市與傳統飲食是文化核心。',
        taboo: '觸摸他人頭部、在寺廟內著裝不當、對皇室發表不敬言論都是禁忌。',
        festival: '宋干節、燈節',
        greeting: 'สวัสดี (Sawasdee)、ขอบคุณ (Khob khun)'
    },
    越南: {
        flag: '🇻🇳',
        tagline: '河流與傳統美食交織的東南亞國度',
        culture: '越南文化重視家庭、禮節與節慶飲食。河流、廟宇與街邊美食是城市生活的核心。',
        taboo: '隨意觸摸他人頭部、公開表達情緒、在公共場所大聲喧嘩都不禮貌。',
        festival: '春節、中秋節',
        greeting: 'Xin chào、Cảm ơn'
    },
    馬來西亞: {
        flag: '🇲🇾',
        tagline: '多元種族與宗教共存的熱帶國家',
        culture: '馬來西亞文化融合馬來、華人與印度文化。節慶與美食豐富多彩。',
        taboo: '在宗教場合穿著不當、用左手遞送物品或觸摸他人頭部都是禁忌。',
        festival: '開齋節、農曆新年、屠妖節',
        greeting: 'Selamat、Terima kasih'
    },
    新加坡: {
        flag: '🇸🇬',
        tagline: '城市現代化與多元文化融合的城市國家',
        culture: '新加坡文化講求清潔、守法與效率。多族群共存使節慶與飲食文化非常豐富。',
        taboo: '亂丟垃圾、在公共場合吃口香糖、觸摸他人頭部或在地鐵上飲食都是禁忌。',
        festival: '國慶日、燈節、華人新年',
        greeting: 'Hello、Thank you'
    },
    菲律賓: {
        flag: '🇵🇭',
        tagline: '熱情友善與島嶼文化交織的國家',
        culture: '菲律賓文化融合西班牙、亞洲與美國影響，重視家庭與節慶音樂。',
        taboo: '在公共場合大聲爭吵、對長者不敬、在宗教節慶中無禮都是不受歡迎的行為。',
        festival: '聖週、聖地牙哥節',
        greeting: 'Mabuhay、Salamat'
    },
    尼日利亞: {
        flag: '🇳🇬',
        tagline: '多語族且充滿活力的非洲大國',
        culture: '尼日利亞文化多元且富有節慶氣氛。音樂、舞蹈與家庭關係在日常生活中佔據重要位置。',
        taboo: '在公共場合無禮對待長者、諷刺他人、輕視傳統儀式會被視為失禮。',
        festival: '新年節、文化祭',
        greeting: 'Hello、Thank you'
    },
    肯亞: {
        flag: '🇰🇪',
        tagline: '野生動物與部落文化共融的東非國家',
        culture: '肯亞文化以部落傳統與野生動物保育聞名。社區生活與節慶舞蹈是重要特色。',
        taboo: '在村落未經允許拍照、無視長者指導、破壞環境資源都是不尊重。',
        festival: '文化節、國慶日',
        greeting: 'Jambo、Asante'
    },
    以色列: {
        flag: '🇮🇱',
        tagline: '聖地歷史與科技創新並存的中東國家',
        culture: '以色列文化融合宗教傳統與現代科技。家庭、宗教節慶與語言復興是文化焦點。',
        taboo: '在宗教場所不尊重習俗、隨意評論衝突或忽略守時都不禮貌。',
        festival: '逾越節、住棚節、猶太新年',
        greeting: 'שלום (Shalom)、תודה (Toda)'
    },
    智利: {
        flag: '🇨🇱',
        tagline: '南美長國境內的葡萄酒與山脈國家',
        culture: '智利文化結合西班牙傳統與安地斯原住民影響。葡萄酒、海鮮與戶外活動是生活特色。',
        taboo: '在社交場合無禮對待他人、遲到、或對當地食物輕視都不受歡迎。',
        festival: '國慶日、葡萄酒節',
        greeting: 'Hola、Gracias'
    },
    秘魯: {
        flag: '🇵🇪',
        tagline: '印加遺跡與安地斯文化交織的美食國度',
        culture: '秘魯文化擁有印加遺產與多元美食。市集、節慶與家庭用餐是日常生活重點。',
        taboo: '對當地傳統不尊重、在文化遺址任意行為，或忽視社交禮節都不禮貌。',
        festival: '太陽節、獨立日',
        greeting: 'Hola、Gracias'
    },
    哥倫比亞: {
        flag: '🇨🇴',
        tagline: '咖啡、音樂與熱情文化交織的南美國家',
        culture: '哥倫比亞文化充滿音樂、舞蹈與熱情好客。咖啡文化與節慶氣氛深植人心。',
        taboo: '公開批評他人、刁難主人、無視地方禮節都會讓人不悅。',
        festival: '狂歡節、花卉節',
        greeting: 'Hola、Gracias'
    },
    葡萄牙: {
        flag: '🇵🇹',
        tagline: '海洋探索與葡萄酒傳統並存的西歐國家',
        culture: '葡萄牙文化結合歷史航海傳統與悠閒生活。法朵音樂、海鮮與葡萄酒是其重要特色。',
        taboo: '在公共場合大聲喧嘩、未尊重餐桌禮儀、遲到或無視對方空間都不受歡迎。',
        festival: '聖安東尼節、里斯本音樂節',
        greeting: 'Olá、Obrigado'
    },
    希臘: {
        flag: '🇬🇷',
        tagline: '神話文明與愛琴海風情交織的國度',
        culture: '希臘文化以古代文明、哲學與愛琴海島嶼生活著稱。家庭與節慶飲食是生活重心。',
        taboo: '在宗教場所穿著不當、忽視招待、公開批評長輩或神話傳統都不禮貌。',
        festival: '復活節、聖若望節',
        greeting: 'Γεια σας (Yia sas)、Ευχαριστώ (Efharisto)'
    },
    波蘭: {
        flag: '🇵🇱',
        tagline: '歷史與復原力交錯的中歐大地',
        culture: '波蘭文化重視宗教、家庭與傳統手工藝。節慶與傳統料理在當地生活中扮演重要角色。',
        taboo: '對歷史話題輕率評論、無視宗教習俗、在餐桌上遲到都不禮貌。',
        festival: '聖誕節、復活節',
        greeting: 'Cześć、Dziękuję'
    },
    捷克: {
        flag: '🇨🇿',
        tagline: '啤酒與城堡文化聞名的中歐國家',
        culture: '捷克文化重視歷史、文學與社交時光。城堡、溫泉與啤酒館是旅遊亮點。',
        taboo: '在公共場所大聲喧嘩、無視排隊、對當地啤酒評論過度挑剔會被視為不尊重。',
        festival: '布拉格之春音樂節、啤酒節',
        greeting: 'Ahoj、Děkuji'
    },
    奧地利: {
        flag: '🇦🇹',
        tagline: '古典音樂與阿爾卑斯山景並存的歐洲國家',
        culture: '奧地利文化以音樂、咖啡館與宮廷風華聞名。重視禮節、藝術與傳統節慶。',
        taboo: '在音樂會中講話、對古典文化輕視、在公共場所大聲喧嚷是不禮貌。',
        festival: '維也納新年音樂會、薩爾茲堡音樂節',
        greeting: 'Servus、Danke'
    },
    比利時: {
        flag: '🇧🇪',
        tagline: '巧克力、啤酒與歐洲核心的多語國家',
        culture: '比利時文化融合法語、荷語與德語影響。美食與歐洲政治中心是其特色。',
        taboo: '公開批評語言社群、在公共場合大聲喧嘩、或忽略排隊與禮節會讓人不悅。',
        festival: '布魯塞爾花毯節、啤酒節',
        greeting: 'Bonjour、Hallo、Danke'
    },
    丹麥: {
        flag: '🇩🇰',
        tagline: '幸福與設計並行的北歐王國',
        culture: '丹麥文化重視平等、幸福感與簡約設計。自行車文化與海邊生活是日常特徵。',
        taboo: '在社交場合誇耀、打斷別人說話、忽視環保或公共秩序都不受歡迎。',
        festival: '仲夏節、聖誕市場',
        greeting: 'Hej、Tak'
    },
    匈牙利: {
        flag: '🇭🇺',
        tagline: '溫泉、音樂與中歐歷史交織的國家',
        culture: '匈牙利文化以溫泉、音樂與美食聞名。薰衣草、傳統湯品和歌舞是其特色。',
        taboo: '對歷史與文化話題輕率評論、忽視餐桌禮儀、在公共場所大聲講話都不禮貌。',
        festival: '布達佩斯音樂節、葡萄酒節',
        greeting: 'Szia、Köszönöm'
    },
    烏克蘭: {
        flag: '🇺🇦',
        tagline: '草原與傳統工藝的東歐國家',
        culture: '烏克蘭文化重視傳統音樂、舞蹈與農耕生活。家族與節慶禮儀在日常中很重要。',
        taboo: '對歷史話題無禮評論、忽視傳統服飾、在公共場合大聲喧嘩都不受歡迎。',
        festival: '復活節、獨立日',
        greeting: 'Привіт (Pryvit)、Дякую (Dyakuyu)'
    },
    愛爾蘭: {
        flag: '🇮🇪',
        tagline: '綠色島嶼與愛爾蘭傳統音樂的故鄉',
        culture: '愛爾蘭文化以傳統音樂、詩歌與友善氛圍聞名。酒吧文化與民間故事是生活亮點。',
        taboo: '在酒吧大聲爭辯、對宗教政治敏感話題輕率評論、忽視友善待客都不禮貌。',
        festival: '聖派翠克節、塞爾提克節',
        greeting: 'Hello、Thanks'
    },
    阿聯酋: {
        flag: '🇦🇪',
        tagline: '現代城市與傳統沙漠文化共存的阿拉伯聯邦',
        culture: '阿聯酋文化融合伊斯蘭傳統與全球城市生活。豪華都市與保守習俗並存。',
        taboo: '在公共場合穿著過於暴露、公開飲酒、對宗教發表不敬言論都是禁忌。',
        festival: '齋戒月、國慶日',
        greeting: 'السلام عليكم (As-salamu alaykum)、شكرا (Shukran)'
    },
    卡塔爾: {
        flag: '🇶🇦',
        tagline: '沙漠石油與現代體育盛事交織的國家',
        culture: '卡塔爾文化重視宗教與待客之道。傳統與現代化建設共同描繪國家風貌。',
        taboo: '在公共場所吃喝、穿著不當、對宗教或統治者發表不敬都是大忌。',
        festival: '齋戒月、國慶日',
        greeting: 'السلام عليكم (As-salamu alaykum)、شكرا (Shukran)'
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
const addCountrySection = document.getElementById('add-country-section');
const newCountryNameInput = document.getElementById('new-country-name');
const newCountryTagline = document.getElementById('new-country-tagline');
const newCountryCulture = document.getElementById('new-country-culture');
const newCountryTaboo = document.getElementById('new-country-taboo');
const newCountryFestival = document.getElementById('new-country-festival');
const newCountryGreeting = document.getElementById('new-country-greeting');
const addCountryBtn = document.getElementById('add-country-btn');
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

function showAddCountrySection(name) {
    addCountrySection.classList.remove('hidden');
    newCountryNameInput.value = name;
    newCountryTagline.value = '';
    newCountryCulture.value = '';
    newCountryTaboo.value = '';
    newCountryFestival.value = '';
    newCountryGreeting.value = '';
}

function hideAddCountrySection() {
    addCountrySection.classList.add('hidden');
}

async function saveCountryToBackend(countryData) {
    if (!GAS_WEB_APP_URL) return { success: false, message: '未設定 GAS Web App URL' };

    try {
        const response = await fetch(`${GAS_WEB_APP_URL}?action=save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: new URLSearchParams(countryData)
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}

async function addNewCountry() {
    const countryName = newCountryNameInput.value.trim();
    if (!countryName) {
        setStatus('請先輸入國家名稱。', true);
        return;
    }

    const countryData = {
        flag: '🌍',
        tagline: newCountryTagline.value.trim() || '探索當地文化與禁忌。',
        culture: newCountryCulture.value.trim() || '這個國家的文化資訊尚待補充。',
        taboo: newCountryTaboo.value.trim() || '此國家的禁忌資訊尚待補充。',
        festival: newCountryFestival.value.trim() || '暫無資料。',
        greeting: newCountryGreeting.value.trim() || '暫無資料。'
    };

    countries[countryName] = countryData;
    countryNames = Object.keys(countries);
    renderCountry(countryName);
    hideAddCountrySection();
    setStatus(`已新增「${countryName}」。`);

    if (GAS_WEB_APP_URL) {
        const payload = { country: countryName, ...countryData };
        const result = await saveCountryToBackend(payload);
        if (result.success) {
            setStatus(`已新增「${countryName}」並同步後端。`);
        } else {
            setStatus(`已本機新增「${countryName}」，但同步後端失敗。`, true);
        }
    }
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
        hideAddCountrySection();
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
        showAddCountrySection(name);
        setStatus(`找不到 ${name}，可以填寫下方資料立即新增。`);
        return;
    }

    resultCountry.textContent = name;
    resultTagline.textContent = country.tagline || '探索當地文化與禁忌。';
    countryFlag.textContent = country.flag || '🌍';
    cultureText.textContent = country.culture;
    tabooText.textContent = country.taboo;
    festivalText.textContent = country.festival || '暫無資料。';
    greetingText.textContent = country.greeting || '暫無資料。';
    hideAddCountrySection();
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

addCountryBtn.addEventListener('click', addNewCountry);

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