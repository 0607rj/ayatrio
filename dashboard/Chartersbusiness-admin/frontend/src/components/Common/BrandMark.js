import React from 'react';

export default function BrandMark({ compact = false }) {
  return (
    <img
      src="/Chaters_Union.webp"
      alt="Charters Business Logo"
      style={{
        height: compact ? '28px' : '36px',
        width: 'auto',
        display: 'block'
      }}
    />
  );
}

