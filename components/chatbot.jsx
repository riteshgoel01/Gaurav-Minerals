"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hello! 👋 Welcome to Gaurav Minerals. I'm here to help you with information about our industrial minerals and chemicals.\n\nYou can ask me about:\n• Our products\n• Pricing & quotations\n• Delivery & shipping\n• Quality certifications",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async (e) => {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage = {
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: data.reply,
            timestamp: data.timestamp,
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "Sorry, I couldn't process that. Please try again or contact us at +91-9211996000.",
            timestamp: new Date().toISOString(),
          },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Connection error. Please check your internet and try again.",
          timestamp: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = [
    "What products do you offer?",
    "Get a price quote",
    "Delivery info",
    "Contact details",
  ]

  // Simple markdown-like rendering for bold text and bullet points
  const renderContent = (text) => {
    return text.split("\n").map((line, i) => {
      // Bold text: **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      const rendered = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={j} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <span key={j}>{part}</span>
      })

      // Bullet points
      if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
        return (
          <div key={i} className="flex gap-1.5 ml-1">
            <span className="text-primary flex-shrink-0">•</span>
            <span>{rendered}</span>
          </div>
        )
      }

      return (
        <div key={i} className={line.trim() === "" ? "h-2" : ""}>
          {rendered}
        </div>
      )
    })
  }

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-160px)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-primary-foreground font-semibold text-sm">
                  Gaurav Minerals
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-primary-foreground/70 text-xs">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-primary-foreground/10 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "bot"
                      ? "bg-primary/10"
                      : "bg-primary"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <User className="h-3.5 w-3.5 text-primary-foreground" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-card border border-border text-foreground rounded-bl-md"
                      : "bg-primary text-primary-foreground rounded-br-md"
                  }`}
                >
                  {msg.role === "bot" ? renderContent(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (shown only when few messages) */}
          {messages.length <= 1 && !isLoading && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    setInput(action)
                    setTimeout(() => {
                      const fakeEvent = { preventDefault: () => {} }
                      setInput("")
                      setMessages((prev) => [
                        ...prev,
                        { role: "user", content: action, timestamp: new Date().toISOString() },
                      ])
                      setIsLoading(true)
                      fetch("/api/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message: action }),
                      })
                        .then((r) => r.json())
                        .then((data) => {
                          if (data.success) {
                            setMessages((prev) => [
                              ...prev,
                              { role: "bot", content: data.reply, timestamp: data.timestamp },
                            ])
                          }
                        })
                        .finally(() => setIsLoading(false))
                    }, 0)
                  }}
                  className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="p-3 border-t border-border flex items-center gap-2 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              maxLength={500}
              className="flex-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "bg-muted-foreground/20 text-foreground rotate-0"
            : "bg-primary text-primary-foreground"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {/* Notification dot */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </>
        )}
      </button>
    </>
  )
}
