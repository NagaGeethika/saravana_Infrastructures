import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Directors from './components/Directors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './AdminDashboard';
import Chatbot from './components/Chatbot'; // NEW: Added Chatbot import

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [locationPath, setLocationPath] = useState(window.location.pathname);

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));

    const handleAdminLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleScroll = () => {
        const sections = ['home', 'about', 'services', 'projects', 'directors', 'contact'];
        let currentActive = 'home';

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentActive = sections[i];
                    break;
                }
            }
        }
        setActiveSection(currentActive);
    };

    useEffect(() => {
        const handleLocationChange = () => {
            setLocationPath(window.location.pathname);
            if (window.location.pathname !== '/admin' && window.location.pathname !== '/admin-dashboard') {
                window.addEventListener('scroll', handleScroll);
            } else {
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('popstate', handleLocationChange);
        window.addEventListener('urlchange', handleLocationChange);

        if (window.location.pathname !== '/admin' && window.location.pathname !== '/admin-dashboard') {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            window.removeEventListener('urlchange', handleLocationChange);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavLinkClick = (sectionId) => {
        if (locationPath === '/admin' || locationPath === '/admin-dashboard') {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new Event('urlchange'));
            setTimeout(() => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(sectionId);
                }
            }, 100);
        } else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(sectionId);
            }
        }
        setIsMobileMenuOpen(false);
    };

    if (locationPath === '/admin') {
        return (
            <div className="font-inter antialiased text-gray-800 bg-gray-100">
                <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
            </div>
        );
    }

    if (locationPath === '/admin-dashboard') {
        if (isLoggedIn) {
            return (
                <div className="font-inter antialiased text-gray-800 bg-gray-100">
                    <AdminDashboard />
                </div>
            );
        } else {
            window.history.replaceState({}, '', '/admin');
            window.dispatchEvent(new Event('urlchange'));
            return (
                <div className="font-inter antialiased text-gray-800 bg-gray-100">
                    <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
                </div>
            );
        }
    }

    return (
        <div className="font-inter antialiased text-gray-800 bg-gray-100">
            <Header
                activeSection={activeSection}
                handleNavLinkClick={handleNavLinkClick}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                isLoggedIn={isLoggedIn}
            />
            <main>
                <Home />
                <About />
                <Services />
                <Projects />
                <Directors />
                <Contact />
            </main>
            <Footer />
            <div style={{ textAlign: 'center', padding: '20px' }}>
                {!isLoggedIn && (
                    <button
                        onClick={() => {
                            window.history.pushState({}, '', '/admin');
                            window.dispatchEvent(new Event('urlchange'));
                        }}
                        style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Admin Login
                    </button>
                )}
                {isLoggedIn && (
                    <>
                        <button
                            onClick={() => {
                                localStorage.removeItem('adminToken');
                                setIsLoggedIn(false);
                                alert('Logged out successfully!');
                                window.history.pushState({}, '', '/');
                                window.dispatchEvent(new Event('urlchange'));
                            }}
                            style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Logout
                        </button>
                        {locationPath !== '/admin-dashboard' && (
                            <button
                                onClick={() => {
                                    window.history.pushState({}, '', '/admin-dashboard');
                                    window.dispatchEvent(new Event('urlchange'));
                                }}
                                style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Go to Admin Dashboard
                            </button>
                        )}
                    </>
                )}
            </div>
            {/* Conditional rendering for Chatbot */}
            {(locationPath !== '/admin' && locationPath !== '/admin-dashboard') && <Chatbot />}
        </div>
    );
}

export default App;