import React from 'react';

const Header = ({ activeSection, handleNavLinkClick, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    return (
        <header className="bg-white shadow-md py-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center space-x-3"> {/* Added div to hold logo and title */}
                  <a href="#home" onClick={() => handleNavLinkClick('home')} className="block">
                  {/* Logo: Ensure logo.jpg is in the public folder */}
                <img src="logo.jpg" alt="Shanvika Infrastructures Logo" className="h-12 md:h-16 w-auto rounded-md" />
                 </a>
                <a href="#home" onClick={() => handleNavLinkClick('home')} className="text-xl md:text-2xl font-bold text-gray-800 hover:text-red-500 transition duration-300">
                  Saravana Infrastructures
                  </a>
                 </div>
                <nav className="hidden md:flex space-x-6">
                    <a href="#home" onClick={() => handleNavLinkClick('home')} className={`nav-link text-gray-700 hover:text-red-500 transition duration-300 ${activeSection === 'home' ? 'font-bold text-red-500' : ''}`}>Home</a>
                    <a href="#about" onClick={() => handleNavLinkClick('about')} className={`nav-link text-gray-700 hover:text-red-500 transition duration-300 ${activeSection === 'about' ? 'font-bold text-red-500' : ''}`}>About Us</a>
                    <a href="#services" onClick={() => handleNavLinkClick('services')} className={`nav-link text-gray-700 hover:text-red-500 transition duration-300 ${activeSection === 'services' ? 'font-bold text-red-500' : ''}`}>Services</a>
                    <a href="#projects" onClick={() => handleNavLinkClick('projects')} className={`nav-link text-gray-700 hover:text-red-500 transition duration-300 ${activeSection === 'projects' ? 'font-bold text-red-500' : ''}`}>Projects</a>
                    <a href="#directors" onClick={() => handleNavLinkClick('directors')} className={`nav-link text-gray-700 hover:text-red-500 transition duration-300 ${activeSection === 'directors' ? 'font-bold text-red-500' : ''}`}>Directors</a>
                    <a href="#contact" onClick={() => handleNavLinkClick('contact')} className={`nav-link text-gray-700 hover:text-red-500 transition duration-300 ${activeSection === 'contact' ? 'font-bold text-red-500' : ''}`}>Contact Us</a>
                </nav>
                <button id="mobile-menu-button" className="md:hidden text-gray-700 focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            <div id="mobile-menu" className={`md:hidden bg-white shadow-lg py-2 mt-2 ${isMobileMenuOpen ? '' : 'hidden'}`}>
                <a href="#home" onClick={() => handleNavLinkClick('home')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</a>
                <a href="#about" onClick={() => handleNavLinkClick('about')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About Us</a>
                <a href="#services" onClick={() => handleNavLinkClick('services')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Services</a>
                <a href="#projects" onClick={() => handleNavLinkClick('projects')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Projects</a>
                <a href="#directors" onClick={() => handleNavLinkClick('directors')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Directors</a>
                <a href="#contact" onClick={() => handleNavLinkClick('contact')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact Us</a>
            </div>
        </header>
    );
};

export default Header;