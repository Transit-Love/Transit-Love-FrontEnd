import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RecoilRoot } from "recoil";
import { GlobalStyles } from "./styles/GlobalStyles";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import CountdownPage from "./pages/countdown";
import ChatListPage from "./pages/chatList";
import ChatPage from "./pages/chat";

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
        <Route path="/chat-list" element={<ChatListPage />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);
