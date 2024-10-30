// src/pages/api/orders/getOrders.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Asegúrate de tener esta configuración de Prisma
import nookies from 'nookies'; // Importa nookies

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
    // Verifica el método de la solicitud
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' }); // Método no permitido
    }

    // Obtener el token de la cookie
    const cookies = nookies.get({ req });
    const token = cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'Usuario no autenticado' }); // Usuario no autenticado
    }

    try {
        // Convierte el token en un número (suponiendo que el token es el ID del usuario)
        const userId = parseInt(token, 10);
        
        // Verifica si el userId es un número válido
        if (isNaN(userId)) {
            return res.status(401).json({ error: 'Token inválido' }); // Token no válido
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: userId, // Filtrar por el ID del usuario autenticado
            },
            include: {
                items: {
                    include: {
                        product: true, // Incluye los detalles del producto
                    },
                },
            },
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener órdenes' });
    }
};

export default getOrders;
