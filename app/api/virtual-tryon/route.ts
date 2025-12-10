import { type NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn } from '@/lib/ai-client';
import { readFile, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    console.log('[Try-on Route] Received virtual try-on request');

    const body = await request.json();

    const result = virtualTryOnSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const { userImage, productImage, productName } = result.data;

    const productImageBase64 = await imagePathToBase64(productImage);

    console.log('[Try-on Route] Calling AI service for virtual try-on generation');

    const resultImage = await generateVirtualTryOn(userImage, {
      name: productName,
      image: productImageBase64,
    });

    console.log('[Try-on Route] Virtual try-on generated successfully');

    return NextResponse.json({
      success: true,
      resultImage,
    });
  } catch (error) {
    console.error('[Try-on Route] Error in virtual try-on API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const virtualTryOnSchema = z.object({
  userImage: z
    .string()
    .refine((val) => val.startsWith('data:image/'), {
      message: 'userImage must be a base64 data URL starting with data:image/',
    })
    .refine(
      (val) => {
        const base64Data = val.split(',')[1];
        if (!base64Data) return false;
        const size = Buffer.from(base64Data, 'base64').length;
        return size <= MAX_FILE_SIZE;
      },
      {
        message: `userImage size must not exceed ${MAX_FILE_SIZE} bytes`,
      }
    ),
  productImage: z.string().startsWith('/'),
  productName: z.string().min(1),
});

async function imagePathToBase64(imagePath: string): Promise<string> {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  const publicDir = path.resolve(process.cwd(), 'public');
  const fullPath = path.resolve(publicDir, cleanPath);

  if (!fullPath.startsWith(publicDir + path.sep) && fullPath !== publicDir) {
    throw new Error('Invalid file path');
  }

  try {
    await access(fullPath, constants.R_OK);
  } catch {
    throw new Error('File not found');
  }

  const buffer = await readFile(fullPath);
  const base64 = buffer.toString('base64');

  const ext = path.extname(cleanPath).toLowerCase();
  const contentTypeMap: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  const contentType = contentTypeMap[ext] || 'image/jpeg';

  return `data:${contentType};base64,${base64}`;
}
