import React, { useState } from 'react'; // Removed useEffect

const Contact = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });

    // State for submission feedback
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'idle', 'submitting', 'success', 'error'

    // handleExportData function, isAdminLoggedIn state, and its useEffect are REMOVED

    // Handle input changes (this makes your form inputs "controlled components")
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default browser form submission (page reload)

        setSubmissionStatus('submitting'); // Indicate submission in progress

        try {
            const response = await fetch('http://localhost:5000/api/contact-submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    message: ''
                });
            } else {
                const errorData = await response.json();
                console.error('Server responded with an error:', response.status, errorData);
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error('Network error or unexpected issue during submission:', error);
            setSubmissionStatus('error');
        }
    };

    // handleExport function (the old one) is REMOVED


    return (
        <section id="contact" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">Contact Us</h2>
                <div className="flex flex-col md:flex-row md:space-x-8">
                    <div className="md:w-1/2 bg-gray-100 p-8 rounded-lg shadow-lg mb-8 md:mb-0">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Get in Touch</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Your Mobile Number"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
                                disabled={submissionStatus === 'submitting'}
                            >
                                {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>

                            {/* Submission Feedback Messages */}
                            {submissionStatus === 'success' && (
                                <p className="text-green-600 mt-4 text-sm font-medium">Thank you! Your message has been sent.</p>
                            )}
                            {submissionStatus === 'error' && (
                                <p className="text-red-600 mt-4 text-sm font-medium">Failed to send message. Please try again or contact us directly.</p>
                            )}
                        </form>

                        {/* The export button is REMOVED from here */}

                    </div>

                    {/* Right side (Our Location) remains the same */}
                    <div className="md:w-1/2 bg-gray-100 p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Our Location</h3>
                        <p className="text-gray-700 mb-4">
                            <strong>Shanvika Infrastructures</strong><br />
                            Currency Nagar, Vijayawada, Andhra Pradesh
                        </p>
                        <p className="text-gray-700 mb-2"><strong>Phone:</strong>+91 9959892349</p>
                        <p className="text-gray-700 mb-4"><strong>Email:</strong> info@saravana.com</p>
                        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                            <iframe
                               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15300.563491657857!2d80.67440467648872!3d16.518984219838615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35e4d58eddf989%3A0xc59ca086dfcafab8!2scurrency%20nagar%2C%20Vijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1749359068714!5m2!1sen!2sin" 
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                        <a href="https://maps.app.goo.gl/ssps8xFbnBULcCD262" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-4 block">View on Google Maps</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;