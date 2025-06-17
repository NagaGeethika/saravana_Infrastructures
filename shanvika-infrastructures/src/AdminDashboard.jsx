// src/pages/AdminDashboard.jsx (or src/components/AdminDashboard.jsx)
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('adminToken');
            setIsAdminLoggedIn(!!token);
            setIsLoading(false);
        };

        checkLoginStatus();

        // Listen for storage events to react to logout from other tabs/windows
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const handleExportData = async () => {
        const token = localStorage.getItem('adminToken');

        if (!token) {
            alert('Authentication required. Please log in again.');
            window.history.pushState({}, '', '/admin');
            window.dispatchEvent(new Event('urlchange'));
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/export-contacts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `contact_submissions_${new Date().toISOString().slice(0, 10)}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                alert("Contact data exported successfully!");
            } else {
                const errorData = await response.json();
                alert(`Failed to export data: ${errorData.error || 'An unexpected error occurred.'}`);
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('adminToken');
                    setIsAdminLoggedIn(false);
                    window.history.pushState({}, '', '/admin');
                    window.dispatchEvent(new Event('urlchange'));
                }
            }
        } catch (error) {
            console.error('Export error:', error);
            alert('A network error occurred while trying to export data.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        alert('You have been successfully logged out.');
        window.history.pushState({}, '', '/'); // Redirect to home page
        window.dispatchEvent(new Event('urlchange'));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
                <p className="text-lg text-gray-600">Loading administrative panel...</p>
            </div>
        );
    }

    if (!isAdminLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
                <div className="bg-white p-10 rounded-lg shadow-xl text-center max-w-md w-full border border-gray-200">
                    <h2 className="text-3xl font-semibold text-red-700 mb-6">Unauthorized Access</h2>
                    <p className="text-gray-600 mb-8">
                        Please log in with valid administrator credentials to proceed.
                    </p>
                    <button
                        onClick={() => {
                            window.history.pushState({}, '', '/admin');
                            window.dispatchEvent(new Event('urlchange'));
                        }}
                        className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
                    >
                        Proceed to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="bg-white p-10 md:p-12 rounded-lg shadow-xl text-center max-w-lg w-full border border-gray-200">
                <h2 className="text-3xl font-extrabold text-red-600 mb-6 leading-tight tracking-tight"> {/* Changed text-5xl to text-3xl */}
                    Sree Saravana Infrastructures <br className="sm:hidden"/>Admin Panel
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed"> {/* Changed text-xl to text-lg */}
                    Access and manage critical contact data. Click the button below to generate and download a CSV report of all contact submissions.
                </p>
                <button
                    type="button"
                    className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-lg shadow-md hover:shadow-lg"
                    onClick={handleExportData}
                >
                    Export Contact Data (CSV)
                </button>
                <div className="mt-10">
                    <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;