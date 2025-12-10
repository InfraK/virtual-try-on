import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <Button asChild>
          <Link href="/">Return to Shop</Link>
        </Button>
      </div>
    </div>
  );
}
