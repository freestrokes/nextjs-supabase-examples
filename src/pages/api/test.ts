import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const testCookie = req.cookies['test_cookie'];

  res.status(200).json({ testCookie: testCookie || 'not found' });
}