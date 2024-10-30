'use client';
// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Login from '../components/Login';
import Register from '../components/Register';

const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="mb-6">
                <h1 className="text-[#ECB22E] text-3xl font-bold">Fakestore 2.0 Electric boogaloo</h1>
            </div>
            <div className="flex space-x-4 mb-6">
                <button 
                    onClick={() => setShowLogin(true)} 
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 
                                ${showLogin ? 'bg-[#ECB22E] text-gray-900' : 'bg-transparent text-white hover:bg-[#ECB22E] hover:text-gray-900'}`}>
                    Login
                </button>
                <button 
                    onClick={() => setShowLogin(false)} 
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 
                                ${!showLogin ? 'bg-[#ECB22E] text-gray-900' : 'bg-transparent text-white hover:bg-[#ECB22E] hover:text-gray-900'}`}>
                    Registro
                </button>
            </div>
            <div className="bg-[#2C3A47] shadow-lg rounded-lg p-8 w-full max-w-md">
                <motion.div
                    key={showLogin ? "login" : "register"}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {showLogin ? <Login /> : <Register />}
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;
