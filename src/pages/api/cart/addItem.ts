import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function addItemToCart(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { itemId, quantity } = req.body;

    if (!itemId || !quantity || typeof quantity !== 'number') {
      return res.status(400).json({ message: 'itemId y quantity son requeridos.' });
    }

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

      // Si el carrito no existe, crearlo
      if (!cart) {
        const newCart = await prisma.cart.create({
          data: {
            user: { connect: { id: userId } }, // Asocia el carrito al usuario
          },
        });

        // Aquí asignamos el cartId al usuario si decides hacerlo (aunque no es necesario)
        // await prisma.user.update({
        //   where: { id: userId },
        //   data: { cartId: newCart.id }, // Esta línea es opcional y depende de tu modelo
        // });

        // Agregar el producto al carrito recién creado
        await prisma.itemCart.create({
          data: {
            quantity,
            product: { connect: { id: itemId } },
            cart: { connect: { id: newCart.id } },
          },
        });

        return res.status(200).json({ message: 'Producto agregado al carrito.' });
      }

      // Verificar si el producto ya está en el carrito
      const existingItem = cart.items.find(item => item.productId === itemId);

      if (existingItem) {
        // Actualizar la cantidad si ya existe
        await prisma.itemCart.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        // Agregar un nuevo itemCart si no existe
        await prisma.itemCart.create({
          data: {
            quantity,
            product: { connect: { id: itemId } },
            cart: { connect: { id: cart.id } },
          },
        });
      }

      return res.status(200).json({ message: 'Producto agregado al carrito.' });
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
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
