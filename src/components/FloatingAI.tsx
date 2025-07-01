
import React, { useState } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FloatingAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', content: 'Xin chào! Tôi là AI hỗ trợ của BonsaiHub. Tôi có thể giúp gì cho bạn?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        type: 'ai', 
        content: 'Cảm ơn bạn đã liên hệ! Hiện tại tôi đang trong giai đoạn phát triển. Bạn có thể liên hệ qua Facebook hoặc điện thoại để được hỗ trợ tốt nhất.' 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 animate-fade-in">
          <Card className="h-full flex flex-col shadow-2xl border-0 bg-white">
            <CardHeader className="bg-nature-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-6 h-6" />
                  <CardTitle className="text-lg">AI Hỗ trợ</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-nature-700 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-nature-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </CardContent>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-nature-600 hover:bg-nature-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-center w-14 h-14 bg-nature-600 hover:bg-nature-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
          aria-label="Mở chat AI"
        >
          {isOpen ? (
            <X className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <Bot className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
          )}
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-nature-400 opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500"></div>
          
          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-full border-2 border-nature-300 opacity-50 animate-ping"></div>
        </Button>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Chat với AI
              <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingAI;
