'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LABEL_OVERRIDES: Record<string, string> = {
  faculties: 'Faculty + Research',
  'student-life': 'Student Life',
  careers: 'Placements++',
};

function formatSegmentLabel(segment: string) {
  const normalized = decodeURIComponent(segment).toLowerCase();
  if (LABEL_OVERRIDES[normalized]) return LABEL_OVERRIDES[normalized];

  return decodeURIComponent(segment)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export default function Breadcrumbs() {

  const pathname = usePathname() || '/';
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = [{ label: 'Home', href: '/' }].concat(
    segments.map((segment, index) => ({
      label: formatSegmentLabel(segment),
      href: `/${segments.slice(0, index + 1).join('/')}`,
    })),
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-2 bg-white border-b border-gray-100"
    >
      <ol className="mx-auto max-w-7xl flex flex-wrap items-center gap-1 text-xs sm:text-sm text-gray-600">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center gap-1">
              {isLast ? (
                <span className="font-medium text-gray-900">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-[#B30437] transition-colors">
                  {crumb.label}
                </Link>
              )}
              {!isLast && <span className="text-gray-400">{'>'}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
