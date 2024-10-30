import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getUserIdFromCookie } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const userId = getUserIdFromCookie(req, res);
    if (!userId) return; // Finaliza si el usuario no está autenticado

    const { productId } = req.body;

    try {
      // Obtener el carrito del usuario
      const cart = await prisma.cart.findUnique({ where: { userId } });
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      // Buscar y eliminar el producto en el carrito
      const existingItem = await prisma.itemCart.findFirst({
        where: { productId, cartId: cart.id },
      });

      if (!existingItem) {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }

      await prisma.itemCart.delete({
        where: { id: existingItem.id },
      });

      res.status(200).json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
