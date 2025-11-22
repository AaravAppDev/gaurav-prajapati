import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ArrowLeft, ShoppingBag, Star, Users, Truck } from 'lucide-react';

export default function AboutPage() {
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
              <h1 className="font-heading text-2xl font-bold text-primary">About Us</h1>
            </div>
            
            <Link to="/manage">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Manage Products
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[120rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-heading text-5xl font-bold text-primary leading-tight mb-6">
              Your Trusted
              <br />
              <span className="text-primary italic">Meesho</span> Partner
            </h1>
            
            <p className="font-paragraph text-lg text-primary/80 mb-8">
              We're passionate about bringing you the finest selection of products through our 
              Meesho store. Our commitment to quality, affordability, and customer satisfaction 
              drives everything we do.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse Products
                </Button>
              </Link>
              <Link to="/manage">
                <Button variant="outline" className="border-secondary/50 text-primary hover:bg-secondary/20">
                  Manage Store
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://static.wixstatic.com/media/201dd1_239aa2e6e1664f3bb87f89228a83dc03~mv2.png?originWidth=576&originHeight=384"
              alt="Team working together on product selection"
              className="w-full h-96 object-cover rounded-2xl"
              width={600}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/10 py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-primary mb-4">
              Why Choose Our Store
            </h2>
            <p className="font-paragraph text-primary/70 text-lg max-w-2xl mx-auto">
              We've built our reputation on delivering exceptional value and service 
              to every customer who shops with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">
                Quality Products
              </h3>
              <p className="font-paragraph text-primary/70">
                Every item is carefully selected for quality and value
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">
                Easy Shopping
              </h3>
              <p className="font-paragraph text-primary/70">
                Browse our collection and shop directly on Meesho
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">
                Fast Delivery
              </h3>
              <p className="font-paragraph text-primary/70">
                Quick and reliable shipping through Meesho's network
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">
                Customer Support
              </h3>
              <p className="font-paragraph text-primary/70">
                Dedicated support for all your shopping needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-[120rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="https://static.wixstatic.com/media/201dd1_7abf7ffb679c479b8882563eaea43b4b~mv2.png?originWidth=576&originHeight=384"
              alt="Our journey in e-commerce"
              className="w-full h-96 object-cover rounded-2xl"
              width={600}
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-4xl font-bold text-primary mb-6">
              Our Story
            </h2>
            
            <div className="space-y-4 font-paragraph text-primary/80">
              <p>
                What started as a passion for finding great products at amazing prices 
                has grown into a thriving Meesho store that serves customers across the country.
              </p>
              
              <p>
                We believe that everyone deserves access to quality products without 
                breaking the bank. That's why we've partnered with Meesho to bring you 
                the best deals and fastest delivery.
              </p>
              
              <p>
                Our team carefully curates each product in our collection, ensuring 
                that you get the best value for your money. From fashion to home goods, 
                we've got something for everyone.
              </p>
            </div>

            <div className="mt-8 p-6 bg-secondary/20 rounded-2xl">
              <h3 className="font-heading text-xl font-bold text-primary mb-2">
                Our Mission
              </h3>
              <p className="font-paragraph text-primary/80">
                To make quality products accessible to everyone through exceptional 
                service and unbeatable prices on the Meesho platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-[120rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="font-paragraph text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Explore our complete collection of products and discover your next favorite purchase. 
            All items link directly to our Meesho store for secure checkout.
          </p>
          
          <Link to="/">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-3">
              Browse All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-secondary/30">
        <div className="max-w-[120rem] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-bold text-sm">M</span>
                </div>
                <span className="font-heading text-xl font-bold text-primary">MeeshoStore</span>
              </div>
              <p className="font-paragraph text-primary/70">
                Your trusted partner for quality products at unbeatable prices. 
                Shop with confidence through our Meesho store.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold text-primary mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block font-paragraph text-primary/70 hover:text-primary transition-colors">
                  All Products
                </Link>
                <Link to="/manage" className="block font-paragraph text-primary/70 hover:text-primary transition-colors">
                  Manage Products
                </Link>
                <Link to="/about" className="block font-paragraph text-primary/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold text-primary mb-4">Contact</h4>
              <p className="font-paragraph text-primary/70">
                Questions about our products? Get in touch with us for personalized assistance.
              </p>
            </div>
          </div>
          
          <div className="border-t border-secondary/30 mt-8 pt-8 text-center">
            <p className="font-paragraph text-primary/60">
              © 2024 MeeshoStore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}