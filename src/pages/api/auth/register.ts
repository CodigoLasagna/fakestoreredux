// src/pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Asegúrate de que la ruta sea correcta.

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

            // Primero, crea un nuevo carrito
            const newCart = await prisma.cart.create({
                data: {}, // Si tu modelo `Cart` requiere algún campo, debes proporcionarlo aquí
            });

            // Ahora, crea el nuevo usuario con el cartId
            const newUser = await prisma.user.create({
                data: { name, email, pass: password, cartId: newCart.id }, // Asocia el cartId
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
