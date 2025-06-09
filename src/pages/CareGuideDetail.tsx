import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, BookmarkPlus, ThumbsUp, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Care guide categories for displaying
const careCategories = [
  { id: 'basics', name: 'Kiến thức cơ bản', icon: '🌱' },
  { id: 'watering', name: 'Tưới nước', icon: '💧' },
  { id: 'light', name: 'Ánh sáng', icon: '☀️' },
  { id: 'soil', name: 'Đất trồng', icon: '🥥' },
  { id: 'fertilizer', name: 'Phân bón', icon: '🌿' },
  { id: 'pests', name: 'Sâu bệnh hại', icon: '🐛' },
];

interface CareGuide {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string;
  slug: string;
  featured: boolean;
  created_at: string;
}

const CareGuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<CareGuide | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<CareGuide[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        // Fetch main article
        const { data: articleData, error: articleError } = await supabase
          .from('care_guides')
          .select('*')
          .eq('slug', slug)
          .single();

        if (articleError) {
          console.error('Error fetching article:', articleError);
          setLoading(false);
          return;
        }

        setArticle(articleData);

        // Fetch related articles (same category, excluding current article)
        if (articleData) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('care_guides')
            .select('*')
            .eq('category', articleData.category)
            .neq('id', articleData.id)
            .limit(2);

          if (relatedError) {
            console.error('Error fetching related articles:', relatedError);
          } else {
            setRelatedArticles(relatedData || []);
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-16 px-4 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Đang tải bài viết...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!article) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-16 px-4 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h1>
            <p className="mb-6">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild>
              <Link to="/care-guide">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại trang hướng dẫn
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const categoryInfo = careCategories.find(cat => cat.id === article.category);
  
  return (
    <>
      <Navbar />
      <div className="bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-600 hover:text-nature-600">Trang chủ</Link>
              <span className="text-gray-400">/</span>
              <Link to="/care-guide" className="text-gray-600 hover:text-nature-600">Chăm sóc</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-800 font-medium">{article.title}</span>
            </div>
          </div>
        </div>
        
        {/* Hero */}
        <div className="relative">
          <div className="h-64 md:h-96 w-full">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative -mt-32 md:-mt-40">
            <div className="bg-white rounded-t-lg shadow-lg max-w-3xl mx-auto p-6 md:p-8">
              <div className="mb-4">
                <div className="inline-block px-2 py-1 text-xs bg-nature-100 text-nature-800 rounded-full">
                  {categoryInfo?.icon} {categoryInfo?.name}
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-4">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div>Tác giả: <span className="font-medium text-gray-800">Green Garden Team</span></div>
                <div>Ngày: <span className="font-medium text-gray-800">{new Date(article.created_at).toLocaleDateString('vi-VN')}</span></div>
                <div className="bg-gray-200 h-1 w-1 rounded-full"></div>
                <div>5 phút đọc</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-b-lg p-6 md:p-8">
            <div className="prose prose-lg max-w-none prose-headings:text-nature-900 prose-a:text-nature-600 hover:prose-a:text-nature-800"
                 dangerouslySetInnerHTML={{ __html: article.content }}>
            </div>
            
            {/* Actions */}
            <div className="border-t border-gray-200 mt-8 pt-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Hữu ích</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <BookmarkPlus className="h-4 w-4" />
                  <span>Lưu lại</span>
                </Button>
              </div>
              <div>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>Chia sẻ</span>
                </Button>
              </div>
            </div>
            
            {/* Author */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-nature-100 flex items-center justify-center text-nature-700 text-2xl font-bold">
                  🌱
                </div>
                <div>
                  <h3 className="font-bold text-lg">Green Garden Team</h3>
                  <p className="text-gray-600">Chuyên gia về cây cảnh và trang trí nội thất</p>
                </div>
              </div>
            </div>
            
            {/* Related articles */}
            {relatedArticles && relatedArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedArticles.map((related) => (
                    <Link key={related.id} to={`/care-guide/${related.slug}`} className="group">
                      <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img 
                          src={related.image_url} 
                          alt={related.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-5">
                          <h3 className="text-lg font-medium group-hover:text-nature-600 transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-2">{related.excerpt}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Comments */}
            <div className="mt-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Bình luận</h2>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">5 bình luận</span>
              </div>
              <div className="mt-6 p-6 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium">Để lại bình luận của bạn</h3>
                </div>
                <textarea
                  className="w-full rounded-md border border-gray-300 p-3 h-24 focus:outline-none focus:ring-2 focus:ring-nature-500"
                  placeholder="Viết bình luận của bạn tại đây..."
                ></textarea>
                <div className="mt-3 flex justify-end">
                  <Button className="bg-nature-600 hover:bg-nature-700">Gửi bình luận</Button>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link to="/care-guide">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại tất cả bài hướng dẫn
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareGuideDetail;
