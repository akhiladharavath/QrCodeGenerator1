import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './style.css'; // Import your CSS file for styling
import vector from '../../assets/vector.png';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <div className="about-container">
      <style>
        {`
          .about-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem; /* Space between the two flex items */
            padding: 2rem;
          }

          .content, .image-container {
            flex: 1; /* Each flex item will take up half of the container */
          }

          .image-container img {
            width: 100%; /* Image will fill the container */
            height: auto; /* Maintain aspect ratio */
          }
        `}
      </style>
      <motion.div
        className="content"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <h2 className='font-bold text-xl pb-4 text-gray-400'>About</h2>
        <h2 className='text-4xl pb-4'>The Free QR Code Generator for High Quality QR Codes</h2>
        <p>QRCode Monkey is one of the most popular free online qr code generators with millions of already created QR codes. The high resolution of the QR codes and the powerful design options make it one of the best free QR code generators on the web that can be used for commercial and print purposes.</p>
      </motion.div>

      <motion.div
        className="image-container"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <img src={vector} alt="About Us" />
      </motion.div>
    </div>
  );
};

export default About;