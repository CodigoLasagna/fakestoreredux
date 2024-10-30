import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import nookies from 'nookies';

export default async function addItemToCart(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // Obtener el userId desde la cookie
  const cookies = nookies.get({ req });
  console.log('Cookies:', cookies); // Verifica el valor de las cookies
  const userId = parseInt(cookies.authToken, 10);

  if (!userId) {
    console.error('Usuario no autenticado, userId es:', userId); // Para depuración
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  const { productId, quantity = 1 } = req.body;

  try {
    // Encontrar o crear el carrito asociado al usuario
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { user: { connect: { id: userId } } },
        include: { items: true },
      });
    }

    // Comprobar si el producto ya está en el carrito
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      await prisma.itemCart.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Si no está en el carrito, lo añadimos
      await prisma.itemCart.create({
        data: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: productId } },
          quantity,
        },
      });
    }

    res.status(200).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
}
