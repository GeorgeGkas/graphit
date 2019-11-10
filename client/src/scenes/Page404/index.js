import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import boat from './images/boat.svg'
import island from './images/island.svg'

const Page404 = () => (
  <>
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
        <p>The destination does not exist.</p>
        <p>Click on the island to return</p>
      </div>
    </div>
    <p className="credit">
      Page designed by{' '}
      <a
        href="https://codepen.io/andrew-lawendy"
        rel="noreferrer noopener"
        target="_blank"
      >
        Andrew Lawendy
      </a>
      .
    </p>
  </>
)

export default Page404
