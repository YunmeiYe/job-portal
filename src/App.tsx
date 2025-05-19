import './App.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppRoutes from './router/AppRoutes';
import SessionWatcher from './components/SessionWatcher';

function App() {
  const theme = createTheme({
    focusRing: "never",
    fontFamily: "poppins, sans-serif",
    primaryColor: "brightSun",
    primaryShade: { light: 5, dark: 4 },
    colors: {
      mineShaft: ["#f6f6f6", "#e7e7e7", "#d1d1d1", "#b0b0b0", "#888888", "#6d6d6d", "#5d5d5d", "#4f4f4f", "#454545", "#3d3d3d", "#2d2d2d"
      ],
      brightSun: ["#fffbeb", "#fff3c6", "#ffe588", "#ffd149", "#ffbd20", "#f99b07", "#dd7302", "#b75006", "#943c0c", "#7a330d", "#461902"
      ],
      lightCream: ["#f9f9f7", "#f4f3ef", "#efeee8", "#eae8e0", "#e5e3d9", "#ceccc3", "#b7b5ad", "#a09e97", "#72716c", "#444441", "#2d2d2b"]
    },
  })
  return (
    <MantineProvider defaultColorScheme='dark' theme={theme} >
      <Notifications position="top-right" zIndex={1000} />
      <SessionWatcher />
      <AppRoutes />
    </MantineProvider>
  )
}

export default App
