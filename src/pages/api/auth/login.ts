// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '@/lib/auth'; // Asumiendo que signIn maneja la autenticación y devuelve un usuario
import nookies from 'nookies'; // Importa nookies

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await signIn(email, password);

      if (!user) {
        console.error('No se pudo autenticar al usuario.');
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      console.log('Usuario autenticado:', user);
      const token = user.id.toString();
      if (!token) {
        return res.status(401).json({ message: 'No se pudo crear el token' });
      }

      // Establecer la cookie usando nookies
      console.log('Estableciendo cookie con token:', token);
      nookies.set({ res }, 'authToken', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        //httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Usa true en producción
      });

      return res.status(200).json({ user });
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
