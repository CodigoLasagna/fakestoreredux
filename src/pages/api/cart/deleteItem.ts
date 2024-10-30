import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getUserIdFromCookie } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const userId = getUserIdFromCookie(req, res);
    if (!userId) return res.status(401).json({ message: 'Usuario no autenticado.' }); // Finaliza si el usuario no está autenticado

    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId es requerido.' });
    }

    try {
      // Obtener el carrito del usuario
      const cart = await prisma.cart.findUnique({ where: { userId } });
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      // Buscar y eliminar todos los productos del carrito que coincidan con el productId
      const existingItems = await prisma.itemCart.findMany({
        where: { productId, cartId: cart.id },
      });

      if (existingItems.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos en el carrito para eliminar.' });
      }

      // Eliminar todos los items encontrados
      await prisma.itemCart.deleteMany({
        where: {
          productId,
          cartId: cart.id,
        },
      });

      res.status(200).json({ message: 'Productos eliminados del carrito' });
    } catch (error) {
      console.error('Error al eliminar productos del carrito:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
