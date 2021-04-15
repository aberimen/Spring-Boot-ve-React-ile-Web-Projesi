import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';


i18n.use(initReactI18next).init({
    resources:{
        en:{
            translations:{
                'Username' : 'Username',
                'First Name' : 'First Name',
                'Last Name' : 'Last Name',
                'Login' : 'Login',
                'Sign Up': 'Sign Up'

            }
        },
        tr:{
            translations:{
                'Username' : 'Kullanıcı Adı',
                'First Name' : 'Adı',
                'Last Name' : 'Soyadı',
                'Login' : 'Giriş Yap',
                'Sign Up': 'Kayıt Ol'
            }
        }

    },
    fallbackLng:'tr',
    ns:['translations'],
    defaultNS:'translations',
    keySeparator: false,
    interpolation:{
        escapeValue: false,
        formatSeparator:','
    },
    react:{
        wait:true
    }

});

export default i18n;