import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { VirtualTryOnButton } from '@/components/virtual-try-on-button';
import { ArrowLeft, Sparkles } from 'lucide-react';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back to Shop</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">VirtualFit</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-border">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground text-center">
              Click "Try On Virtually" to see how this looks on you
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">{product.name}</h1>
              <p className="text-2xl font-semibold text-foreground">${product.price}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="space-y-3">
              <label className="text-sm font-medium">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    size="sm"
                    className="min-w-[60px] bg-transparent"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <VirtualTryOnButton product={product} />
              <Button size="lg" variant="outline" className="flex-1 bg-transparent">
                Add to Cart
              </Button>
            </div>

            <Tabs defaultValue="details" className="pt-6">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">
                  Details
                </TabsTrigger>
                <TabsTrigger value="materials" className="flex-1">
                  Materials
                </TabsTrigger>
                <TabsTrigger value="care" className="flex-1">
                  Care
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Product Details</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="pt-2">
                    <p className="text-sm">
                      <span className="font-medium">Category:</span>{' '}
                      <span className="text-muted-foreground">{product.category}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Available Sizes:</span>{' '}
                      <span className="text-muted-foreground">{product.sizes.join(', ')}</span>
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="materials" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Material Composition</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material, index) => (
                      <Badge key={index} variant="outline">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="care" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Care Instructions</h3>
                  <ul className="space-y-2">
                    {product.care.map((instruction, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-foreground mt-1">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
