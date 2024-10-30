// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

import { signIn } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await signIn(email, password);

      // Puedes establecer una cookie en lugar de un token aquí
      res.setHeader('Set-Cookie', `user_id=${user.id}; Path=/; HttpOnly`);

      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
