// src/pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Asegúrate de que la ruta sea correcta.
const bcrypt = require('bcrypt');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email: String(email) },
            });

            if (existingUser) {
                return res.status(400).json({ error: 'El correo ya está registrado' });
            }

            // Hashea la contraseña antes de almacenarla
            const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de salt rounds

            // Crear un nuevo usuario junto con un carrito
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    pass: hashedPassword,
                }
            });

            return res.status(201).json({ user: newUser });
        } catch (error) {
            console.error(error); // Log para depuración
            return res.status(500).json({ error: 'Error al crear el usuario' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
