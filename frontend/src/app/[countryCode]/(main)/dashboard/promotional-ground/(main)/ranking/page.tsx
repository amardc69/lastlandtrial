// app/page.tsx (Next.js 13+ using App Router)
// If you're on Next.js < 13 with pages router, place in pages/index.tsx or similar.
// Make sure to enable "use client" at the top if you're using the App Router.

"use client"; // Required for client-side socket code in Next.js 13+ App Router

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function InstagramDataPage() {
  const [data, setData] = useState<any>({});
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    // Connect to your Node.js server
    const socket: Socket = io('http://localhost:6969', {
      transports: ['websocket'],
    });

    // When connected
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    // Listen for data from the server
    socket.on('instagramData', (userData) => {
      console.log('Received data:', userData);
      setData(userData);
    });

    // When disconnected
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Instagram Data</h1>
      {!connected && <p style={{ color: 'red' }}>Not connected to server</p>}

      {/* Render Instagram data if available */}
      {data.id ? (
        <div>
          <p>
            <strong>ID:</strong> {data.id}
          </p>
          <p>
            <strong>Username:</strong> {data.username}
          </p>
          <p>
            <strong>Name:</strong> {data.name ?? 'Not available'}
          </p>
          <p>
            <strong>Account Type:</strong> {data.account_type}
          </p>
          <p>
            <strong>Followers Count:</strong> {data.followers_count ?? 'Not available'}
          </p>
          <p>
            <strong>Follows Count:</strong> {data.follows_count ?? 'Not available'}
          </p>
          <p>
            <strong>Media Count:</strong> {data.media_count}
          </p>
        </div>
      ) : (
        <p>No data available yet.</p>
      )}
    </div>
  );
}
