import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js';


i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Username': 'Username',
                'First Name': 'First Name',
                'Last Name': 'Last Name',
                'Login': 'Login',
                'Sign Up': 'Sign Up'

            }
        },
        tr: {
            translations: {
                'Username': 'Kullanıcı Adı',
                'First Name': 'Adı',
                'Last Name': 'Soyadı',
                'Login': 'Giriş Yap',
                'Sign Up': 'Kayıt Ol'
            }
        }

    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }

});


const timeagotr = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde'],
    ][index];
}
register('tr', timeagotr);
export default i18n;