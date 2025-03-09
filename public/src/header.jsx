import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import '/stylesheet_files/headerstyle.css';

const translations = {
    en: {
        home: "Home",
        about: "About",
        news: "News & Events",
        resources: "Resources",
        consultVet: "Consult Vet",
        joinUs: "Join Us",
        chatbot: "Chatbot",
        chooseLanguage: "Choose Language: "
    },
    am: {
        home: "መነሻ ገጽ",
        about: "ስለእኛ",
        news: "ተዛማጅ ክስተቶች",
        resources: "የመረጃ ምንጮች",
        consultVet: "የባለሙያ ምክር ያግኙ",
        joinUs: "እኛን ይቀላቀሉን",
        chatbot: "ቻትቦት",
        chooseLanguage: "ቋንቋ ይምረጡ: "
    },
    or: {
        home: "fuula dura",
        about: "waa'ee keenya",
        news: "oduu haaraa",
        resources: "Qabeenya fayyaa",
        consultVet: "Dooktor waliin mari'achuu",
        joinUs: "Nuti waliin hidhadhu",
        chatbot: "Chatbot",
        chooseLanguage: "Afaan Filadhu: "
    }
};

function Header() {
    const [language, setLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage in translations ? storedLanguage : 'en';
    });

    const translation = translations[language] || translations.en; 
    const { home, about, news, resources, consultVet, joinUs, chatbot, chooseLanguage } = translation;

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    return (
        <nav className="nav">
            <div className="language-toggle">
                <label htmlFor="language">{chooseLanguage}</label>
                <select
                    id="language"
                    name="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="am">Amharic</option>
                    <option value="or">Afaan Oromo</option>
                </select>
            </div>
            <ul>
                <li><a id="mine" href="/html-files/homePage.html">{home}</a></li>
                <li><a id="ninkeDafira" href="/html-files/aboutPage.html">{about}</a></li>
                <li><a id="odoo" href="/html-files/news_and_event.html">{news}</a></li>
                <li><a id="bue" href="/html-files/resources.html">{resources}</a></li>
                <li><a id="sejo" href="/html-files/consult_vet.html">{consultVet}</a></li>
                <li><a id="miloma" href="/html-files/join-us.html">{joinUs}</a></li>
                
            </ul>
        </nav>
    );
}

createRoot(document.getElementById("navbar")).render(
    <StrictMode>
        <Header />
    </StrictMode>
);
