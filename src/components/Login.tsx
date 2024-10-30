// src/components/Login.tsx
'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Si el login es exitoso, actualiza el estado de autenticación
      login();
      setSuccess('Inicio de sesión exitoso.');
      setError('');
      // Aquí puedes redirigir al usuario o hacer otra lógica
    } else {
      // Manejo de errores
      setError('Credenciales inválidas.');
      setSuccess('');
    }
  };

  return (
    <div className="bg-[#2C3A47] p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out w-full max-w-md">
      <h2 className="text-[#ECB22E] text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
