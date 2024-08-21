import React from 'react'

import Script from 'dangerous-html/react'
import PropTypes from 'prop-types'

import './navbar.css'


const Navbar = (props) => {
  return (
    <header className={`${props.rootClassName} home-navbar`}>
      {/* <img
        alt="Planical7012"
        src={props.brandingLogo}
        className="navbar-branding-logo"
      /> */}
      <a className="navbar-text1 home-button2 button-clean button" href="/">CredChain</a>
      <div className="navbar-nav-content">
        <div className="navbar-nav-links">
          <a className="navbar-text home-button2 button-clean button" href="/portfolio">Portfolio</a>
          <a className="navbar-text home-button2 button-clean button" href="/multiple">Multiple Issuance</a>
          <a className="navbar-text home-button2 button-clean button" href="/reputation">Reputation</a>
          <a className="navbar-text home-button2 button-clean button" href="/jobsavailable">Credentials Index</a>
        </div>
        
        <div id="open-mobile-menu" className="navbar-hamburger get-started">
          <img
            alt={props.imageAlt}
            src={props.imageSrc}
            className="navbar-image"
          />
        </div>
      </div>
      <div id="mobile-menu" className="navbar-mobile-menu">
        <div className="navbar-branding">
          <img
            alt={props.imageAlt1}
            src={props.imageSrc1}
            className="navbar-image1"
          />
          <div id="close-mobile-menu" className="navbar-container">
            
          </div>
        </div>
        <div className="navbar-nav-links1">
          <span href="/" className="nav-link">Home</span>
          <span className="nav-link">Contact</span>
        </div>
        <div className="get-started">
          <span className="navbar-text1">Get started</span>
        </div>
      </div>
      <div className="">
        <div className="navbar-container2">
          <Script
            html={`<script defer>
    /*
Mobile menu - Code Embed
*/

/* listenForUrlChangesMobileMenu() makes sure that if you changes pages inside your app, 
the mobile menu will still work*/

const listenForUrlChangesMobileMenu = () => {
    let url = location.href;
    document.body.addEventListener("click", () => {
        requestAnimationFrame(() => {
            if (url !== location.href) {
                runMobileMenuCodeEmbed();
                url = location.href;
            }
        });
    },
    true
    );
};

const runMobileMenuCodeEmbed = () => {
    // Mobile menu
    const mobileMenu = document.querySelector("#mobile-menu")

    // Buttons
    const closeButton = document.querySelector("#close-mobile-menu")
    const openButton = document.querySelector("#open-mobile-menu")

    // On openButton click, set the mobileMenu position left to -100vw
    openButton && openButton.addEventListener("click", function() {
        mobileMenu.style.transform = "translateX(0%)"
    })

    // On closeButton click, set the mobileMenu position to 0vw
    closeButton && closeButton.addEventListener("click", function() {
        mobileMenu.style.transform = "translateX(100%)"
    })
}

runMobileMenuCodeEmbed()
listenForUrlChangesMobileMenu()
</script>`}
            className=""
          ></Script>
        </div>
      </div>
    </header>
  )
}

Navbar.defaultProps = {
  imageAlt: 'image',
  imageSrc1: '/Branding/planical7012-ttpb.svg',
  imageSrc: '/Icons/hamburger-200h.png',
  imageAlt1: 'image',
  rootClassName: '',
  // brandingLogo: '/Branding/planical7012-wzf.svg',
}

Navbar.propTypes = {
  imageAlt: PropTypes.string,
  imageSrc1: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt1: PropTypes.string,
  rootClassName: PropTypes.string,
  // brandingLogo: PropTypes.string,
}

export default Navbar
