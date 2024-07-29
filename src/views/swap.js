import Navbar from '../components/navbar';
import { useState } from 'react';
import axios from 'axios';



const Swap = () => {
    const [srcAsset, setSrcAsset] = useState("USDC");
    const [srcChain, setSrcChain] = useState("Ethereum");
    const [amount, setAmount] = useState(0);

    const getData = async() => {
      let amount = 10;
      const formData = {
        srcAsset: "USDC",
        srcChain: "Ethereum",
        amount: amount.toString(), // Ensure amount is a string
        destAddress: "0xFFc206f3779CdeBc242220Af294c336a00AD4C5C",
      };

      const response = await axios.get('http://127.0.0.1:3001/');
      console.log(response);
    }
    getData();
    return (
        <div className="home-container">
        <Navbar rootClassName="navbar-root-class-name"></Navbar>
        <section className="home-section">
        <main className="home-main">
              <header className="home-header">
                <p className="home-heading">
                  Swap any 2 assets
                </p>
              </header>
              
            </main>
        </section>
        </div>

    );
}

export default Swap;