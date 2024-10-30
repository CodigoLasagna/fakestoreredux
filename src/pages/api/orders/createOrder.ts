// pages/api/orders/createOrder.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { items, total, name, address, paymentMethod, userId } = req.body; // Desestructuración de la orden

        try {
            const order = await prisma.order.create({
                data: {
                    total,
                    name,
                    address,
                    paymentMethod,
                    date: new Date(), // Establece la fecha actual
                    user: {
                        connect: { id: userId }, // Conectar con el usuario que realiza la orden
                    },
                    items: {
                        create: items.map((item: { quantity: number; productId: number }) => ({
                            quantity: item.quantity,
                            product: {
                                connect: { id: item.productId }, // Conectar con el producto
                            },
                        })),
                    },
                },
            });

            return res.status(201).json(order); // Retorna la orden creada
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al crear la orden.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
