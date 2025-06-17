import React from 'react';

const Projects = () => {
    const projectsData = [
        {
            name: 'Indravati',
            location: 'Amaravati, Visadala',
            description: 'Indravati is a serene residential project located in the promising region of Amaravati, offering modern amenities and a peaceful living environment.',
            googleMapsLink: 'https://maps.app.goo.gl/V1DyA9mYE727QzX5A?g_st=com.google.maps.preview.copy',
            image: 'Indrravati.webp' // Adjusted image path
        },
        {
            name: 'T Nagar',
            location: 'Nandigama',
            description: 'T Nagar in Nandigama is a well-planned commercial and residential complex designed for convenience and accessibility, ideal for businesses and families alike.',
            googleMapsLink: 'https://maps.app.goo.gl/ssps8xFbnBULcCD26',
            image: 'T - Nagar.webp' // Adjusted image path
        },
        {
            name: 'Port Palace',
            location: 'Machilipatnam',
            description: 'Port Palace in Machilipatnam is a luxurious development offering stunning views and premium facilities, perfect for those seeking an elevated lifestyle near the coast.',
            googleMapsLink: 'https://maps.app.goo.gl/kkbfiBECAScp1TjUA',
            image: 'Port.jpeg' // Adjusted image path
        },
        {
            name: 'Cyber City',
            location: 'Gannavaram, Kodurupadu',
            description: 'Cyber City in Gannavaram, Kodurupadu, is a futuristic IT and residential hub, designed to foster innovation and provide a dynamic living experience for professionals.',
            googleMapsLink: 'https://maps.app.goo.gl/E3bAixqhe5oNEnv59',
            image: 'Cyber City.jpg' // Adjusted image path
        },
        {
            name: 'Tenali',
            location: 'Tenali',
            description: 'The Tenali project focuses on creating vibrant community spaces and comfortable homes, blending modern design with the rich cultural heritage of the region.',
            googleMapsLink: 'https://maps.app.goo.gl/7HBu22kD57s6zHHVA?g_st=com.google.maps.preview.copy',
            image: 'Residency.jpg' // Adjusted image path
        },
        {
            name: 'Chandanavanam',
            location: 'Chinnariklatla',
            description: 'Chandanavanam is a thoughtfully designed project in Chinnariklatla, offering serene plots and homes amidst a green environment, ideal for peaceful living.',
            googleMapsLink: 'https://maps.app.goo.gl/VjxxZRCf6AGLYoWc8?g_st=com.google.maps.preview.copy',
            image: 'Chandanavanam.jpg' // Adjusted image path
        },
        {
            name: 'Tadepalli',
            location: 'Tadepalli',
            description: 'The Tadepalli project offers strategic location and modern amenities, providing residents with convenient access to urban centers while maintaining a peaceful ambiance.',
            googleMapsLink: 'https://maps.app.goo.gl/8NMsELFEcjyEv1Ls5?g_st=com.google.maps.preview.copy',
            image: 'house.jpg' // Adjusted image path
        },
    ];

    return (
        <section id="projects" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-10 text-red-600">Our Saravana Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden project-card">
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">Location: {project.location}</p>
                                <p className="text-gray-700 text-sm mb-4">{project.description}</p>
                                {project.googleMapsLink && (
                                    <a
                                        href={project.googleMapsLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        
                                    >
                                        <p className="text-sm text-red-600 font-bold ">
                                           View on Map
                                          </p>
                                       
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;