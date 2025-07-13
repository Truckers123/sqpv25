/**
 * Messages Page - Internal messaging system integrated as a full page
 * Features team communication and direct messaging
 */

import React from 'react';
import Header from '../components/Header';
import InternalMessaging from '../components/InternalMessaging';

export default function Messages() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-[calc(100vh-128px)]">
        <InternalMessaging isOpen={true} onClose={() => {}} />
      </div>
    </div>
  );
}
