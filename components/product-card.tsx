import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Product } from '@/lib/products';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden border-border hover:border-foreground/20 transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="flex w-full items-center justify-between">
            <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <span className="text-sm font-semibold text-foreground">${product.price}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
