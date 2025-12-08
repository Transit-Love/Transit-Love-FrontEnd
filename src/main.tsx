import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyles } from "./styles/GlobalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 10 * 60 * 1000, // 10분 (이전 cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import ProfileSettingPage from "./pages/profile/setting";
import ProfileDetailPage from "./pages/profile/detail";
import CountdownPage from "./pages/countdown";
import ChatListPage from "./pages/chatList";
import AdminParticipantsPage from "./pages/admin/participants";
import AdminMessagesPage from "./pages/admin/messages";
import AdminChatListPage from "./pages/admin/chatList";
import AdminChatDetailPage from "./pages/admin/chatDetail";
import ChatPage from "./pages/chat";
import MessagePage from "./pages/message";
import LastChoice from "./pages/lastChoice";
import FinalResultPage from "./pages/finalResult";
import AdminFinalResultPage from "./pages/admin/finalResult";
import OAuth2Redirect from "./pages/oauth2/redirect";
import NotFoundPage from "./pages/notFound";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/setting" element={<ProfileSettingPage />} />
          <Route path="/profile/:profileId" element={<ProfileDetailPage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route
            path="/admin/participants"
            element={<AdminParticipantsPage />}
          />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/admin/chat-list" element={<AdminChatListPage />} />
          <Route
            path="/admin/chat/:matchId"
            element={<AdminChatDetailPage />}
          />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat-list" element={<ChatListPage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/last-choice" element={<LastChoice />} />
          <Route path="/final-result" element={<FinalResultPage />} />
          <Route
            path="/admin/final-result"
            element={<AdminFinalResultPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </RecoilRoot>
);
