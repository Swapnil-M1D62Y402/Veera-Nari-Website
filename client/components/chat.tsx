'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DashBoard_Navbar from "./dashboard_navbar";
import Link from "next/link";

export default function ChatSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hello! I'm Dr. Safety, your personal safety and wellness consultant. How can I assist you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OpenAI API key is not defined');
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        text: "Error: API key not configured",
        timestamp: new Date().toLocaleTimeString(),
      }]);
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are Dr. Safety, an experienced safety consultant and mental health professional. Focus on providing supportive, professional advice about personal safety, emergency situations, and mental wellbeing. Always maintain a calm, compassionate, and professional tone. If someone appears to be in immediate danger, recommend contacting emergency services. Remember to: 1) Show empathy and understanding 2) Provide practical safety advice 3) Recommend professional help when needed 4) Prioritize the user's wellbeing and safety"
            },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.text,
            })),
            {
              role: userMessage.role,
              content: userMessage.text,
            }
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const replyText = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: replyText.trim(),
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Sorry, something went wrong. Please try again.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-3xl mx-auto border rounded-lg overflow-hidden bg-background">
      <DashBoard_Navbar />
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Consultant Chat</h2>
      <Link 
        href="/dashboard" 
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
              )}

              <div className="flex flex-col gap-1 max-w-[85%]">
                <div
                  className={`p-3 rounded-xl ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <span className="text-xs text-muted-foreground px-2">
                  {msg.timestamp}
                </span>
              </div>

              {msg.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white">U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-xl">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4 bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="rounded-full px-6 focus-visible:ring-1"
          />
          <Button
            onClick={handleSend}
            className="rounded-full aspect-square p-3"
            disabled={!input.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}