import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p>© 2025 Shanvika Infrastructures. All rights reserved.</p><p>Designed by Harish Raju, Naga Geethika</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;