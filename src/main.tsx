import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RecoilRoot } from "recoil";
import { GlobalStyles } from "./styles/GlobalStyles";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import CountdownPage from "./pages/countdown";
import ChatPage from "./pages/chatList";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/countdown" element={<CountdownPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);
