'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  action?: { type: string; description: string };
};

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm your WellnessNursePro AI assistant. I can help you manage your site \u2014 just tell me what you'd like to do. For example: 'Create a new blog post about morning routines', 'Change the primary color to navy blue', or 'Add a new page called About Us'. What would you like to do?",
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send conversation history for context
      const history = [...messages, userMessage]
        .filter((m) => m !== WELCOME_MESSAGE)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/admin/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Error: ${data.error || 'Something went wrong'}. Please try again.` },
        ]);
        return;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || data.response || 'Done! Is there anything else you need?',
        action: data.action
          ? { type: data.action.type, description: `${data.action.type}: ${JSON.stringify(data.action.result)}` }
          : undefined,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function renderContent(content: string) {
    // Simple markdown-like rendering
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];

    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${i}`}
              className="bg-gray-800 text-gray-100 rounded-lg p-3 my-2 text-sm overflow-x-auto font-mono"
            >
              {codeLines.join('\n')}
            </pre>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      // Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={i} className="font-bold text-sm mt-3 mb-1">
            {line.slice(4)}
          </h4>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={i} className="font-bold mt-3 mb-1">
            {line.slice(3)}
          </h3>
        );
        return;
      }

      // List items
      if (line.match(/^[-*]\s/)) {
        elements.push(
          <div key={i} className="flex gap-2 ml-2">
            <span className="text-gray-400">&#x2022;</span>
            <span>{renderInline(line.slice(2))}</span>
          </div>
        );
        return;
      }

      // Numbered list
      if (line.match(/^\d+\.\s/)) {
        const num = line.match(/^(\d+)\.\s/)?.[1];
        elements.push(
          <div key={i} className="flex gap-2 ml-2">
            <span className="text-gray-400 font-medium">{num}.</span>
            <span>{renderInline(line.replace(/^\d+\.\s/, ''))}</span>
          </div>
        );
        return;
      }

      // Empty line
      if (!line.trim()) {
        elements.push(<div key={i} className="h-2" />);
        return;
      }

      // Normal paragraph
      elements.push(
        <p key={i} className="leading-relaxed">
          {renderInline(line)}
        </p>
      );
    });

    return elements;
  }

  function renderInline(text: string): React.ReactNode {
    // Bold
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Inline code
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((cp, j) => {
        if (cp.startsWith('`') && cp.endsWith('`')) {
          return (
            <code
              key={`${i}-${j}`}
              className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
            >
              {cp.slice(1, -1)}
            </code>
          );
        }
        return cp;
      });
    });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-0px)] lg:h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
        <p className="text-xs text-gray-500">Ask me to manage your site, create content, or change settings</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%]`}>
              {/* Action card */}
              {msg.action && (
                <div className="mb-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-emerald-600 font-medium">
                      {msg.action.type === 'error' ? '⚠️' : '✅'} {msg.action.description}
                    </span>
                  </div>
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-[#2d6a4f] text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}
              >
                {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-gray-200 px-4 md:px-6 py-4">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent text-gray-900 text-sm resize-none"
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-xl font-semibold text-white text-sm transition-colors duration-150 disabled:opacity-40"
            style={{ backgroundColor: '#2d6a4f' }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
