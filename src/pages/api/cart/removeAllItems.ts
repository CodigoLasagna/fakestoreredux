
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function removeAllItemsFromCart(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const userId = getUserIdFromSession(req);
            if (!userId) {
                return res.status(401).json({ message: 'Usuario no autenticado.' });
            }

            // Obtener el carrito del usuario
            const cart = await prisma.cart.findUnique({
                where: { userId: userId },
                include: { items: true },
            });

            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado.' });
            }

            // Eliminar todos los productos del carrito
            await prisma.itemCart.deleteMany({
                where: {
                    cartId: cart.id,
                },
            });

            return res.status(200).json({ message: 'Todos los productos han sido eliminados del carrito.' });
        } catch (error) {
            console.error('Error al eliminar todos los productos del carrito:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido.' });
    }
}

// Función ficticia para obtener el ID del usuario de la sesión
function getUserIdFromSession(req: NextApiRequest): number | null {
    return 1; // Cambia esto por el ID real del usuario
}
