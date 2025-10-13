import { createRoot } from 'react-dom/client'

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { RecoilRoot } from 'recoil'
import { GlobalStyles } from './styles/GlobalStyles'
import LoginPage from './pages/login'

createRoot(document.getElementById('root')!).render(
   <RecoilRoot>
    <GlobalStyles />
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
</RecoilRoot>
)