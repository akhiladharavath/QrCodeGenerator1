import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './style.css'; // Import your CSS file for styling
import step from '../../assets/step-1.PNG';
import step2 from '../../assets/step-2.png';
import step3 from '../../assets/step-3.png';


const Flex = () => {

    const controls = useAnimation(); // Controls to start the animation
    const [ref, inView] = useInView({ // ref is a reference to the element, inView is a boolean
      triggerOnce: true, // The animation will only trigger once
      threshold: 0.2, // The element is considered in view when 20% of it is visible
    });
  
    // Start the animation when the element comes into view
    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);
  
    const variants = {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    };

  return (
    <div className='ohh'>
        
        <p className='hr py-12'>
            How to a make QR Code
        </p>
    <div className="container py-12 ">
        
      {/* Flex box 1 */}
      <br/><br/>
      <motion.div 
          className="flex-box"
          ref={ref} // Attach the ref from useInView to the element
          initial="hidden" // Initial state
          animate={controls} // Use the animation controls
          transition={{ duration: 1, ease: "easeOut" }} // Set the duration of the animation
          variants={variants} // Variants for the animation states
        >
        <img src={step} alt="Image 1" className="image" />
        <div className="text-content">
            <p className='ma py-6' >Step-1  Create </p>
           
            <p className='yat py-2'>Create a free QR Code on our QR Code generator by entering the URL or link of the content of your choice. To generate a dynamic QR Code, log in to our QR Code maker, select QR Code type and enter the URL.</p>
            </div>
      </motion.div>

      {/* Flex box 2 */}
      <motion.div 
          className="flex-box"
          ref={ref} // Attach the ref from useInView to the element
          initial="hidden" // Initial state
          animate={controls} // Use the animation controls
          transition={{ duration: 1, ease: "easeOut" }} // Set the duration of the animation
          variants={variants} // Variants for the animation states
        >
        <img src={step2} alt="Image 2" className="image" />
        <div className="text-content"> 
        <p className='ma py-6' >Step-2  Customize </p>
           
           <p className='yat py-2'>Design the QR Code color, shape, and background. Create a branded QR Code by adding a logo, and add a QR Code frame and CTA. Your custom QR Code is ready to download.</p>
           </div>
      </motion.div>

      {/* Flex box 3 */}
      <motion.div 
          className="flex-box"
          ref={ref} // Attach the ref from useInView to the element
          initial="hidden" // Initial state
          animate={controls} // Use the animation controls
          transition={{ duration: 1, ease: "easeOut" }} // Set the duration of the animation
          variants={variants} // Variants for the animation states
        >
        <img src={step3} alt="Image 3" className="image" />
        <div className="text-content">
        <p className='ma py-6' >Step-3  Download </p>
           
           <p className='yat py-2'>Test your QR Code before deploying and download it in the required format. For resizing, we recommend using high-resolution QR Code formats (.svg, png .eps.). Download and get started with your QR Code campaign.</p>
           
            </div>
      </motion.div>
    </div>
    </div>
  );
};

export default Flex;
