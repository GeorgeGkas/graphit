import './styles.css'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import boat from './images/boat.svg'
import island from './images/island.svg'

const Page404 = () => {
  const { t } = useTranslation()

  if (window.location.pathname === '/dashboard/projects') {
    return <></>
  } else if (
    window.location.pathname
      .slice(1)
      .split('/')
      .shift() !== 'app' &&
    window.location.pathname
      .slice(1)
      .split('/')
      .shift() !== 'dashboard'
  ) {
    /**
     * Use browsers' built-in History API to update
     * the unreachable root level URL with /404 .
     */
    // eslint-disable-next-line no-restricted-globals
    history.replaceState({}, '', '/404')

    return (
      <div className="not-found parallax">
        <div className="wave-7" />
        <div className="wave-6" />
        <Link className="wave-island" to="/">
          <img alt="Island" src={island} />
        </Link>
        <div className="wave-5" />
        <div className="wave-lost wrp">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
        <div className="wave-4" />
        <div className="wave-boat">
          <img alt="Boat" className="boat" src={boat} />
        </div>
        <div className="wave-3" />
        <div className="wave-2" />
        <div className="wave-1" />
        <div className="wave-message">
          <p>{t('404.not_exist')}</p>
          <p>{t('404.return_action')}</p>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

export default Page404
