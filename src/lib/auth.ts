// src/lib/auth.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function signIn(email: string, password: string) {
  // Buscar el usuario por correo electrónico
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Verificar si el usuario existe
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Comparar la contraseña proporcionada con la almacenada (encriptada)
  const isPasswordValid = user.pass === password;

  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }

  // Retorna solo los datos básicos del usuario
  return { id: user.id, name: user.name, email: user.email };
}
