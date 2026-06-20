import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './layouts/DashboardLayout';
import HomeDesk from './pages/HomeDesk';
import ChatExperience from './pages/ChatExperience';
import CompaniesList from './pages/CompaniesList';
import CompanyIntelligence from './pages/CompanyIntelligence';
import Watchlist from './pages/Watchlist';
import ReportsHub from './pages/ReportsHub';
import InsightsHub from './pages/InsightsHub';
import CompareCompanies from './pages/CompareCompanies';
import Settings from './pages/Settings';
import LibraryMemory from './pages/LibraryMemory';
import CommandSearch from './pages/CommandSearch';
import Profile from './pages/Profile';
import CompanyCharts from './pages/CompanyCharts';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<HomeDesk />} />
          <Route path="copilot" element={<ChatExperience />} />
          <Route path="library" element={<LibraryMemory />} />
          <Route path="search" element={<CommandSearch />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Navigate to="/dashboard/copilot" replace />} />
          <Route path="companies" element={<CompaniesList />} />
          <Route path="companies/:id" element={<CompanyIntelligence />} />
          <Route path="companies/:id/charts" element={<CompanyCharts />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="reports" element={<ReportsHub />} />
          <Route path="insights" element={<InsightsHub />} />
          <Route path="compare" element={<CompareCompanies />} />
          <Route path="history" element={<LibraryMemory />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
