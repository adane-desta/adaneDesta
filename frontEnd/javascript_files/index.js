const translations = {
    en: {
        title: "Welcome to the Animal Health Advisory System",
        subtitle: "Your trusted platform for better animal health and care",
        features: [
            { title: "For Farmers", description: "Get expert advice to keep your livestock healthy and productive." },
            { title: "For Veterinarians", description: "Collaborate with farmers and share your expertise to improve animal care." },
            { title: "Resources", description: "Access a wealth of knowledge, articles, and guides tailored to animal health." },
            { title: "Appointments", description: "Schedule and manage appointments efficiently through our platform." },
            { title: "News and Updates", description: "Stay informed with the latest trends and news in animal health." },
            { title: "Ask Questions", description: "Post your questions and get answers from veterinary experts." },
        ],
        login: "Login",
        joinUs: "Join Us",
        footer: "&copy; 2025 Animal Health Advisory System. All Rights Reserved."
    },
    am: {
        title: "እንኳን ወደ እንስሳት ጤና አማካሪ ስርዓት በሰላም መጡ",
        subtitle: "የተአምነት መድረክዎ ለምርጥ እንስሳት ጤና እና እንክብካቤ",
        features: [
            { title: "ለገበያኖች", description: "እንስሳትዎን ጤናማ እና ምርታማ እንዲሆኑ የተሟላ ምክር ያግኙ።" },
            { title: "ለእንስሳት ሀኪሞች", description: "ከገበያኖች ጋር በመስራት ዕውቀትዎን ማካፈል በማብራር እንስሳትን ይሻሻሉ።" },
            { title: "ምንጮች", description: "በእንስሳት ጤና ላይ የተሰማራ እውቀት፣ ጽሑፎች፣ እና መመሪያዎችን ያግኙ።" },
            { title: "ቀጠሮዎች", description: "በመድረክው ቀጠሮዎችን በቀላሉ ያስተካክሉ።" },
            { title: "ዜና እና መረጃዎች", description: "በእንስሳት ጤና ላይ የአዲስ ትኩረት ዜና እና ተግባራትን ይከታተሉ።" },
            { title: "ጥያቄ ይጠይቁ", description: "ጥያቄዎችን ያቅርቡ እና ከእንስሳት ባለሙያዎች አንደበት መልስ ይገኛሉ።" },
        ],
        login: "መግቢያ",
        joinUs: "አባል ይሁኑ",
        footer: "&copy; 2025 እንስሳት ጤና አማካሪ ስርዓት። መብቱ በተጠበቀ ነው።"
    },
    or: {
        title: "Baga Nagaan Dhuftan Gara Sirna Gorsa Fayyaa Horii",
        subtitle: "Wiirtuu Dinqisiisoo Gorsa Fayyaa Horiif Amanamaa",
        features: [
            { title: "Farmaa’otaaf", description: "Gorsa ogeessota irraa argachuun horii keesaan fayyaa qabaachisuun ni danda’ama." },
            { title: "Ogeessota Fayyaa Horii", description: "Ogeessota waliin hojii waloon taasifachuun gosa gargaarsa fayyaa fooyyessuuf tumsaa." },
            { title: "Qabeenyaa", description: "Wabiiwwan, barruulee fi kitaabaaleen fayyaa horii irratti xiyyeeffatanitti fayyadamuu." },
            { title: "Waamicha", description: "Tajaajilaafi yeroo waamicha ofumaan to’achaa." },
            { title: "Oduuwwanifi Odeeffannoo", description: "Oduuwwan yeroo ammaa tamsa’an waliin walbaruu." },
            { title: "Gaaffii kaasuuf", description: "Gaaffii keesaan dhiyeeffachuun deebii ogeessotaa argachuuf." },
        ],
        login: "Galmaa’i",
        joinUs: "Hirmaadhu",
        footer: "&copy; 2025 Sirna Gorsa Fayyaa Horii. Mirga Hunda Ni Eegama."
    }
};

const languageSelector = document.getElementById("language-selector");

languageSelector.addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    const content = translations[selectedLang];

    document.querySelector("header h1").textContent = content.title;
    document.querySelector("header p").textContent = content.subtitle;

    const features = document.querySelectorAll(".feature-card");
    content.features.forEach((feature, index) => {
        features[index].querySelector("h3").textContent = feature.title;
        features[index].querySelector("p").textContent = feature.description;
    });

    const buttons = document.querySelector(".buttons").children;
    buttons[0].textContent = content.login;
    buttons[1].textContent = content.joinUs;

    document.querySelector("footer p").innerHTML = content.footer;
});
