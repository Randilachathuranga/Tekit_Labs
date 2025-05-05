import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Admin components
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import CreateBlog from './admin/pages/CreateBlog';
import ViewBlogs from './admin/pages/ViewBlogs';
import LoginPage from './admin/login';
// import SiteSettings from './admin/pages/SiteSettings';
// import SEOAnalytics from './admin/pages/SEOAnalytics';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public website routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main><HomePage /></main>
              <Footer />
            </>
          }
        />

        {/* Admin login route */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin dashboard layout with nested routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="view-blogs" element={<ViewBlogs />} />
          {/* <Route path="site-settings" element={<SiteSettings />} />
          <Route path="seo-analytics" element={<SEOAnalytics />} /> */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;