'use client';

import Image from 'next/image';
import ApplicationForm from './ApplicationForm';
import { heroGalleryItems, pageContent } from '@/data/applyPageData';

export default function ApplicationHero() {
  return (
    <section className="relative pt-[var(--navbar-height)] pb-8 md:pb-14 mt-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-start">

          {/* ── LEFT ── */}
          <div className="lg:sticky lg:top-[var(--navbar-height)]">

            {/* Title — desktop only (hidden on mobile, shown in image overlay instead) */}
            <h1 className="hidden lg:block text-3xl xl:text-4xl font-bold text-gray-900 leading-tight mb-5">
              {pageContent.hero.title}{' '}
              <em className="italic text-gray-800">{pageContent.hero.titleItalic}</em>
            </h1>

            {/* Image */}
            <figure
              className="relative w-full overflow-hidden border border-gray-300"
              style={{ height: 'clamp(260px, calc(100vh - var(--navbar-height) - 8rem), 640px)' }}
            >
              <Image
                src={heroGalleryItems[0].image}
                alt={heroGalleryItems[0].alt}
                fill
                priority
                className="object-cover object-top"
              />

              {/* Mobile title overlaid on image */}
              <div className="lg:hidden absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 via-black/50 to-black/60 px-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug drop-shadow-lg">
                  {pageContent.hero.title}{' '}
                  <em className="italic text-[#ffb3c1]">{pageContent.hero.titleItalic}</em>
                </h1>
              </div>

              {/* Caption */}
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-3 pt-8">
                <p className="text-white text-sm font-semibold">
                  {heroGalleryItems[0].caption}
                </p>
              </figcaption>
            </figure>
          </div>

          {/* ── RIGHT — Form ── */}
          <aside className="w-full border-t lg:border-t-0 border-gray-200">
            <ApplicationForm />
          </aside>

        </div>
      </div>
    </section>
  );
}