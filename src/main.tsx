import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RecoilRoot } from "recoil";
import { GlobalStyles } from "./styles/GlobalStyles";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import ProfileSettingPage from "./pages/profile/setting";
import CountdownPage from "./pages/countdown";
import ChatListPage from "./pages/chatList";
import AdminParticipantsPage from "./pages/admin/participants";
import AdminMessagesPage from "./pages/admin/messages";
import ChatPage from "./pages/chat";
import MessagePage from "./pages/message";
import LastChoice from "./pages/lastChoice";
import FinalResultPage from "./pages/finalResult";
import AdminFinalResultPage from "./pages/admin/finalResult";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/setting" element={<ProfileSettingPage />} />
        <Route path="/countdown" element={<CountdownPage />} />
        <Route path="/admin/participants" element={<AdminParticipantsPage />} />
        <Route path="/admin/messages" element={<AdminMessagesPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat-list" element={<ChatListPage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/last-choice" element={<LastChoice />} />
        <Route path="/final-result" element={<FinalResultPage />} />
        <Route path="/admin/final-result" element={<AdminFinalResultPage />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);
