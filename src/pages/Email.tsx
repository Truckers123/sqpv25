/**
 * Email Page - Email system integrated as a full page
 * Features email management and communication
 */

import React from 'react';
import Header from '../components/Header';
import EmailSystem from '../components/EmailSystem';

export default function Email() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-[calc(100vh-128px)]">
        <EmailSystem isOpen={true} onClose={() => {}} />
      </div>
    </div>
  );
}
