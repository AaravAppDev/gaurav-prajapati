import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Products>('products');
      setProducts(items);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-secondary/30">
        <div className="max-w-[120rem] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">M</span>
              </div>
              <span className="font-heading text-xl font-bold text-primary">MeeshoStore</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="font-paragraph text-primary hover:text-primary/80 transition-colors">
                Products
              </Link>
              <Link to="/manage" className="font-paragraph text-primary hover:text-primary/80 transition-colors">
                Manage
              </Link>
              <Link to="/about" className="font-paragraph text-primary hover:text-primary/80 transition-colors">
                About
              </Link>
            </nav>

            <Link to="/manage">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto relative">
        <div className="relative bg-gradient-to-br from-secondary/20 to-background min-h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent z-10"></div>
          
          <div className="relative z-20 px-6 py-20 max-w-4xl">
            <h1 className="font-heading text-6xl md:text-7xl font-bold text-primary leading-tight mb-6">
              Discover Quality
              <br />
              <span className="text-primary italic">Products</span> Online
            </h1>
            
            <p className="font-paragraph text-lg text-primary/80 mb-8 max-w-2xl">
              Explore our curated collection of premium products, carefully selected for quality and value. 
              Shop directly through our Meesho store for the best deals.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 bg-background border-secondary/50 focus:border-primary font-paragraph"
              />
            </div>
          </div>

          {/* Hero Image */}
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
            <Image
              src="https://static.wixstatic.com/media/201dd1_ff8ed0ce3e2142c280cd7cd4feec796a~mv2.png?originWidth=768&originHeight=576"
              alt="Person shopping online with products"
              className="w-full h-full object-cover rounded-l-3xl"
              width={800}
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-[120rem] mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="font-heading text-4xl font-bold text-primary mb-4">
            Featured Products
          </h2>
          <p className="font-paragraph text-primary/70 text-lg">
            Browse our latest collection and find exactly what you're looking for
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-secondary/20 rounded-2xl p-6 animate-pulse">
                <div className="bg-secondary/40 rounded-xl h-48 mb-4"></div>
                <div className="bg-secondary/40 rounded h-4 mb-2"></div>
                <div className="bg-secondary/40 rounded h-4 w-3/4 mb-4"></div>
                <div className="bg-secondary/40 rounded h-8"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-secondary/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Search className="w-12 h-12 text-primary/40" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-primary mb-2">
              {searchTerm ? 'No products found' : 'No products available'}
            </h3>
            <p className="font-paragraph text-primary/60 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms or browse all products'
                : 'Start by adding some products to showcase your store'
              }
            </p>
            {!searchTerm && (
              <Link to="/manage">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-background border border-secondary/30 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.mainImage || "https://static.wixstatic.com/media/201dd1_9b5ac867d3f14aaea5894d4deae434ac~mv2.png?originWidth=256&originHeight=256"}
                    alt={product.productName || 'Product image'}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={300}
                  />
                  {product.sku && (
                    <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-2 py-1 rounded-lg text-xs font-paragraph font-medium">
                      SKU: {product.sku}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-primary mb-2 line-clamp-2">
                    {product.productName}
                  </h3>
                  
                  {product.description && (
                    <p className="font-paragraph text-primary/70 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    {product.price && (
                      <span className="font-heading text-2xl font-bold text-primary">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  
                  {product.meeshoLink && (
                    <a
                      href={product.meeshoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group">
                        Shop on Meesho
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-20">
        <div className="max-w-[120rem] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                  <span className="text-primary font-heading font-bold text-sm">M</span>
                </div>
                <span className="font-heading text-xl font-bold">MeeshoStore</span>
              </div>
              <p className="font-paragraph text-primary-foreground/80">
                Your trusted partner for quality products at unbeatable prices. 
                Shop with confidence through our Meesho store.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  All Products
                </Link>
                <Link to="/manage" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Manage Products
                </Link>
                <Link to="/about" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold mb-4">Contact</h4>
              <p className="font-paragraph text-primary-foreground/80">
                Questions about our products? Get in touch with us for personalized assistance.
              </p>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="font-paragraph text-primary-foreground/60">
              © 2024 MeeshoStore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}