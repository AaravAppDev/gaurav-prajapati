import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowLeft, Share2, ExternalLink } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const item = await BaseCrudService.getById<Products>('products', id);
        setProduct(item);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">Product Not Found</h1>
        <Button onClick={() => navigate('/')} className="flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-[100rem] mx-auto px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-6 text-foreground hover:text-foreground/80"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[100rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white rounded-lg p-8">
            {product.mainImage ? (
              <Image
                src={product.mainImage}
                alt={product.productName || 'Product'}
                width={400}
                className="w-full h-auto object-contain max-h-[500px]"
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-100 rounded flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                {product.productName}
              </h1>
              {product.sku && (
                <p className="text-sm text-gray-600 mb-4">SKU: {product.sku}</p>
              )}
            </div>

            {/* Price */}
            {product.price !== undefined && (
              <div className="bg-secondary rounded-lg p-6">
                <p className="text-sm text-secondary-foreground mb-2">Price</p>
                <p className="text-3xl font-bold text-foreground">
                  ₹{product.price.toFixed(2)}
                </p>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="text-lg font-heading font-semibold text-foreground mb-3">
                  Description
                </h2>
                <p className="text-base font-paragraph text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-6">
              {product.meeshoLink && (
                <a href={product.meeshoLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <ExternalLink size={20} />
                    View on Meesho
                  </Button>
                </a>
              )}

              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 border-foreground text-foreground hover:bg-foreground/5"
              >
                <Share2 size={20} />
                {copied ? 'Link Copied!' : 'Copy Share Link'}
              </Button>
            </div>

            {/* Share Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                📎 Share this product with others using the link above
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
