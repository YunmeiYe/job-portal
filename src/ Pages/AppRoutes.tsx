import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Divider } from '@mantine/core'
import { useSelector } from 'react-redux'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ApplyJobPage from './ApplyJobPage'
import CompanyPage from './CompanyPage'
import FindJobsPage from './FindJobsPage'
import FindTalentPage from './FindTalentPage'
import HomePage from './HomePage'
import JobDetailsPage from './JobDetailsPage'
import JobHistoryPage from './JobHistoryPage'
import PostedJobsPage from './PostedJobsPage'
import PostJobPage from './PostJobPage'
import ProfilePage from './ProfilePage'
import SignUpPage from './SignUpPage'
import TalentProfilePage from './TalentProfilePage'


const AppRoutes = () => {
  const user = useSelector((state:any)=>state.user);

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
          <Route path='/post-job' element={<PostJobPage />} />
          <Route path='/posted-jobs' element={<PostedJobsPage />} />
          <Route path='/job-history' element={<JobHistoryPage />} />
          <Route path='/talent-profile' element={<TalentProfilePage />} />
          <Route path='/company/:name' element={<CompanyPage />} />
          <Route path='/sign-up' element={user ? <Navigate to={"/"} /> : <SignUpPage />} />
          <Route path='/login' element={user ? <Navigate to={"/"} /> : <SignUpPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default AppRoutes