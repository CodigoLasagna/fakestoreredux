import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import nookies from 'nookies'; // Importa nookies
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.pass);

  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }

  return { id: user.id, name: user.name, email: user.email };
}

// Función para obtener la sesión del usuario a partir de la cookie
export async function getSession(req: NextApiRequest) {
  const cookies = nookies.get({ req }); // Usar nookies para obtener cookies
  const userId = cookies.authToken; // Cambia 'user_id' por el nombre de la cookie que usas

  if (!userId) {
    return null; // Si no hay cookie, no hay sesión
  }

  // Busca el usuario en la base de datos
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  return user; // Retorna el usuario encontrado o null
}
