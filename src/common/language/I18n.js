import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";
import resources from "./Resources";

console.log(resources)
i18n.use(Backend).use(LanguageDetector) //嗅探当前浏览器语言
    .use(initReactI18next)//init i18next
    .init({
        //选择默认语言，选择内容为上述配置中的key，即en/zh
        resources: resources,
        fallbackLng: "zh",
        lng: "zh",
        debug: false,
        // detection: {
        //     caches: ['localStorage', 'sessionStorage', 'cookie'],
        // },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    })

export default i18n
