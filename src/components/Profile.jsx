import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [userName, setUserName] = useState('Aniket Ray');
  const [userEmail, setUserEmail] = useState('aniketray15@gmail.com');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <div className="profile-card" style={{ width: '100%' }}>
        <div className="profile-avatar">
          {getInitials(userName)}
        </div>
        <h1>{userName}</h1>
        <p>{userEmail}</p>
      </div>
    </div>
  );
}
