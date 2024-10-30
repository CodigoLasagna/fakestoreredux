import { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

export function getUserIdFromCookie(req: NextApiRequest, res: NextApiResponse) {
  const cookies = nookies.get({ req });
  const userId = cookies.authToken ? parseInt(cookies.authToken, 10) : null;

  if (!userId) {
    res.status(401).json({ message: 'Usuario no autenticado' });
    return null;
  }

  return userId;
}
