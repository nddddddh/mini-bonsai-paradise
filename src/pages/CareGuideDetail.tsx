
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, BookmarkPlus, ThumbsUp, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

// Sample article content
const articles = {
  "cham-soc-cay-trong-nha": {
    title: "Cách chăm sóc cây xanh trong nhà",
    category: "basics",
    author: "Nguyễn Thảo",
    date: "2024-04-10",
    readTime: "8 phút đọc",
    heroImage: "https://images.unsplash.com/photo-1466781783364-36c955e42a7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
    content: `
      <h2>1. Chọn cây phù hợp với không gian</h2>
      <p>Trước khi bắt đầu, hãy chắc chắn rằng bạn chọn loài cây phù hợp với không gian sống của mình. Xem xét các yếu tố như:</p>
      <ul>
        <li>Kích thước khi trưởng thành của cây</li>
        <li>Điều kiện ánh sáng trong không gian của bạn</li>
        <li>Mức độ ẩm và nhiệt độ</li>
      </ul>
      <p>Một số loài cây dễ chăm sóc cho người mới bắt đầu bao gồm: Trầu bà, Trúc mây, Lưỡi hổ, Cung điện, và Lan Ý.</p>
      
      <h2>2. Hiểu về nhu cầu ánh sáng</h2>
      <p>Ánh sáng là yếu tố quan trọng nhất đối với sự sống của cây. Các loại cây khác nhau có nhu cầu ánh sáng khác nhau:</p>
      <ul>
        <li><strong>Ánh sáng cao:</strong> 6 giờ ánh sáng trực tiếp mỗi ngày</li>
        <li><strong>Ánh sáng trung bình:</strong> Ánh sáng gián tiếp sáng suốt cả ngày</li>
        <li><strong>Ánh sáng thấp:</strong> Ánh sáng gián tiếp một vài giờ mỗi ngày</li>
      </ul>
      <p>Hầu hết các cây trong nhà thích ánh sáng gián tiếp sáng. Nơi tốt nhất thường là gần cửa sổ phía đông hoặc phía tây.</p>
      
      <h2>3. Tưới nước đúng cách</h2>
      <p>Tưới nước quá nhiều là nguyên nhân phổ biến nhất khiến cây trong nhà chết. Thay vì tuân theo lịch trình cứng nhắc:</p>
      <ol>
        <li>Kiểm tra độ ẩm của đất bằng cách đưa ngón tay vào đất sâu khoảng 1-2 cm</li>
        <li>Chỉ tưới khi đất đã khô</li>
        <li>Tưới kỹ cho đến khi nước chảy ra từ lỗ thoát nước ở đáy chậu</li>
        <li>Đổ hết nước dư thừa trong đĩa lót để tránh úng rễ</li>
      </ol>
      <p>Cây có lá dày, nhiều thịt thường cần ít nước hơn, trong khi cây có lá mỏng, lớn có thể cần nhiều nước hơn.</p>
      
      <h2>4. Kiểm soát độ ẩm</h2>
      <p>Nhiều cây trong nhà có nguồn gốc từ rừng nhiệt đới và cần độ ẩm cao hơn mức thông thường trong nhà. Để tăng độ ẩm:</p>
      <ul>
        <li>Phun sương lên lá (trừ các loài có lông hoặc lá nhạy cảm)</li>
        <li>Đặt chậu lên khay sỏi có nước (đảm bảo đáy chậu không ngâm trong nước)</li>
        <li>Nhóm các cây lại với nhau để tạo vi khí hậu</li>
        <li>Sử dụng máy tạo độ ẩm gần khu vực đặt cây</li>
      </ul>
      
      <h2>5. Bón phân phù hợp</h2>
      <p>Cây trong nhà cần được bón phân định kỳ để duy trì sức khỏe:</p>
      <ul>
        <li>Mùa xuân và mùa hè: Bón phân mỗi 4-6 tuần</li>
        <li>Mùa thu và mùa đông: Giảm hoặc ngừng bón phân</li>
        <li>Sử dụng phân bón cân bằng dành cho cây trong nhà</li>
        <li>Pha loãng phân bón với nồng độ thấp hơn chỉ dẫn trên bao bì</li>
      </ul>
      <p>"Ít hơn nhiều hơn" là nguyên tắc tốt khi bón phân cho cây trong nhà.</p>
      
      <h2>6. Cắt tỉa và làm sạch</h2>
      <p>Cắt tỉa và làm sạch đều đặn sẽ giúp cây của bạn trông đẹp hơn và khỏe mạnh hơn:</p>
      <ul>
        <li>Loại bỏ lá và cành chết hoặc bị hư hại</li>
        <li>Lau lá bằng khăn ẩm để loại bỏ bụi (giúp cây quang hợp tốt hơn)</li>
        <li>Cắt tỉa để khuyến khích sự phát triển cân đối và ngăn cây trở nên cao nghệu</li>
      </ul>
      
      <h2>7. Thay chậu khi cần thiết</h2>
      <p>Cây sẽ cần được thay chậu khi:</p>
      <ul>
        <li>Rễ mọc ra từ lỗ thoát nước ở đáy chậu</li>
        <li>Cây phát triển chậm mặc dù được chăm sóc tốt</li>
        <li>Nước chảy ra khỏi chậu quá nhanh khi tưới</li>
        <li>Cây bị mất cân đối so với kích thước chậu</li>
      </ul>
      <p>Khi thay chậu, chọn chậu lớn hơn chậu cũ 2-4 cm và sử dụng đất trồng chất lượng cao dành riêng cho cây trong nhà.</p>
      
      <h2>8. Kiểm soát sâu bệnh</h2>
      <p>Kiểm tra cây của bạn thường xuyên để phát hiện sớm dấu hiệu của sâu bệnh:</p>
      <ul>
        <li>Rệp: Côn trùng nhỏ màu xanh hoặc đen trên thân và lá non</li>
        <li>Nhện đỏ: Mạng nhện nhỏ và chấm đỏ dưới lá</li>
        <li>Bọ cánh cứng: Vết đốm trắng trên lá</li>
        <li>Bệnh nấm: Đốm đen hoặc trắng trên lá</li>
      </ul>
      <p>Xử lý sớm bằng xà phòng côn trùng nhẹ, cồn rubbing, hoặc dầu neem. Cách ly cây bị nhiễm bệnh để ngăn lây lan.</p>
    `,
    relatedArticles: [
      { id: 2, title: 'Lịch trình tưới nước cho các loại cây phổ biến', slug: 'lich-trinh-tuoi-nuoc' },
      { id: 3, title: 'Yêu cầu ánh sáng cho từng loại cây', slug: 'yeu-cau-anh-sang' }
    ]
  },
  "lich-trinh-tuoi-nuoc": {
    title: "Lịch trình tưới nước cho các loại cây phổ biến",
    category: "watering",
    author: "Trần Minh",
    date: "2024-03-25",
    readTime: "6 phút đọc",
    heroImage: "https://images.unsplash.com/photo-1562517634-baa2da3accb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2F0ZXJpbmclMjBwbGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    content: `
      <h2>Nguyên tắc tưới nước cho cây trồng</h2>
      <p>Tưới nước đúng cách là một trong những kỹ năng quan trọng nhất khi chăm sóc cây. Việc tưới quá nhiều có thể gây ra các vấn đề nghiêm trọng như thối rễ, trong khi tưới quá ít có thể làm cây bị khô héo và chết.</p>
      
      <h2>Dấu hiệu cây cần nước</h2>
      <p>Thay vì tuân theo lịch trình cứng nhắc, hãy quan sát cây của bạn để biết khi nào chúng cần nước:</p>
      <ul>
        <li>Đất khô tới độ sâu 2-3 cm</li>
        <li>Lá mềm, héo hoặc cong</li>
        <li>Đất tách khỏi thành chậu</li>
        <li>Chậu cây nhẹ hơn bình thường khi nhấc lên</li>
      </ul>
      
      <h2>Lịch trình tưới nước theo loại cây</h2>
      
      <h3>1. Cây xương rồng và mọng nước</h3>
      <p><strong>Tần suất:</strong> Mỗi 2-4 tuần</p>
      <p><strong>Lượng nước:</strong> Tưới kỹ nhưng để đất khô hoàn toàn giữa các lần tưới</p>
      <p><strong>Mùa đông:</strong> Giảm tần suất xuống 4-6 tuần một lần</p>
      <p><strong>Ví dụ:</strong> Xương rồng, Sen đá, Lưỡi hổ, Nha đam</p>
      
      <h3>2. Cây nhiệt đới</h3>
      <p><strong>Tần suất:</strong> Mỗi 1-2 tuần</p>
      <p><strong>Lượng nước:</strong> Giữ đất hơi ẩm nhưng không ướt, để khô 2-3 cm lớp đất trên cùng giữa các lần tưới</p>
      <p><strong>Độ ẩm bổ sung:</strong> Phun sương lên lá thường xuyên</p>
      <p><strong>Ví dụ:</strong> Trầu bà, Cây Trường Sinh, Cây Bạch Mã Hoàng Tử, Vạn Niên Thanh</p>
      
      <h3>3. Cây lá rộng</h3>
      <p><strong>Tần suất:</strong> Mỗi 7-10 ngày</p>
      <p><strong>Lượng nước:</strong> Giữ ẩm đều, tránh để đất quá khô hoặc quá ướt</p>
      <p><strong>Mùa hè:</strong> Có thể cần tưới thường xuyên hơn</p>
      <p><strong>Ví dụ:</strong> Cây Đuôi Công, Cây Kim Tiền, Cây Sung Cảnh, Cây Phát Tài</p>
      
      <h3>4. Cây ưa ẩm</h3>
      <p><strong>Tần suất:</strong> Mỗi 3-5 ngày</p>
      <p><strong>Lượng nước:</strong> Giữ đất luôn ẩm nhưng không ngấm nước</p>
      <p><strong>Độ ẩm:</strong> Đảm bảo độ ẩm cao xung quanh cây</p>
      <p><strong>Ví dụ:</strong> Dương Xỉ, Địa Lan, Cây Tùng La Hán, Cây Thủy Trúc</p>
      
      <h2>Kỹ thuật tưới nước hiệu quả</h2>
      
      <h3>Tưới từ trên xuống</h3>
      <p>Đây là phương pháp phổ biến nhất:</p>
      <ol>
        <li>Tưới chậm và đều khắp bề mặt đất</li>
        <li>Tiếp tục tưới cho đến khi nước chảy ra từ lỗ thoát nước ở đáy chậu</li>
        <li>Đổ bỏ nước thừa trong đĩa lót sau 15-30 phút</li>
      </ol>
      
      <h3>Tưới từ dưới lên</h3>
      <p>Phương pháp này tốt cho những cây nhạy cảm với nước trên lá:</p>
      <ol>
        <li>Đặt chậu cây trong một bồn nước nông (2-3 cm)</li>
        <li>Để cây hút nước qua các lỗ thoát nước trong 10-15 phút</li>
        <li>Lấy cây ra và để nước dư thừa chảy ra hết</li>
      </ol>
      
      <h2>Điều chỉnh lịch tưới nước theo mùa</h2>
      <p>Hầu hết các cây cần ít nước hơn trong mùa thu và mùa đông:</p>
      <ul>
        <li><strong>Mùa xuân/hè:</strong> Tuân theo hướng dẫn tưới nước thông thường</li>
        <li><strong>Mùa thu/đông:</strong> Giảm tần suất tưới xuống khoảng 25-50%</li>
      </ul>
      
      <h2>Chất lượng nước</h2>
      <p>Chất lượng nước bạn sử dụng cũng quan trọng không kém:</p>
      <ul>
        <li>Nước để qua đêm: Để nước máy trong bình qua đêm để chlorine bay hơi</li>
        <li>Nước mưa: Lựa chọn tuyệt vời nếu có sẵn</li>
        <li>Nước lọc: Phù hợp cho hầu hết các loại cây</li>
        <li>Tránh nước quá lạnh: Sử dụng nước ở nhiệt độ phòng</li>
      </ul>
      
      <h2>Sai lầm phổ biến khi tưới nước</h2>
      <ul>
        <li>Tưới quá thường xuyên và ít mỗi lần</li>
        <li>Tuân theo lịch trình cứng nhắc mà không kiểm tra độ ẩm của đất</li>
        <li>Để cây ngâm trong nước thừa</li>
        <li>Tưới lên lá của những cây không thích ẩm ướt trên lá</li>
      </ul>
    `,
    relatedArticles: [
      { id: 1, title: 'Cách chăm sóc cây xanh trong nhà', slug: 'cham-soc-cay-trong-nha' },
      { id: 4, title: 'Loại đất trồng phù hợp cho từng loại cây', slug: 'dat-trong-phu-hop' }
    ]
  }
};

const CareGuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // Here we're just simulating with the sample data
    if (slug && articles[slug as keyof typeof articles]) {
      setArticle(articles[slug as keyof typeof articles]);
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [slug]);
  
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
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative -mt-32 md:-mt-40">
            <div className="bg-white rounded-t-lg shadow-lg max-w-3xl mx-auto p-6 md:p-8">
              <div className="mb-4">
                <div className="inline-block px-2 py-1 text-xs bg-nature-100 text-nature-800 rounded-full">
                  {article.category === 'basics' ? '🌱 Kiến thức cơ bản' : 
                   article.category === 'watering' ? '💧 Tưới nước' : 
                   article.category === 'light' ? '☀️ Ánh sáng' :
                   article.category === 'soil' ? '🥥 Đất trồng' :
                   article.category === 'fertilizer' ? '🌿 Phân bón' : '🐛 Sâu bệnh hại'}
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-4">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div>Tác giả: <span className="font-medium text-gray-800">{article.author}</span></div>
                <div>Ngày: <span className="font-medium text-gray-800">{article.date}</span></div>
                <div className="bg-gray-200 h-1 w-1 rounded-full"></div>
                <div>{article.readTime}</div>
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
                  {article.author[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{article.author}</h3>
                  <p className="text-gray-600">Chuyên gia về cây cảnh và trang trí nội thất</p>
                </div>
              </div>
            </div>
            
            {/* Related articles */}
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.relatedArticles.map((related: any) => (
                    <Link key={related.id} to={`/care-guide/${related.slug}`} className="group">
                      <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-5">
                          <h3 className="text-lg font-medium group-hover:text-nature-600 transition-colors">
                            {related.title}
                          </h3>
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
