import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function getCart(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const userId = getUserIdFromSession(req); // Función para obtener ID de usuario
      if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
      }

      // Obtener el carrito del usuario, incluyendo los productos
      const cart = await prisma.cart.findUnique({
        where: { userId: userId },
        include: {
          items: {
            include: {
              product: true, // Incluir el producto relacionado
            },
          },
        },
      });

      if (!cart || cart.items.length === 0) {
        return res.status(404).json({ message: 'Carrito no encontrado o vacío.' });
      }

      // Formatear los datos
      const formattedCartItems = cart.items.map(item => ({
        product: {
          id: item.product.id,
          title: item.product.title,
          price: item.product.price,
          category: item.product.category,
          description: item.product.description,
          image: item.product.image,
        },
        quantity: item.quantity,
      }));

      return res.status(200).json({ items: formattedCartItems });
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido.' });
  }
}

// Función ficticia para obtener el ID del usuario de la sesión
function getUserIdFromSession(req: NextApiRequest): number | null {
  // Cambia esto por el ID real del usuario
  return 1; 
}
