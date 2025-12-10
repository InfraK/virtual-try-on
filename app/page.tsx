import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              <h1 className="text-xl font-semibold">VirtualFit</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Technology
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              AI-Powered Virtual Try-On
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              See yourself in style before you buy
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Experience the future of online shopping with AI-powered virtual try-on technology.
              Upload your photo and see how any item looks on you instantly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Explore Our Collection</h3>
            <p className="text-muted-foreground">Click any item to try it on virtually</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">VirtualFit</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by Google Gemini 2.5 Flash Image
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
