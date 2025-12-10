'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { z } from 'zod';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Loader2, Sparkles, Download, AlertCircle } from 'lucide-react';
import type { Product } from '@/lib/products';

const virtualTryOnResponseSchema = z.object({
  success: z.boolean(),
  resultImage: z.string(),
});

interface VirtualTryonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export function VirtualTryonModal({ open, onOpenChange, product }: VirtualTryonModalProps) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/virtual-tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userImage,
          productImage: product.image,
          productName: product.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process virtual try-on');
      }

      const data = await response.json();

      const result = virtualTryOnResponseSchema.safeParse(data);
      if (!result.success) {
        throw new Error('Invalid response from server');
      }

      setResultImage(result.data.resultImage);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to process virtual try-on. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;

    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `virtual-tryon-${product.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setUserImage(null);
    setResultImage(null);
    setIsProcessing(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Virtual Try-On: {product.name}
          </DialogTitle>
          <DialogDescription>
            Upload your photo to see how this item looks on you using AI-powered virtual try-on
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Card className="bg-destructive/10 border-destructive/50 p-2">
            <CardContent className="p-0">
              <div className="flex gap-3 items-center">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div className="flex-1 text-muted-foreground">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="space-y-6 pt-4 grow">
            <Card className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="relative aspect-square max-h-[70vh] bg-muted">
                  {!userImage ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                      <div className="rounded-full bg-accent/10 p-4">
                        <Upload className="h-8 w-8 text-accent" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Upload Your Photo</h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Choose a clear, front-facing photo for the best results. Supported
                          formats: JPG, PNG
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Button asChild>
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          Select Photo
                        </label>
                      </Button>
                    </div>
                  ) : isProcessing ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <Loader2 className="h-12 w-12 animate-spin text-accent" />
                      <p className="text-sm text-muted-foreground">
                        Processing your virtual try-on...
                      </p>
                    </div>
                  ) : resultImage ? (
                    <Image
                      src={resultImage || '/placeholder.svg'}
                      alt="Virtual try-on result"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <Image
                        src={userImage || '/placeholder.svg'}
                        alt="Your photo"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <p className="text-white text-lg font-medium">
                          Ready to generate your virtual try-on
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {userImage && (
              <div className="flex flex-col sm:flex-row gap-3">
                {!resultImage ? (
                  <>
                    <Button
                      onClick={handleTryOn}
                      disabled={isProcessing}
                      className="flex-1 gap-2"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5" />
                          Generate Virtual Try-On
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      disabled={isProcessing}
                      size="lg"
                    >
                      Change Photo
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleDownload} className="flex-1 gap-2" size="lg">
                      <Download className="h-5 w-5" />
                      Download Result
                    </Button>
                    <Button onClick={handleReset} variant="outline" size="lg">
                      Try Again
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Your Photo</h3>
                <Card className="overflow-hidden py-0">
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-muted">
                      {userImage ? (
                        <Image
                          src={userImage}
                          alt="Your photo"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">Upload your photo</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Product</h3>
                <Card className="overflow-hidden py-0">
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-accent/5 border-accent/20 overflow-y-auto py-0">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium mb-2">Tips for Best Results</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use a clear, well-lit photo</li>
                    <li>• Face the camera directly</li>
                    <li>• Ensure your full upper body is visible</li>
                    <li>• Avoid busy backgrounds</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
