
import React, { useState } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  type: 'user' | 'ai';
  content: string;
  isLoading?: boolean;
}

const FloatingAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', content: 'Xin chào! Tôi là AI hỗ trợ của BonsaiHub. Tôi có thể giúp gì cho bạn về cây cảnh?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    
    // Add loading message
    setMessages(prev => [...prev, { type: 'ai', content: 'Đang suy nghĩ...', isLoading: true }]);
    setIsLoading(true);

    try {
      console.log('Sending message to AI:', userMessage);
      
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { message: userMessage }
      });

      console.log('AI response:', data, 'Error:', error);

      if (error) {
        throw error;
      }

      // Remove loading message and add AI response
      setMessages(prev => {
        const newMessages = prev.filter(msg => !msg.isLoading);
        return [...newMessages, { type: 'ai', content: data.response }];
      });

    } catch (error) {
      console.error('Error calling AI:', error);
      
      // Remove loading message and add error message
      setMessages(prev => {
        const newMessages = prev.filter(msg => !msg.isLoading);
        return [...newMessages, { 
          type: 'ai', 
          content: 'Xin lỗi, tôi gặp sự cố kỹ thuật. Bạn có thể liên hệ qua Facebook hoặc điện thoại để được hỗ trợ tốt nhất.' 
        }];
      });

      toast({
        title: "Lỗi",
        description: "Không thể kết nối với AI. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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
                        : message.isLoading
                        ? 'bg-gray-100 text-gray-600 animate-pulse'
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
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-nature-600 hover:bg-nature-700"
                  disabled={isLoading || !inputMessage.trim()}
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
