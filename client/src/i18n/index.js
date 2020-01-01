import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

export default function setup() {
  return i18n
    .use(XHR)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      debug: true,
      fallbackLng: 'en',
      lng: 'en',
    })
}
