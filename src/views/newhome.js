import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import './newhome.css'
import Footer from './Footer'
import ThreeJSBackground from '../components/ThreeJSBackground'

const NewHome = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>CredChain</title>
        <meta property="og:title" content="modern template" />
      </Helmet>
      <ThreeJSBackground />
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
      <Footer></Footer>
      <div>
        
      </div>
    </div>
  )
}

export default NewHome;
