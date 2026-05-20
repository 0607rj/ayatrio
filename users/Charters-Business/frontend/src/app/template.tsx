'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

// Dynamic imports split Navbar/Footer JS into separate chunks
// SSR stays on so HTML renders immediately, but hydration doesn't block main content
const Navbar = dynamic(() => import('@/components/shared/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/shared/Footer'), { ssr: true });

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const iscareers = pathname?.startsWith('/careers/');
  const isadmin = pathname?.startsWith('/admin/');
  const hideNavFooter = isDashboard || isAuthPage || iscareers || isadmin;

  return (
    <>
      {!hideNavFooter && (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <Navbar />
        </header>
      )}

      {!hideNavFooter && <Breadcrumbs />}

      <main className={hideNavFooter ? '' : 'flex-grow'}>
        {children}
      </main>

      {!hideNavFooter && <Footer />}
    </>
  );
}

