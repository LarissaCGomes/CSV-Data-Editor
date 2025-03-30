import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import EditPage from './pages/editing-page';
import UploadVerificationPage from './pages/upload-verification-page';
import Header from './components/header';
import SettingsPage from './pages/settings-page';
import ReportsPage from './pages/reports-page';
import UploadDatabasePage from './pages/upload-database-page';

const App = () => {
  return (
    <Router>
       <Header />
      <div className="flex">
        <Sidebar handleAutoCorrect={() => console.log('Auto-correcting...')} />
        
        <div className="flex-1">
          <main className="p-6 bg-gray-50">
            <Routes>
              <Route path="/" element={<UploadVerificationPage />} />
              <Route path="/editing-page" element={<EditPage />} />
              <Route path="/upload-database" element={<UploadDatabasePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
