import { supabase } from '@/lib/supabase/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 간단한 보안 체크 (Header의 x-keep-alive-key 확인)
  const authKey = req.headers['x-keep-alive-key'];
  const secretKey = process.env.KEEP_ALIVE_SECRET_KEY;

  if (secretKey && authKey !== secretKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 실제 데이터베이스에 활동을 발생시키기 위해 단순 조회 쿼리 실행
    const { data, error } = await supabase.from('posts').select('id').limit(1);

    if (error) {
      console.error('Supabase query error:', error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ 
      message: 'Supabase is awake and healthy!', 
      timestamp: new Date().toISOString() 
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
