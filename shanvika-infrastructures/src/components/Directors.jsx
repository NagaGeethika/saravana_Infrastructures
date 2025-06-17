import React from 'react';

const Directors = () => {
    return (
        <section id="directors" className="py-16 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                <h2 className="text-4xl font-bold mb-10 text-gray-900">Our Directors</h2>

                {/* Director's Photo */}
                <div className="mb-8 flex justify-center"> {/* Centering container for the image */}
                    <img
                        src="chairman.jpeg" // Path to the image in the public folder
                        alt="Mrs. O. Rajeswari - Director"
                        className="w-48 h-48 object-cover-full shadow-lg border-4 border-white" // Styling for the image
                    />
                </div>

                {/* Director's Quote */}
                <blockquote className="text-2xl md:text-3xl font-semibold italic text-gray-800 mb-6 leading-relaxed">
                    “We don’t just sell properties — we help you find places to live, grow, and invest in your future.”
                </blockquote>

                {/* Director's Name and Title */}
                <p className="text-xl text-red-600 font-bold">
                   G.N Ravi Chandra Kumar
                </p>
                <p className="text-lg text-gray-700">
                    Chairman & Managing Director
                </p>
            </div>
        </section>
    );
};

export default Directors;