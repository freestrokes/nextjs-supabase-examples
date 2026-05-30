import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      // URL에서 'code' 파라미터를 추출하여 세션으로 교환
      const code = new URLSearchParams(window.location.search).get('code');
      
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }
      
      // 세션 설정이 완료되면 대시보드로 이동
      router.push('/dashboard');
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-black text-linear-text-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-linear-violet border-t-transparent" />
        <p className="text-sm font-medium tracking-tight">Completing sign in...</p>
      </div>
    </div>
  );
}
