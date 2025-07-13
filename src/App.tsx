import { HashRouter, Route, Routes } from 'react-router'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { UserDataProvider } from './contexts/UserDataContext'
import Login from './pages/Login'
import Demo from './pages/Demo'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import Messages from './pages/Messages'
import Email from './pages/Email'
import Tasks from './pages/Tasks'
import Calendar from './pages/Calendar'
import Information from './pages/Information'
import Settings from './pages/Settings'
import DevTools from './pages/DevTools'
import Feedback from './pages/Feedback'
import { useState } from 'react'
import React from 'react'

function AppContent() {
  const { isAuthenticated, login } = useAuth();
  const [showDemo, setShowDemo] = useState(false);

  // Handle demo login
  const handleDemoLogin = (credentials: { username: string; password: string }) => {
    setShowDemo(false);
    // Auto-fill the login form
    setTimeout(() => {
      login({
        id: credentials.username,
        username: credentials.username,
        password: credentials.password,
        name: credentials.username,
        role: 'Demo User',
        department: 'Demo',
        permissions: ['all_access'],
        status: 'active'
      });
    }, 100);
  };

  // Show demo landing page first
  if (showDemo) {
    return <Demo onStartDemo={handleDemoLogin} />;
  }

  // Auto-login for development - remove in production
  React.useEffect(() => {
    if (!isAuthenticated) {
      login({
        id: '1',
        username: 'truckers',
        password: 'truckers123',
        name: 'Alex "Big Truck" Foster',
        role: 'Managing Director',
        department: 'Management',
        permissions: ['all_access', 'admin', 'reports', 'deals', 'contacts', 'analytics'],
        accessLevel: 'board',
        status: 'active',
        canDelete: true,
        requiresTwoFA: false
      });
    }
  }, [isAuthenticated, login]);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  // Show main application
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/information" element={<Information />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/email" element={<Email />} />
        <Route path="/devtools" element={<DevTools />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </HashRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <AppContent />
      </UserDataProvider>
    </AuthProvider>
  );
}