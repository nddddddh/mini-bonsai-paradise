
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: number;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

const WishlistButton = ({ 
  productId, 
  className, 
  size = 'default',
  variant = 'outline'
}: WishlistButtonProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => toggleWishlist(productId)}
      className={cn(
        'transition-colors',
        inWishlist && 'text-red-500 border-red-500 hover:bg-red-50',
        className
      )}
    >
      <Heart 
        className={cn(
          'w-4 h-4',
          size === 'sm' && 'w-3 h-3',
          size === 'lg' && 'w-5 h-5',
          inWishlist && 'fill-current'
        )} 
      />
    </Button>
  );
};

export default WishlistButton;
