import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/') return null;
  return (
    <div className="footer">
      © 2024 Dashboard. All Rights Reserved.
    </div>
  );
}
