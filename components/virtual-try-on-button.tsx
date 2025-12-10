'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VirtualTryonModal } from '@/components/virtual-tryon-modal';
import { Sparkles } from 'lucide-react';
import type { Product } from '@/lib/products';

interface VirtualTryOnButtonProps {
  product: Product;
}

export function VirtualTryOnButton({ product }: VirtualTryOnButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button size="lg" className="flex-1 gap-2" onClick={() => setIsModalOpen(true)}>
        <Sparkles className="h-5 w-5" />
        Try On Virtually
      </Button>
      <VirtualTryonModal product={product} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
