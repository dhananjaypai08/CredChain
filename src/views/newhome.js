import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import './newhome.css'

const NewHome = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>CredChain</title>
        <meta property="og:title" content="modern template" />
      </Helmet>
      <Navbar rootClassName="navbar-root-class-name"></Navbar>
      <section className="home-section">
        <div className="home-hero">
          <div className="home-content">
            <main className="home-main">
              <header className="home-header">
                <h1 className="home-heading">
                  Fastest Way to buy Stocks using crypto
                </h1>
                <span className="home-caption">
                  Buy Real world assets using Crypto. Cross-chain support for easy onboarding
                </span>
              </header>
              <div className="home-buttons">
                <div className="home-get-started button">
                  <span className="home-text">Get started</span>
                </div>
                <div className="home-get-started1 button">
                  <span className="home-text01">View features</span>
                </div>
              </div>
            </main>
            <div className="home-highlight">
              <div className="home-avatars">
                {/* <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1552234994-66ba234fd567?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDN8fHBvdHJhaXR8ZW58MHx8fHwxNjY3MjQ0ODcx&amp;ixlib=rb-4.0.3&amp;w=200"
                  className="home-image avatar"
                />
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHBvdHJhaXR8ZW58MHx8fHwxNjY3MjQ0ODcx&amp;ixlib=rb-4.0.3&amp;w=200"
                  className="home-image01 avatar"
                />
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1618151313441-bc79b11e5090?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEzfHxwb3RyYWl0fGVufDB8fHx8MTY2NzI0NDg3MQ&amp;ixlib=rb-4.0.3&amp;w=200"
                  className="home-image02 avatar"
                /> */}
              </div>
              {/* <label className="home-caption1">
                Loved by 10,000+ people like you.
              </label> */}
            </div>
          </div>
          <div className="home-image03">
            <img
              alt="image"
              src="https://tse1.mm.bing.net/th?id=OIP.GlXB41c8vHCJEAWbhq7rYwHaEK&pid=Api"
              className="home-image04"
            />
          </div>
          <div className="home-image05">
            {/* <img
              alt="image"
              src="/SectionImages/heroimage-1500h.png"
              className="home-image06"
            /> */}
          </div>
        </div>
      </section>
      <section>
        
      </section>
      <section>
        
        <section>
          
          
        </section>
        <section>
          
          
        </section>
      </section>
      <section>
        
      </section>
      <section>
        
      </section>
      <section >
        
      </section>
      <section>
        
        {/* <main className="home-pricing">
          
          
        </main> */}
      </section>
      <section >
        
       
      </section>
      <section>
        
      </section>
      
      <section className="home-section18">
        <main className="home-content5">
          
        </main>
      </section>
      <footer className="home-footer">
        <div className="home-content6">
          <main className="home-main-content">
            <div className="home-content7">
              <header className="home-main4">
                <div className="home-header14">
                  {/* <img
                    alt="image"
                    src="/Branding/planical7012-ttpb.svg"
                    className="home-branding"
                  /> */}
                  <span className="home-text41">
                    CredChain
                  </span>
                  <span className="home-text42">
                    Unified platform for buying and digitizing real world assets
                  </span>
                </div>
                <div className="home-socials">
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="home-link"
                  >
                    <img
                      alt="image"
                      src="/Icons/linkedin-200h.png"
                      className="social"
                    />
                  </a>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="home-link1"
                  >
                    <img
                      alt="image"
                      src="/Icons/instagram-200h.png"
                      className="social"
                    />
                  </a>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="home-link2"
                  >
                    <img
                      alt="image"
                      src="/Icons/twitter-200h.png"
                      className="social"
                    />
                  </a>
                </div>
              </header>
              <header className="home-categories">
                <div className="home-category">
                  <div className="home-header15">
                    <span className="footer-header">Solutions</span>
                  </div>
                  <div className="home-links">
                    <span className="footer-link">Swap Tokens</span>
                    <span className="footer-link">Buy stocks</span>
                  </div>
                </div>
                <div className="home-category1">
                  <div className="home-header16">
                    <span className="footer-header">Company</span>
                  </div>
                  <div className="home-links1">
                    <span className="footer-link">About</span>
                  </div>
                </div>
              </header>
            </div>
            <section className="home-copyright">
              <span className="home-text56">
              © 2024 CredChain. All Rights Reserved.
              </span>
            </section>
          </main>
          
          <section className="home-copyright1">
            <span className="home-text61">
              © 2024 CredChain. All Rights Reserved.
            </span>
          </section>
        </div>
      </footer>
      <div>
        <div className="home-container5">
          <Script
            html={`<script>
    /*
Accordion - Code Embed
*/

/* listenForUrlChangesAccordion() makes sure that if you changes pages inside your app,
the Accordions will still work*/

const listenForUrlChangesAccordion = () => {
      let url = location.href;
      document.body.addEventListener(
        "click",
        () => {
          requestAnimationFrame(() => {
            if (url !== location.href) {
              runAccordionCodeEmbed();
              url = location.href;
            }
          });
        },
        true
      );
    };


const runAccordionCodeEmbed = () => {
    const accordionContainers = document.querySelectorAll('[data-role="accordion-container"]'); // All accordion containers
    const accordionContents = document.querySelectorAll('[data-role="accordion-content"]'); // All accordion content
    const accordionIcons = document.querySelectorAll('[data-role="accordion-icon"]'); // All accordion icons

    accordionContents.forEach((accordionContent) => {
        accordionContent.style.display = "none"; //Hides all accordion contents
    });

    accordionContainers.forEach((accordionContainer, index) => {
        accordionContainer.addEventListener("click", () => {
            accordionContents.forEach((accordionContent) => {
            accordionContent.style.display = "none"; //Hides all accordion contents
            });

            accordionIcons.forEach((accordionIcon) => {
                accordionIcon.style.transform = "rotate(0deg)"; // Resets all icon transforms to 0deg (default)
            });

            accordionContents[index].style.display = "flex"; // Shows accordion content
            accordionIcons[index].style.transform = "rotate(180deg)"; // Rotates accordion icon 180deg
        });
    });
}

runAccordionCodeEmbed()
listenForUrlChangesAccordion()

/*
Here's what the above is doing:
    1. Selects all accordion containers, contents, and icons
    2. Hides all accordion contents
    3. Adds an event listener to each accordion container
    4. When an accordion container is clicked, it:
        - Hides all accordion contents
        - Resets all icon transforms to 0deg (default)
        - Checks if this container has class "accordion-open"
            - If it does, it removes class "accordion-open"
            - If it doesn't, it:
                - Removes class "accordion-open" from all containers
                - Adds class "accordion-open" to this container
                - Shows accordion content
                - Rotates accordion icon 180deg
*/
</script>`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

export default NewHome;
