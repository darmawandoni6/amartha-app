'use client';

import { useEffect, useState } from 'react';

const DevVersionBadge = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [devVersion, setDevVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      const response = await fetch('/health');
      const data = await response.json();
      setDevVersion(data.devVersion);
    };

    fetchVersion();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || !devVersion) {
    return null;
  }

  if (process.env.NEXT_PUBLIC_MODE !== 'production') {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '12px',
          right: '12px',
          padding: '2px 8px',
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          color: 'white',
          borderRadius: '20px',
          fontSize: '10px',
          fontWeight: '500',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>{devVersion}</span>
        <button
          onClick={handleClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          &times; {/* "×" symbol for close */}
        </button>
      </div>
    );
  }

  return null;
};

export default DevVersionBadge;
