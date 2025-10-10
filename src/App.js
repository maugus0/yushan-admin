import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './contexts/admin/adminauthcontext';
import AdminLayout from './pages/admin/adminlayout';
import AdminLogin from './pages/admin/login';
import Dashboard from './pages/admin/dashboard';

// User Management
import UsersOverview from './pages/admin/users/index';
import Readers from './pages/admin/users/readers';
import Writers from './pages/admin/users/writers';
import ReaderDetail from './pages/admin/users/readerdetail';
import WriterDetail from './pages/admin/users/writerdetail';

// Novel Management
import Novels from './pages/admin/novels';
import NovelDetail from './pages/admin/novels/noveldetail';

// Yuan Management
import Yuan from './pages/admin/yuan';
import YuanStatistics from './pages/admin/yuan/yuanstatistics';

// Other pages
import Categories from './pages/admin/categories';
import Chapters from './pages/admin/chapters';
import Comments from './pages/admin/comments';
import Reviews from './pages/admin/reviews';
import Rankings from './pages/admin/rankings';
import Reports from './pages/admin/reports';
import Library from './pages/admin/library';
import Settings from './pages/admin/settings';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* User Management */}
            <Route path="users" element={<UsersOverview />} />
            <Route path="users/readers" element={<Readers />} />
            <Route path="users/readers/:id" element={<ReaderDetail />} />
            <Route path="users/writers" element={<Writers />} />
            <Route path="users/writers/:id" element={<WriterDetail />} />
            
            {/* Content Management */}
            <Route path="novels" element={<Novels />} />
            <Route path="novels/:id" element={<NovelDetail />} />
            <Route path="categories" element={<Categories />} />
            <Route path="chapters" element={<Chapters />} />
            
            {/* Community Management */}
            <Route path="comments" element={<Comments />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="rankings" element={<Rankings />} />
            <Route path="reports" element={<Reports />} />
            
            {/* Platform Management */}
            <Route path="yuan" element={<Yuan />} />
            <Route path="yuan/statistics" element={<YuanStatistics />} />
            <Route path="library" element={<Library />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
