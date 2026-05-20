"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";


const TrackingBootstrap = dynamic(
  () => import("@/components/shared/TrackingBootstrap"),
  { ssr: false }
);

const ChatbotClient = dynamic(
  () => import("@/components/shared/chatBotClient"),
  { ssr: false }
);

export default function ClientOnlyComponents() {
  const [loadChatbot, setLoadChatbot] = useState(false);

  useEffect(() => {

    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        setLoadChatbot(true);
      });
    } else {
      setTimeout(() => {
        setLoadChatbot(true);
      }, 3000);
    }

  }, []);

  return (
    <>
      <TrackingBootstrap />

      {loadChatbot && <ChatbotClient />}

    </>
  );
}