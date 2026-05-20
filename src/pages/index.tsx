import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Layout as LayoutIcon } from 'lucide-react';

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-24 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 rounded-full border border-linear-border bg-white/5 px-3 py-1 text-xs font-medium text-linear-violet">
            <span className="flex h-2 w-2 rounded-full bg-linear-violet animate-pulse" />
            New: Linear Style Dashboard is now live
          </div>
          
          <h1 className="max-w-4xl text-5xl md:text-7xl font-medium tracking-display-xl text-linear-text-primary leading-[1.1]">
            Build better products <br /> 
            <span className="text-linear-text-tertiary">with Open Design.</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-linear-text-secondary font-normal leading-relaxed">
            A high-performance boilerplate for modern web applications. 
            Engineered with Next.js, Supabase, and the precision of Linear's design system.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/board">
              <Button size="lg" className="h-12 px-8 gap-2 group">
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://github.com/freestrokes/nextjs-supabase-examples" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="lg" className="h-12 px-8 gap-2">
                Star on GitHub
              </Button>
            </a>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full py-20 border-t border-linear-border/30">
          <Card hoverable className="space-y-4 p-6 bg-white/[0.01]">
            <div className="h-10 w-10 rounded-lg bg-linear-violet/10 flex items-center justify-center text-linear-violet">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-medium text-linear-text-primary">Built for Speed</h3>
            <p className="text-sm text-linear-text-tertiary leading-relaxed">
              Experience zero-latency interactions with Next.js Turbopack and Zustand's efficient state management.
            </p>
          </Card>

          <Card hoverable className="space-y-4 p-6 bg-white/[0.01]">
            <div className="h-10 w-10 rounded-lg bg-linear-violet/10 flex items-center justify-center text-linear-violet">
              <Shield size={20} />
            </div>
            <h3 className="text-lg font-medium text-linear-text-primary">Secure by Default</h3>
            <p className="text-sm text-linear-text-tertiary leading-relaxed">
              Enterprise-grade authentication powered by Supabase Auth with Google and Kakao OAuth2 support.
            </p>
          </Card>

          <Card hoverable className="space-y-4 p-6 bg-white/[0.01]">
            <div className="h-10 w-10 rounded-lg bg-linear-violet/10 flex items-center justify-center text-linear-violet">
              <LayoutIcon size={20} />
            </div>
            <h3 className="text-lg font-medium text-linear-text-primary">Linear Aesthetic</h3>
            <p className="text-sm text-linear-text-tertiary leading-relaxed">
              Beautiful dark-mode-native UI components following the strict design principles of the industry leaders.
            </p>
          </Card>
        </section>

        {/* Footer Hint */}
        <footer className="py-20 text-center border-t border-linear-border/20 w-full">
          <p className="text-xs text-linear-text-tertiary/50 uppercase tracking-widest font-medium">
            Powered by Next.js & Supabase
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default HomePage;
