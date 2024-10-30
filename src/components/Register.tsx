'use client';
// src/components/Register.tsx
import React, { useState } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                setSuccess('Usuario registrado con éxito.');
                setError('');
            } else {
                setError('Error al registrar el usuario');
            }
        } catch (err) {
            setError('Error en el servidor');
        }
    };

    return (
        <div className="bg-[#2C3A47] p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out w-full max-w-md">
            <h2 className="text-[#ECB22E] text-2xl font-bold mb-4 text-center">Registro</h2>
            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ECB22E] transition duration-300"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ECB22E] transition duration-300"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ECB22E] transition duration-300"
                    required
                />
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <button
                    type="submit"
                    className="bg-[#ECB22E] text-gray-900 font-semibold py-2 rounded-lg transition duration-300 hover:bg-yellow-400"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default Register;
