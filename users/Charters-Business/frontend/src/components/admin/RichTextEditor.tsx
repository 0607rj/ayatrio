'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Lazy load TipTap - Only when editor is needed!
const TipTapEditor = dynamic(
  () => import('./TipTapEditorCore'),
  {
    ssr: false, // Don't load on server
    loading: () => (
      <div className="border border-gray-300 rounded-lg p-4 min-h-[300px] bg-gray-50 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    ),
  }
);

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Write your content here...',
}: RichTextEditorProps) {
  const [isEditorReady, setIsEditorReady] = useState(false);

  return (
    <div className="relative">
      {/* Load editor only after user interaction */}
      {!isEditorReady ? (
        <button
          type="button"
          onClick={() => setIsEditorReady(true)}
          className="w-full border border-gray-300 rounded-lg p-4 min-h-[300px] bg-white hover:bg-gray-50 transition-colors text-left text-gray-500"
        >
          Click to load editor...
        </button>
      ) : (
        <TipTapEditor
          content={content}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
