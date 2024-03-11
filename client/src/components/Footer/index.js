import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import './style.css'; // Make sure to import the CSS file for your styles

const Footer = () => {
  // Define the animation variants
  const variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Create animation controls and refs for the "Get in Touch" section
  const controlsGetInTouch = useAnimation();
  const [refGetInTouch, inViewGetInTouch] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Create animation controls and refs for the "Download" section
  const controlsDownload = useAnimation();
  const [refDownload, inViewDownload] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Create animation controls and refs for the "Help" section
  const controlsHelp = useAnimation();
  const [refHelp, inViewHelp] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Create animation controls and refs for the "Follow Us" section
  const controlsFollowUs = useAnimation();
  const [refFollowUs, inViewFollowUs] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Start the animations when the elements come into view
  useEffect(() => {
    if (inViewGetInTouch) controlsGetInTouch.start('visible');
    if (inViewDownload) controlsDownload.start('visible');
    if (inViewHelp) controlsHelp.start('visible');
    if (inViewFollowUs) controlsFollowUs.start('visible');
  }, [controlsGetInTouch, inViewGetInTouch, controlsDownload, inViewDownload, controlsHelp, inViewHelp, controlsFollowUs, inViewFollowUs]);

  return (
    <footer className="bg-black text-white p-6 relative">
      <div className="flex flex-wrap justify-between items-start space-x-4">
        {/* Get in Touch */}
        <motion.div
          className="flex-1 bg-black text-white"
          ref={refGetInTouch}
          initial="hidden"
          animate={controlsGetInTouch}
          variants={variants}
        >
          {/* ... Get in Touch content ... */}
          <h5 className="text-lg font-bold mb-3">Get in Touch</h5>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className=" px-4 py-2 border rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className=" bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </form>
        </motion.div>

        {/* Download */}
        <motion.div
          className="flex-1"
          ref={refDownload}
          initial="hidden"
          animate={controlsDownload}
          variants={variants}
        >
          {/* ... Download content ... */}
          <h5 className="text-lg font-bold mb-3">Download</h5>
                        <p>Desktop App</p>
                        <p>Mobile App</p>
        </motion.div>

        {/* Help */}
        <motion.div
          className="flex-1"
          ref={refHelp}
          initial="hidden"
          animate={controlsHelp}
          variants={variants}
        >
          {/* ... Help content ... */}
          <h5 className="text-lg font-bold mb-3">Help</h5>
          <p>FAQ</p>
                        <p>Documentation</p>
                        <p>Reporting</p>
        </motion.div>

        {/* Follow Us */}
        <motion.div
  className="flex-1"
  ref={refFollowUs}
  initial="hidden"
  animate={controlsFollowUs}
  variants={variants}
>
  <h5 className="text-lg font-bold mb-3">Team Solution</h5>
  <div className="flex space-x-2">
    {/* Instagram Icon */}
    <a href="https://www.instagram.com" className="bg-white rounded-full p-2 hover:scale-110 transition-transform duration-300">
      <FaInstagram color='black' />
    </a>
    {/* Facebook Icon */}
    <a href="https://www.facebook.com" className="bg-white rounded-full p-2 hover:scale-110 transition-transform duration-300">
      <FaFacebookF color='black' />
    </a>
    {/* Twitter Icon */}
    <a href="https://www.twitter.com" className="bg-white rounded-full p-2 hover:scale-110 transition-transform duration-300">
      <FaTwitter  color='black'/>
    </a>
    {/* LinkedIn Icon */}
    <a href="https://www.linkedin.com" className="bg-gray-300 rounded-full p-2 hover:scale-110 transition-transform duration-300">
      <FaLinkedinIn color='black' />
    </a>
  </div>
</motion.div>
      </div>

      {/* Blue box with clip-path shape */}
      <div className="blue-box"></div>
    </footer>
  );
};

export default Footer;