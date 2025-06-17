import React from 'react';

const Services = () => {
    const servicesData = [
        { name: 'Civil Works', description: 'Expertise in all types of civil construction, from foundations to finishing.', icon: (
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 10h.01M15 10h.01M9 14h.01M15 14h.01m-5 4h.01M12 14h.01m-3 4h.01"></path></svg>
        )},
        { name: 'Interior Works', description: 'Innovative and functional interior designs for residential and commercial spaces.', icon: (
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        )},
        { name: 'Renovation Works', description: 'Transforming existing spaces with modern designs and functional upgrades.', icon: (
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020 14c0 1.577-.457 3.077-1.256 4.356m-1.414-1.414A5.999 5.999 0 0112 21c-2.648 0-5.07-1.184-6.708-3.088L4 17m7-13v5h.582m15.356 2A8.001 8.001 0 0020 14c0 1.577-.457 3.077-1.256 4.356m-1.414-1.414A5.999 5.999 0 0112 21c-2.648 0-5.07-1.184-6.708-3.088L4 17m7-13v5h.582m15.356 2A8.001 8.001 0 0020 14c0 1.577-.457 3.077-1.256 4.356m-1.414-1.414A5.999 5.999 0 0112 21c-2.648 0-5.07-1.184-6.708-3.088L4 17"></path></svg>
        )},
        { name: 'Architectural Works', description: 'Conceptualizing and designing aesthetically pleasing and structurally sound buildings.', icon: (
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"></path></svg>
        )},
        { name: 'Building Maintenance', description: 'Comprehensive maintenance services to ensure the longevity of your property.', icon: (
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        )},
        { name: 'Project Management', description: 'Efficient project oversight from planning to execution, ensuring on-time and on-budget delivery.', icon: (
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
        )},
    ];

    return (
        <section id="services" className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105">
                            <div className="text-red-500 mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;