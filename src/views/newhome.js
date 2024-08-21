import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'
import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/navbar'
import './newhome.css'
import Footer from './Footer'
import ThreeJSBackground from '../components/ThreeJSBackground'

const NewHome = (props) => {

  const [verified, setVerified] = useState();
  const [verifiedURI, setVerifiedURI] = useState();
  const [verifiedData, setVerifiedData] = useState();

  const Verify = async() => {
    const response = await axios.post('http://localhost:8001/scanQR');
    // console.log(response.data["verified"], response.data["uri"]);
    if(response.data["verified"] == true){
      // const getdata = await getVerificationData(response.data["image"]);
      setVerifiedData(response.data);
      setVerified(response.data["verified"]);
      setVerifiedURI(response.data["tokenId"]);
      console.log(response.data);
    } else{
      setVerified(response.data["verified"]);
    }
  };

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
                  We help users upskill in the right direction
                </h1>
                <span className="home-caption">
                  Issue, Verify, Upskill and get Visibility
                </span>
              </header>
              <div className="home-buttons">
                <div className="home-get-started button">
                  <a className="home-text" href="/multiple">Organization/Admin</a>
                </div>
                <div className="home-get-started button">
                  <a className="home-text" href="/reputation">Users</a>
                </div>
                <div className="home-get-started button">
                  <a className="home-text" href="/chatwithai">Chat With AI</a>
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
              src="https://tse1.mm.bing.net/th?id=OIP.qnHDFJR7ou9kFrqFBPvYJwHaF6&pid=Api"
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
      <button className='home-button6 button' onClick={() => Verify()}>Verify Credentials/Proofs</button>
      {verified!==undefined && <ul className="home-cards">
      {verified==true &&
      <div className="home-card">
          <li className="home-paragraph">The NFT with tokenId: {verifiedURI} is <h3>verified</h3>
          Name: {verifiedData["name"]} <br></br> Description: {verifiedData["description"]} <br></br> TokenId: {verifiedData["tokenId"]}
          <img src={verifiedData["image"]} className="home-image05" ></img>
          </li>
      </div>
      }
      {verified==false &&
      <div className="home-card" style={{width: 700}}>
          <li className="home-paragraph">The NFT with Hash: {verifiedURI} is <h3>NOT Verified</h3>
          </li>
      </div>
      }
      </ul>}
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
        Connecting worlds
      </section>
      <Footer></Footer>
    </div>
  )
}

export default NewHome;
