import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Plus, Edit, Trash2, Save, X, ArrowLeft, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Products>>({
    productName: '',
    description: '',
    price: 0,
    mainImage: '',
    sku: '',
    meeshoLink: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Products>('products');
      setProducts(items);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productName?.trim()) {
      toast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingProduct) {
        await BaseCrudService.update<Products>('products', {
          ...formData,
          _id: editingProduct._id
        });
        toast({
          title: "Success",
          description: "Product updated successfully"
        });
      } else {
        await BaseCrudService.create('products', {
          ...formData,
          _id: crypto.randomUUID()
        });
        toast({
          title: "Success",
          description: "Product added successfully"
        });
      }
      
      resetForm();
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (product: Products) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName || '',
      description: product.description || '',
      price: product.price || 0,
      mainImage: product.mainImage || '',
      sku: product.sku || '',
      meeshoLink: product.meeshoLink || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await BaseCrudService.delete('products', productId);
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      description: '',
      price: 0,
      mainImage: '',
      sku: '',
      meeshoLink: ''
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-secondary/30">
        <div className="max-w-[120rem] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-paragraph">Back to Store</span>
              </Link>
              <div className="w-px h-6 bg-secondary/50"></div>
              <h1 className="font-heading text-2xl font-bold text-primary">Manage Products</h1>
            </div>
            
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-8 border-secondary/30">
            <CardHeader className="bg-secondary/10">
              <CardTitle className="font-heading text-xl text-primary flex items-center justify-between">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                  className="text-primary/60 hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-paragraph text-sm font-medium text-primary mb-2">
                      Product Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      placeholder="Enter product name"
                      className="font-paragraph border-secondary/50 focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block font-paragraph text-sm font-medium text-primary mb-2">
                      Price (₹)
                    </label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className="font-paragraph border-secondary/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-paragraph text-sm font-medium text-primary mb-2">
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your product..."
                    rows={3}
                    className="font-paragraph border-secondary/50 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-paragraph text-sm font-medium text-primary mb-2">
                      SKU
                    </label>
                    <Input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="Product SKU"
                      className="font-paragraph border-secondary/50 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-paragraph text-sm font-medium text-primary mb-2">
                      Main Image URL
                    </label>
                    <Input
                      type="url"
                      value={formData.mainImage}
                      onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="font-paragraph border-secondary/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-paragraph text-sm font-medium text-primary mb-2">
                    Meesho Link
                  </label>
                  <Input
                    type="url"
                    value={formData.meeshoLink}
                    onChange={(e) => setFormData({ ...formData, meeshoLink: e.target.value })}
                    placeholder="https://meesho.com/product/..."
                    className="font-paragraph border-secondary/50 focus:border-primary"
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    className="border-secondary/50 text-primary hover:bg-secondary/20"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold text-primary">
              Your Products ({products.length})
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-secondary/30 animate-pulse">
                  <div className="bg-secondary/20 h-48 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="bg-secondary/20 h-4 rounded mb-2"></div>
                    <div className="bg-secondary/20 h-4 rounded w-3/4 mb-4"></div>
                    <div className="flex gap-2">
                      <div className="bg-secondary/20 h-8 rounded flex-1"></div>
                      <div className="bg-secondary/20 h-8 rounded w-8"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-secondary/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Plus className="w-12 h-12 text-primary/40" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                No products yet
              </h3>
              <p className="font-paragraph text-primary/60 mb-6">
                Start building your store by adding your first product
              </p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product._id} className="border-secondary/30 hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={product.mainImage || "https://static.wixstatic.com/media/201dd1_a430d674d67240bbaf8cfa48212924d0~mv2.png?originWidth=256&originHeight=192"}
                      alt={product.productName || 'Product image'}
                      className="w-full h-48 object-cover rounded-t-lg"
                      width={300}
                    />
                    {product.sku && (
                      <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-paragraph">
                        {product.sku}
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-heading text-lg font-bold text-primary mb-2 line-clamp-1">
                      {product.productName}
                    </h3>
                    
                    {product.description && (
                      <p className="font-paragraph text-primary/70 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      {product.price && (
                        <span className="font-heading text-xl font-bold text-primary">
                          ₹{product.price}
                        </span>
                      )}
                      {product.meeshoLink && (
                        <a
                          href={product.meeshoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary/60 hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(product)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-secondary/50 text-primary hover:bg-secondary/20"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(product._id)}
                        variant="outline"
                        size="sm"
                        className="border-destructive/50 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}