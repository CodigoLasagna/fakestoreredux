// src/lib/middleware/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

export function getUserIdFromCookie(req: NextApiRequest, res: NextApiResponse): number | null {
  // Obtener las cookies de la solicitud
  const cookies = nookies.get({ req });
  const token = cookies.authToken; // Obtener el valor de la cookie authToken

  // Verificar si el token existe
  if (!token) {
    res.status(401).json({ message: 'Usuario no autenticado' }); // Respuesta 401 si no hay token
    return null; // Retornar null si no hay token
  }

  // Convertir el token a un número
  const userId = parseInt(token, 10);
  
  // Verificar si el userId es un número válido
  if (isNaN(userId)) {
    res.status(401).json({ message: 'Token inválido' }); // Respuesta 401 si el token no es un número válido
    return null; // Retornar null si el token es inválido
  }

  return userId; // Retornar el ID del usuario si es válido
}
