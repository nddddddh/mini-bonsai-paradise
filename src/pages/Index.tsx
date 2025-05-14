
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { plants } from "@/data/plants";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredPlants = plants.slice(0, 4);
  const newArrivals = plants.slice(2, 6);
  const onSale = plants.filter(plant => plant.salePrice);

  const categories = [
    {
      name: "Terrarium",
      image: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      count: plants.filter(p => p.category === "Terrarium").length
    },
    {
      name: "Bonsai",
      image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      count: plants.filter(p => p.category === "Bonsai").length
    },
    {
      name: "Sen Đá",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
      count: plants.filter(p => p.category === "Sen Đá").length
    },
    {
      name: "Cây Không Khí",
      image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=713&q=80",
      count: plants.filter(p => p.category === "Cây Không Khí").length
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-nature-50">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Mang <span className="text-nature-600">thiên nhiên</span> vào không gian sống của bạn
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              Khám phá bộ sưu tập các loại cây cảnh mini độc đáo, được chọn lọc kỹ lưỡng để làm đẹp không gian và thanh lọc không khí.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button className="bg-nature-600 hover:bg-nature-700 text-white">
                  Khám phá ngay
                </Button>
              </Link>
              <Link to="/care-guide">
                <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50">
                  Hướng dẫn chăm sóc
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1604762510084-bd5d755c6d5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
              alt="Cây cảnh mini trang trí" 
              className="rounded-lg shadow-2xl w-full object-cover" 
              style={{ maxHeight: "550px" }}
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center gap-2">
                <Leaf className="text-nature-500 w-8 h-8" />
                <div>
                  <p className="font-semibold">100% Cây khỏe mạnh</p>
                  <p className="text-sm text-gray-500">Đảm bảo chất lượng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Danh mục sản phẩm</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá các loại cây cảnh mini phù hợp với từng không gian và phong cách sống của bạn.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link to={`/collections/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                <div className="relative rounded-lg overflow-hidden group h-64 shadow-md">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                    <h3 className="font-semibold text-xl mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} sản phẩm</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Tabs */}
      <section className="py-16 bg-nature-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Sản phẩm nổi bật</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những lựa chọn hoàn hảo để làm đẹp không gian sống của bạn
            </p>
          </div>
          
          <Tabs defaultValue="featured" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white shadow-sm">
                <TabsTrigger value="featured" className="px-6">Phổ biến nhất</TabsTrigger>
                <TabsTrigger value="new" className="px-6">Hàng mới về</TabsTrigger>
                <TabsTrigger value="sale" className="px-6">Đang giảm giá</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="featured">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPlants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sale">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {onSale.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-10 text-center">
            <Link to="/products">
              <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50">
                Xem tất cả sản phẩm <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tại sao chọn MiniPlants?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến những sản phẩm chất lượng cao và trải nghiệm mua sắm tuyệt vời
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-nature-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-nature-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-4">Chất lượng đảm bảo</h3>
              <p className="text-gray-600">
                Tất cả cây cảnh của chúng tôi đều được tuyển chọn kỹ lưỡng, khỏe mạnh và sẵn sàng cho không gian sống của bạn.
              </p>
            </div>
            
            <div className="bg-nature-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-nature-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-4">Giao hàng nhanh chóng</h3>
              <p className="text-gray-600">
                Đóng gói cẩn thận và giao hàng tận nơi bảo đảm cây đến tay bạn trong tình trạng hoàn hảo.
              </p>
            </div>
            
            <div className="bg-nature-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-nature-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-4">Hỗ trợ tận tâm</h3>
              <p className="text-gray-600">
                Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng giúp đỡ bạn với mọi thắc mắc về chăm sóc cây.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 bg-nature-900 bg-[url('https://images.unsplash.com/photo-1482859454392-5b7c972ab642?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center bg-blend-multiply text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Khách hàng nói gì về chúng tôi</h2>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <div className="mb-6">
                <svg className="w-12 h-12 text-nature-200 opacity-50 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-xl mb-6 leading-relaxed">
                Tôi rất hài lòng với các sản phẩm từ MiniPlants. Terrarium tôi mua gần 6 tháng trước vẫn phát triển tốt và tạo điểm nhấn tuyệt vời cho góc làm việc của tôi. Cảm ơn vì những lời khuyên hữu ích về cách chăm sóc.
              </p>
              <div>
                <p className="font-semibold text-lg">Nguyễn Minh Anh</p>
                <p className="text-nature-200">Khách hàng thân thiết</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Đăng ký nhận thông tin</h2>
            <p className="text-gray-600 mb-8">
              Nhận thông tin về sản phẩm mới, mẹo chăm sóc cây và ưu đãi đặc biệt
            </p>
            
            <form className="flex flex-col md:flex-row gap-3 justify-center">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="px-4 py-3 rounded-md border border-gray-300 flex-grow max-w-md focus:outline-none focus:ring-2 focus:ring-nature-500"
                required
              />
              <Button className="bg-nature-600 hover:bg-nature-700 text-white">
                Đăng ký
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Chúng tôi tôn trọng quyền riêng tư của bạn và sẽ không bao giờ chia sẻ thông tin của bạn.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
