import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faLinkedin, faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCommentAlt, faEnvelope, faFilePdf, faLink } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import logo1 from '../../assets/logos/facebook.png';
import logo2 from '../../assets/logos/Instagram.png';
import logo3 from '../../assets/logos/twitter.png';
import './style.css';

const contentVariants = {
    hiddenLeft: {
        x: -100,
        opacity: 0
    },
    hiddenRight: {
        x: 100,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1
    }
};

function Qrcode() {
    const predefinedLogos = [
        { name: 'Logo1', src: logo1 },
        { name: 'Logo2', src: logo2 },
        { name: 'Logo3', src: logo3 },
    ];

    const [logo, setLogo] = useState(null); // Logo will be stored as a data URL

    const handleLogoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setLogo(e.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };
    const handleLogoSelection = (src) => {
        setLogo(src); // Set the selected logo
    };
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M'); // Default to medium

    const [showDetails1, setShowDetails1] = useState(false);
    const [showDetails2, setShowDetails2] = useState(false);
    const [removeBackground, setRemoveBackground] = useState(false);

    const handleBackgroundRemovalToggle = (event) => {
        setRemoveBackground(event.target.checked);
    };

    const toggleDetails1 = () => {
        setShowDetails1(!showDetails1);
    };

    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState('#000000'); // Default color value 
    const [gradient, setGradient] = useState('#ffffff'); // Default gradient values

    const toggleDetails2 = () => {
        setShowDetails2(!showDetails2);
    };

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };
    const [showLogoPicker, setShowLogoPicker] = useState(false);

    // Function to toggle the logo picker visibility
    const toggleLogoPicker = () => {
        setShowLogoPicker(!showLogoPicker);
    };
    const [activeInput, setActiveInput] = useState('');

    const showInput = (inputId) => {
        setActiveInput(inputId);
        setShowDetails1(true); // Automatically open the CONTENT section
    };

    const [containerBgColor, setContainerBgColor] = useState('transparent'); // Default to 'transparent' for no background
    const [showColorOptions, setShowColorOptions] = useState(false); // State to toggle color options

    // Predefined background colors
    const backgroundOptions = [
        { label: 'None', value: 'transparent' },
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Purple', value: 'purple' },
        { label: 'black', value: 'black' },
        { label: 'orange', value: 'orange' }
    ];

    const handleColorSelection = (color) => {
        setContainerBgColor(color); // Set background color
        setShowColorOptions(false); // Close color options after selection
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would handle the form data, likely sending it to a server
        console.log('Form submitted with action:', event.target.action);
    };

    const handleReset = () => {
        setLogo(null); // Remove the logo
        setRemoveBackground(false); // Reset the background removal option
        // You may also want to reset other state variables related to QR code generation, if necessary
        setColor('#000000'); // Reset the color to the initial value
        setGradient('#ffffff');
    };

    const [qrValue, setQrValue] = useState('');

    const [emailData, setEmailData] = useState({
        email: '',
        subject: '',
        message: ''
    });
    const [fileType, setFileType] = useState('png');

    const downloadQRCode = () => {
        const qrCodeElement = document.getElementById('qrCodeEl');

        if (fileType === 'svg') {
            // SVG download logic
            if (qrCodeElement && qrCodeElement.tagName === 'svg') {
                const svgData = new XMLSerializer().serializeToString(qrCodeElement);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                saveAs(svgBlob, 'qrcode.svg');
            }
        } else {
            // PNG/JPG download logic
            let canvasElement = qrCodeElement;
            if (qrCodeElement.tagName === 'svg') {
                // If the QR code was rendered as SVG, convert it to a canvas first
                canvasElement = convertSvgToCanvas(qrCodeElement);
            }

            if (canvasElement) {
                const dataUrl = canvasElement.toDataURL(fileType === 'png' ? 'image/png' : 'image/jpeg');
                saveAs(dataUrl, `qrcode.${fileType}`);
            }
        }
    };

    // Function to convert an SVG element to a canvas
    const convertSvgToCanvas = (svgElement) => {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        // This is a synchronous way to convert SVG to canvas, which might not work if images need to be loaded
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        ctx.drawImage(img, 0, 0);

        return canvas;
    };

    // Update handleInputChange to handle email-related changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Handle email-related inputs separately
        if (['email', 'subject', 'message'].includes(name)) {
            setEmailData(prevData => {
                const newEmailData = { ...prevData, [name]: value };
                if (newEmailData.email && newEmailData.subject && newEmailData.message) {
                    setQrValue(`mailto:${encodeURIComponent(newEmailData.email)}?subject=${encodeURIComponent(newEmailData.subject)}&body=${encodeURIComponent(newEmailData.message)}`);
                }
                return newEmailData;
            });
            return;
        }

        let formattedValue = value;

        switch (name) {
            case 'number': // For WhatsApp number
                formattedValue = `https://wa.me/${encodeURIComponent(value)}`;
                break;
            case 'whatsapp-text': // For WhatsApp text
                const number = document.getElementById('whatsapp-number').value; // Ensure 'whatsapp-number' is the correct ID
                formattedValue = `https://wa.me/${encodeURIComponent(number)}?text=${encodeURIComponent(value)}`;
                break;
            case 'number': // Assuming this is the WhatsApp number
                formattedValue = `https://wa.me/${encodeURIComponent(value)}`;
                break;
            case 'email': // Assuming this is the email address
                const mail = document.getElementById('mail').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                formattedValue = `mailto:${mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
                break;
            case 'facebook': // Assuming this is the Facebook URL
                formattedValue = value;
                break;
            case 'insta': // Assuming this is the Instagram user ID
                formattedValue = `https://instagram.com/${encodeURIComponent(value)}`;
                break;
            default:
                formattedValue = value;
                break;
        }

        setQrValue(formattedValue);
    };

    const inputClass = "input-container cursor-pointer  w-full ";
    const hiddenClass = "hidden";

    return (
        <>
            <div className="flex text-white text-xs flex-wrap gap-7 py-10 md:gap-7 md:px-36 md:py-10">
                <button className={`custom-btn ${activeInput === 'url-input' ? 'border-b-2 border-orange-500' : ''} hover:text-sm`} onClick={() => showInput('url-input')}><FontAwesomeIcon icon={faLink} className="fa-lg" style={{ color: "white", marginRight: '5px' }} />URL</button>
                <button className={`custom-btn ${activeInput === 'text-input' ? 'border-b-2 border-orange-500' : ''} hover:text-sm`} onClick={() => showInput('text-input')}><FontAwesomeIcon icon={faCommentAlt} className="fa-lg" style={{ color: "white", marginRight: '5px' }} />TEXT</button>
                <button className={`custom-btn ${activeInput === 'email-input' ? 'border-b-2 border-orange-500' : ''} hover:text-sm`} onClick={() => showInput('email-input')}><FontAwesomeIcon icon={faEnvelope} className="fa-lg" style={{ color: "white", marginRight: '5px' }} />EMAIL</button>
                <button className={`custom-btn ${activeInput === 'whatsapp-inputs' ? 'border-b-2 border-orange-500' : ''} hover:text-sm`} onClick={() => showInput('whatsapp-inputs')}><FontAwesomeIcon icon={faWhatsapp} className="fa-lg" style={{ color: "white", marginRight: '5px' }} />WHATSAPP</button>
                <button className={`custom-btn ${activeInput === 'facebook-input' ? 'border-b-2 border-orange-500' : ''} hover:text-sm`} onClick={() => showInput('facebook-input')}><FontAwesomeIcon icon={faFacebook} className="fa-lg" style={{ color: "white", marginRight: '5px' }} />FACEBOOK</button>
                <button className={`custom-btn ${activeInput === 'twitter-input' ? 'border-b-2 border-orange-500' : ''} hover:text-sm`} onClick={() => showInput('twitter-input')}><FontAwesomeIcon icon={faTwitter} className="fa-lg" style={{ color: "white", marginRight: '5px' }} />TWITTER</button>
                <button className={`custom-btn ${activeInput === 'instagram-input' ? 'border-b-2 border-orange-500' : ''} hover:text-sm`} onClick={() => showInput('instagram-input')}><FontAwesomeIcon icon={faInstagram} className="fa-lg" style={{ color: "white", marginRight: '5px' }} />INSTAGRAM</button>
                <button className={`custom-btn ${activeInput === 'linkedin-input' ? 'border-b-2 border-orange-500' : ''} hover:text-sm`} onClick={() => showInput('linkedin-input')}><FontAwesomeIcon icon={faLinkedin} className="fa-lg" style={{ color: "white", marginRight: '5px' }} />LINKEDIN</button>
                <button className={`custom-btn ${activeInput === 'pdf-input' ? 'border-b-2 border-orange-500' : ''} hover:text-sm`} onClick={() => showInput('pdf-input')}><FontAwesomeIcon icon={faFilePdf} className="fa-lg" style={{ color: "white", marginRight: '5px' }} />PDF</button>
            </div>
            <div className="flex-container flex justify-center h-screen sm:px-32 py-6">
                <div className="container flex w-full bg-white dark:bg-black mx-auto overflow-auto mt-[-45px] flex-col py-8 sm:flex-row">
                    <motion.div
                        className="big-box  p-4 sm:p-8 w-full lg:w-3/5"
                        initial="hiddenLeft"
                        animate="visible"
                        variants={contentVariants}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div>
                            <div className="border bg-white mt-4 shadow-lg">
                                <h2 onClick={toggleDetails1} className="flex justify-between items-center cursor-pointer px-4 py-4 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">Content</span>
                                    <span className="text-lg">{showDetails1 ? '▲' : '▼'}</span>
                                </h2>
                                {showDetails1 && (
                                    <div className="p-4">
                                        {/* URL Input */}
                                        <div className={activeInput === 'url-input' ? inputClass : hiddenClass}>
                                            <label htmlFor="url" className="block text-sm font-medium text-gray-700">Your URL</label>
                                            <input type="text" id="url" name="url" className=" block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" onChange={handleInputChange} />
                                        </div>
                                        {/* Text Input */}
                                        <div className={activeInput === 'text-input' ? inputClass : hiddenClass}>
                                            <label htmlFor="text" className="block text-sm font-medium text-gray-700">Your Text</label>
                                            <input type="text" id="text" name="text" className=" block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" onChange={handleInputChange} />


                                        </div>
                                        {/* Email Input */}
                                        <div className={activeInput === 'email-input' ? inputClass : hiddenClass}>
                                            <label htmlFor="email">Your Email</label>
                                            <input type="email" id="email" name="email" value={emailData.email} onChange={handleInputChange} className="block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" />

                                            <label htmlFor="subject">Subject</label>
                                            <input type="text" id="subject" name="subject" value={emailData.subject} onChange={handleInputChange} className="block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" />

                                            <label htmlFor="message">Message</label>
                                            <textarea id="message" name="message" value={emailData.message} onChange={handleInputChange} className="block h-13 w-full border-2 border-gray-300 rounded-md shadow-sm"></textarea>
                                        </div>

                                        {/* WhatsApp Input */}
                                        <div className={activeInput === 'whatsapp-inputs' ? inputClass : hiddenClass}>
                                            <label htmlFor="whatsapp-number" className="block text-sm font-medium text-gray-700">Number</label>
                                            <input type="text" id="whatsapp-number" name="number" onChange={handleInputChange} className="block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" />

                                            <label htmlFor="whatsapp-text" className="block text-sm font-medium text-gray-700">Your Text</label>
                                            <input type="text" id="whatsapp-text" name="whatsapp-text" onChange={handleInputChange} className="block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" />
                                        </div>
                                        <div className={activeInput === 'facebook-input' ? inputClass : hiddenClass}>
                                            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">facebook Url</label>
                                            <input type="text" id="facebook" name="facebook" className=" block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" onChange={handleInputChange} />
                                        </div>
                                        <div className={activeInput === 'twitter-input' ? inputClass : hiddenClass}>
                                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">twitter name</label>
                                            <input type="text" id="twitter" name="twitter" className=" block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" onChange={handleInputChange} />
                                        </div>
                                        <div className={activeInput === 'instagram-input' ? inputClass : hiddenClass}>
                                            <label htmlFor="insta" className="block text-sm font-medium text-gray-700">insta userid</label>
                                            <input type="text" id="insta" name="insta" className=" block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" onChange={handleInputChange} />
                                        </div>
                                        <div className={activeInput === 'linkedin-input' ? inputClass : hiddenClass}>
                                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">Your Text</label>
                                            <input type="text" id="linkedin" name="linkedin" className=" block h-10 w-full border-2 border-gray-300 rounded-md shadow-sm" onChange={handleInputChange} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* New section */}
                            <div>
                                <div className="border bg-white mt-4 shadow-lg">
                                    <h2 onClick={toggleDetails2} className="flex justify-between items-center cursor-pointer px-4 py-4 hover:bg-gray-100">
                                        <span className="text-xl font-semibold">Customization</span>
                                        <span className="flex items-center space-x-2">
                                            <button onClick={handleReset} className="btn1 text-lg py-2 px-4  text-white rounded transition duration-300 ease-in-out focus:outline-none ">
                                                Reset QR Code
                                            </button>
                                            <span className="text-lg">
                                                {showDetails2 ? '▲' : '▼'}
                                            </span>
                                        </span>
                                    </h2>
                                    {showDetails2 && (
                                        <div className="px-5 py-4">
                                            <div className="flex flex-wrap -m-2">
                                                <div className="p-2">
                                                    <button onClick={toggleColorPicker} className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none">Color</button>
                                                </div>
                                                {showColorPicker && (
                                                    <div className="w-full">
                                                        <div className="mt-4">
                                                            <label className="block mb-2">Foreground Color</label>
                                                            {/* Input field for entering color code */}
                                                            <input
                                                                type="text"
                                                                value={color}
                                                                onChange={e => setColor(e.target.value)}
                                                                className="ml-2 px-3 py-1 border rounded"
                                                                placeholder="Enter color code"
                                                            />
                                                            {/* Color picker */}
                                                            <input
                                                                type="color"
                                                                value={color}
                                                                onChange={e => setColor(e.target.value)}
                                                                className="ml-2 px-3 py-1 rounded"
                                                            />
                                                        </div>
                                                        <div className="mt-4">
                                                            <label className="block mb-2">Gradient Start</label>
                                                            {/* Input field for entering gradient start color code */}
                                                            <input
                                                                type="text"
                                                                value={gradient}
                                                                onChange={e => setGradient(e.target.value)}
                                                                className="ml-2 px-3 py-1 border rounded"
                                                                placeholder="Enter start color code"
                                                            />
                                                            {/* Color picker */}
                                                            <input
                                                                type="color"
                                                                value={gradient}
                                                                onChange={e => setGradient(e.target.value)}
                                                                className="ml-2 px-3 py-1 rounded"
                                                            />
                                                        </div>

                                                    </div>
                                                )}

                                                {/* Add the new Logo button and its toggle functionality */}
                                                <div className="p-2">
                                                    <button onClick={toggleLogoPicker} className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none">Logo</button>
                                                </div>
                                                {showLogoPicker && (
                                                    <div className="w-full">
                                                        <div className='mt-2'>

                                                            <input type="file" accept=".jpg, .jpeg, .png, .svg" onChange={handleLogoChange} />
                                                        </div>
                                                        <div className='mt-2'>

                                                            {predefinedLogos.map((predefinedLogo) => (
                                                                <button key={predefinedLogo.name} onClick={() => handleLogoSelection(predefinedLogo.src)}>
                                                                    <img src={predefinedLogo.src} alt={predefinedLogo.name} style={{ width: '50px', height: '50px' }} />
                                                                </button>

                                                            ))}
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={removeBackground}
                                                                    onChange={handleBackgroundRemovalToggle}
                                                                />
                                                                Remove QR code behind logo
                                                            </label>
                                                        </div>
                                                    </div>
                                                )}





                                                <div className="p-2">
                                                    <button onClick={() => setShowColorOptions(!showColorOptions)} className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none">Template</button>
                                                </div>
                                                {showColorOptions && (
                                                    <div className="w-full">
                                                        <div className="color-options">
                                                            {backgroundOptions.map(({ label, value }) => (
                                                                <button
                                                                    key={label}
                                                                    style={{
                                                                        backgroundColor: value,
                                                                        color: value === 'transparent' ? 'black' : 'white',
                                                                        border: 'none',
                                                                        borderRadius: '4px',
                                                                        cursor: 'pointer',
                                                                        fontWeight: 'bold',
                                                                        margin: '5px',
                                                                        padding: '10px 15px',
                                                                        textTransform: 'uppercase',
                                                                        transition: 'transform 0.1s ease-in-out',
                                                                    }}
                                                                    onClick={() => handleColorSelection(value)} // Call handleColorSelection when a color is clicked
                                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} // Scale up on hover
                                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} // Scale down when not hovered
                                                                >
                                                                    {label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                    )}
                                </div>

                            </div>
                            <div className="mt-4 px-4">
                                <label className="block mb-2 text-lg">Error Correction Level</label>
                                <select
                                    value={errorCorrectionLevel}
                                    onChange={(e) => setErrorCorrectionLevel(e.target.value)}
                                    className=" custom-select ml-2 px-3 py-2 border rounded cursor-pointer bg-white hover:border-gray-300 transition duration-300 ease-in-out"
                                >
                                    <option value="L">Low (L)</option>
                                    <option value="M">Medium (M)</option>
                                    <option value="Q">Quartile (Q)</option>
                                    <option value="H">High (H)</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side box with animation */}
                    <motion.div
                        className="small-box p-4 flex flex-col py-8 w-full lg:w-2/5"
                        initial="hiddenRight"
                        animate="visible"
                        variants={contentVariants}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    >
                        <div className="flex flex-col items-center justify-center">

                            {/* Here we render the QRCode component */}
                            <div className="qr-code-container " style={{ position: 'relative', display: 'inline-block' }}>
                                <div className="hello" style={{ backgroundColor: containerBgColor }}>
                                    <div className="qr-border">
                                        <QRCode
                                            id="qrCodeEl"
                                            value={qrValue}
                                            size={200}
                                            fgColor={color}
                                            bgColor={gradient}
                                            level={errorCorrectionLevel}
                                            renderAs={fileType === 'svg' ? 'svg' : 'canvas'}
                                            imageSettings={
                                                logo ? {
                                                    src: logo,
                                                    x: null,
                                                    y: null,
                                                    height: 30,
                                                    width: 30,
                                                    excavate: removeBackground, // Use the state to determine if we should excavate
                                                } : undefined
                                            }
                                        />
                                    </div>
                                    <div className="scan-me-text">Scan Me</div>
                                </div>

                            </div>

                            {/* File type selection */}
                            <select value={fileType} onChange={(e) => setFileType(e.target.value)} className="custom-select mt-1">
                                <option value="png">PNG</option>
                                <option value="jpg">JPG</option>
                                <option value="svg">SVG</option>
                            </select>

                            {/* Download Button */}
                            <button
                                className=" btn1 mt-6 px-3 bg-gray text-white rounded-md "
                                onClick={downloadQRCode}
                            >
                                Download QR Code
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default Qrcode;
