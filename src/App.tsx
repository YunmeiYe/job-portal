import './App.css';
import { createTheme, Divider, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import HomePage from './ Pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FindJobsPage from './ Pages/FindJobsPage';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import FindTalentsPage from './ Pages/FindTalentsPage';
import TalentProfilePage from './ Pages/TalentProfilePage';
import PostJobPage from './ Pages/PostJobPage';

function App() {
  const theme = createTheme({
    focusRing: "never",
    fontFamily: "poppins, sans-serif",
    primaryColor: "brightSun",
    primaryShade: 4,
    colors: {
      mineShaft: ["#f6f6f6", "#e7e7e7", "#d1d1d1", "#b0b0b0", "#888888", "#6d6d6d", "#5d5d5d", "#4f4f4f", "#454545", "#3d3d3d", "#2d2d2d"
      ],
      brightSun: ["#fffbeb", "#fff3c6", "#ffe588", "#ffd149", "#ffbd20", "#f99b07", "#dd7302", "#b75006", "#943c0c", "#7a330d", "#461902"
      ]
    },
  })
  return (
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <BrowserRouter>
        <Header />
        <Divider size="xs" mx="md" />
        <Routes>
          <Route path='/find-jobs' element={<FindJobsPage />} />
          <Route path='/find-talents' element={<FindTalentsPage />} />
          <Route path='/post-job' element={<PostJobPage />} />
          <Route path='/talent-profile' element={<TalentProfilePage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
