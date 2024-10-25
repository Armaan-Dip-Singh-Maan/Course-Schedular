import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';

interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
  anonymous: boolean;
}

const CommunityChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(36).substring(7),
      userId: anonymous ? 'anonymous' : 'user123',
      text: newMessage,
      timestamp: new Date(),
      anonymous
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-[600px] flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-indigo-500" />
          Community Chat
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.userId === 'user123' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 
              flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.userId === 'user123'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">
                  {message.anonymous ? 'Anonymous' : message.userId}
                </span>
                <span className="text-xs opacity-75">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="anonymousChat"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600"
          />
          <label htmlFor="anonymousChat" className="text-sm">Post anonymously</label>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommunityChat;