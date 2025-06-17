import React from 'react';

const Home = () => {
    return (
        <section
            id="home"
            className="relative bg-cover bg-center h-screen flex items-center justify-center text-white"
            style={{ backgroundImage: `url('home-bg.jpg')` }} // Updated background image
        >
            {/* Overlay to make text readable */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content */}
            <div className="z-10 text-center p-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Building Dreams, Creating Legacies</h1>
                <p className="text-lg md:text-xl mb-8 animate-fade-in-up delay-200">Your trusted partner in construction and infrastructure development.</p>
                <a
                    href="#contact" // Link to the contact section
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 animate-fade-in-up delay-400"
                >
                    Approach Us
                </a> {/* Updated button text */}
            </div>
        </section>
    );
};

export default Home;