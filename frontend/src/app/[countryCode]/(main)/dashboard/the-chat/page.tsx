'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content }),
      });

      // Add a new assistant message placeholder
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      // Process the response stream as it arrives
      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error('No reader available on response body');
      }
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { done: doneReading, value } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value || new Uint8Array(), { stream: true });
        // Update the assistant message immutably
        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.role === 'assistant') {
            updated[updated.length - 1] = { 
              ...lastMsg, 
              content: lastMsg.content + chunk 
            };
          }
          return updated;
        });
      }
      // Flush any remaining text in the decoder (if needed)
      const remaining = decoder.decode(new Uint8Array(), { stream: false });
      if (remaining) {
        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.role === 'assistant') {
            updated[updated.length - 1] = { 
              ...lastMsg, 
              content: lastMsg.content + remaining 
            };
          }
          return updated;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="border border-gray-300 p-4 h-[80vh] w-full overflow-y-auto mb-4 rounded-xl">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong>
            <div className="mt-2 whitespace-pre-wrap break-words">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div>
            <strong>Assistant:</strong> typing...
          </div>
        )}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="w-4/5 p-2 border rounded-xl border-gray-300"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="py-2 px-4 ml-2 border rounded-xl border-gray-300"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
