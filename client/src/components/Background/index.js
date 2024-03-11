import React from 'react'
import './style.css';
import Qrcode from '../Qrcode';
import Navbar from '../Navbar';
import Flex from '../Flex';
import About from '../About';
import Footer from '../Footer';

function index() {
  return (
    <>
        <div className="page-container">
        <div className="wrapper">
        <h2 className='te'>   </h2>
        <Navbar />
        <Qrcode />
        <div>
        <Flex />
        </div>
        <About />
        <Footer />
        <div className='box'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div> 
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    </div>
    </div>
   
    </>
      )
}

export default index