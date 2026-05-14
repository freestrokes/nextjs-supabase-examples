import React from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useAuthStore } from '@/store/useAuthStore';
import { Layout } from '@/components/layout/Layout';

const LoginPage = () => {
  const { signInWithGoogle, signInWithKakao } = useAuthStore();

  return (
    <Layout showHeader={false}>
      <div className="flex min-h-screen items-center justify-center bg-linear-black p-4">
        <Card className="w-full max-w-md space-y-8 p-8 border-linear-border/20 shadow-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-medium tracking-display-lg text-linear-text-primary">
              Open Design Board
            </h1>
            <p className="mt-2 text-linear-text-tertiary">
              Linear style playground with Supabase
            </p>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full h-11 border-linear-border/50"
              variant="ghost"
              onClick={signInWithGoogle}
            >
              Continue with Google
            </Button>
            <Button
              className="w-full h-11 bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/90"
              onClick={signInWithKakao}
            >
              Continue with Kakao
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
