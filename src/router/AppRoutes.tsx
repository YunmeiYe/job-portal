import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Divider } from '@mantine/core'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ApplyJobPage from '../ pages/ApplyJobPage'
import CompanyPage from '../ pages/CompanyPage'
import FindJobsPage from '../ pages/FindJobsPage'
import FindTalentPage from '../ pages/FindTalentPage'
import HomePage from '../ pages/HomePage'
import JobDetailsPage from '../ pages/JobDetailsPage'
import JobHistoryPage from '../ pages/JobHistoryPage'
import PostedJobsPage from '../ pages/PostedJobsPage'
import PostJobPage from '../ pages/PostJobPage'
import ProfilePage from '../ pages/ProfilePage'
import SignUpPage from '../ pages/SignUpPage'
import TalentProfilePage from '../ pages/TalentProfilePage'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <div className='relative'>
        <Header />
        <Divider size="xs" px="md" />
        <Routes>
          <Route path='/find-jobs' element={<FindJobsPage />} />
          <Route path='/find-talent' element={<FindTalentPage />} />
          <Route path='/jobs/:id' element={<JobDetailsPage />} />
          <Route path='/apply-job/:id' element={<ApplyJobPage />} />
          <Route path='/post-job/:id?' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage /></ProtectedRoute>} />
          <Route path='/posted-jobs/:id?' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostedJobsPage /></ProtectedRoute>} />
          <Route path='/job-history' element={<ProtectedRoute allowedRoles={['APPLICANT']}><JobHistoryPage /></ProtectedRoute>} />
          <Route path='/talent-profile/:id' element={<TalentProfilePage />} />
          <Route path='/company/:name' element={<CompanyPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/sign-up' element={<PublicRoute><SignUpPage /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><SignUpPage /></PublicRoute>} />
          <Route path='*' element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default AppRoutes