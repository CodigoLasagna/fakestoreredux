// pages/api/products/addProducts.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const products = req.body; // Espera un array de productos

        try {
            for (const product of products) {
                // Verifica si el producto ya existe en la base de datos
                const existingProduct = await prisma.product.findUnique({
                    where: { title: product.title }, // Puedes usar otro campo único si lo prefieres
                });

                // Si el producto no existe, créalo
                if (!existingProduct) {
                    await prisma.product.create({
                        data: {
                            title: product.title,
                            price: product.price,
                            description: product.description,
                            category: product.category,
                            image: product.image,
                        },
                    });
                }
            }

            return res.status(200).json({ message: 'Productos procesados correctamente.' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al insertar productos.' });
        }
    } else {
        // Manejo de otros métodos, como GET
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
