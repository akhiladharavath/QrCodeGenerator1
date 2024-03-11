import { useState } from 'react';
import { motion } from 'framer-motion';
import DarkModeToggle from '../DarkModeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { Link } from 'react-router-dom';


const navbarVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className=" dark:bg-gray-900 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Company name */}
          <motion.div
            className="text-gray-700 text-white hover:text-gray-900 dark:text-white font-bold text-xl px-24"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <a href="#" >
              <motion.div className='pr-1'
                animate={{ rotate: 360 }}
                transition={{ loop: Infinity, duration: 2, ease: "linear" }}
                style={{ display: 'inline-block' }}
              >
                <FontAwesomeIcon icon={faQrcode} style={{ color: 'white' }} />

              </motion.div>
              <Link to="/signup">
                QRush
              </Link>

            </a>
          </motion.div>
          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900 dark:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Hamburger icon */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}

          <motion.div
            className="hidden sm:flex items-center space-x-4 px-20"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Link to="/" className="py-5 px-2 text-white text-gray-700 hover:text-gray-900 dark:text-white text-sm font-medium" onClick={toggleMobileMenu}>
              Home
            </Link>

            <button onClick={() => { handleLogout() }} className="btn py-2 px-3  text-white rounded-md  ">
              Logout
            </button>
            <DarkModeToggle />
          </motion.div>
        </div>
      </div>


      {/* Mobile menu */}
      <motion.div
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={navbarVariants}
        transition={{ duration: 0.3 }}
        className={`sm:hidden absolute w-full bg-white dark:bg-gray-900 shadow-md`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">

          <Link to="/" className="block px-3 py-2 rounded-md text-orange text-base font-medium text-gray-700 hover:text-gray-900 dark:text-white" onClick={toggleMobileMenu}>
            Home
          </Link>


          <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className=" w-full  text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-white" >
            Logout
          </button>
          {/* You can place the DarkModeToggle here if it needs to be in the mobile menu */}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;