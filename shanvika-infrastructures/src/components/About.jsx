import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">About Saravana Infrastructures</h2>
                <div className="flex flex-col md:flex-row items-center md:space-x-8">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <img src="about-us.jpg" alt="About Us" className="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-lg leading-relaxed mb-4">
                            Saravana Infrastructures is a leading construction and infrastructure development company dedicated to delivering excellence in every project. With years of experience, we specialize in a wide range of services including civil works, interior design, renovation, and project management.
                        </p>
                        <p className="text-lg leading-relaxed mb-4">
                            Our commitment to quality, timely delivery, and customer satisfaction sets us apart. We believe in building strong relationships with our clients by understanding their needs and exceeding their expectations. Our team of skilled professionals ensures that every project is executed with precision and integrity.
                        </p>
                        <p className="text-lg leading-relaxed">
                            At Saravana Infrastructures, we are not just building structures; we are building dreams and creating lasting legacies for our clients and the community.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;