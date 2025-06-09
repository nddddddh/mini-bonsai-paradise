
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { PageProps } from '@/types/navigation';

const CartPage = ({ navigate }: PageProps) => {
  return (
    <>
      <Navbar navigate={navigate} />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <Cart />
        </div>
      </div>
      <Footer navigate={navigate} />
    </>
  );
};

export default CartPage;
