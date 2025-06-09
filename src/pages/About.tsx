import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AboutProps {
  navigate: (page: string, params?: { [key: string]: string }) => void;
}

const About = ({ navigate }: AboutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Về BonsaiHub</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Câu chuyện của chúng tôi</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                BonsaiHub được thành lập với sứ mệnh mang đến những cây cảnh chất lượng cao 
                và dịch vụ chăm sóc tận tâm cho khách hàng trên toàn quốc.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi tin rằng cây cảnh không chỉ làm đẹp không gian sống mà còn 
                mang lại sự bình yên và năng lượng tích cực cho cuộc sống.
              </p>
            </div>
            <div className="aspect-square bg-nature-100 rounded-lg"></div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Đội ngũ của chúng tôi</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Chúng tôi là một đội ngũ đam mê cây cảnh và có nhiều năm kinh nghiệm trong lĩnh vực này.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="aspect-square bg-nature-100 rounded-full mb-4"></div>
                <h3 className="text-lg font-semibold">Nguyễn Văn A</h3>
                <p className="text-gray-500">CEO</p>
              </div>
              <div>
                <div className="aspect-square bg-nature-100 rounded-full mb-4"></div>
                <h3 className="text-lg font-semibold">Trần Thị B</h3>
                <p className="text-gray-500">Quản lý sản phẩm</p>
              </div>
              <div>
                <div className="aspect-square bg-nature-100 rounded-full mb-4"></div>
                <h3 className="text-lg font-semibold">Lê Công C</h3>
                <p className="text-gray-500">Chuyên gia chăm sóc cây</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
