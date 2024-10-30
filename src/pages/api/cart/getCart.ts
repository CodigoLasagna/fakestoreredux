import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getUserIdFromCookie } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = getUserIdFromCookie(req, res);
    if (!userId) return;

    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      });

      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
