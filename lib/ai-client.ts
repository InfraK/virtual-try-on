import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  throw new Error('GOOGLE_GENERATIVE_AI_API_KEY environment variable is required');
}

export async function generateVirtualTryOn(
  userImage: string,
  productInfo: { name: string; image: string }
): Promise<string> {
  const prompt = `
Given the image of a person and an image of a clothing item, generate a photorealistic image showing the person wearing the provided clothing item: ${productInfo.name}

Requirements:
- Place the clothing item naturally on the person's body
- **Preserve** the person exactly as in the original image
- **Preserve** the clothing item's details exactly as in the original image
- **Preserve** the original background and surroundings
- **Ensure** the final image looks photorealistic and natural
- **Ensure** the clothing appears as if the person is actually wearing it
- **Never** return anything other than the generated image
`;

  console.info('[AI Client] Input:', {
    productName: productInfo.name,
    userImageLength: userImage?.length || 0,
    productImageLength: productInfo.image?.length || 0,
    prompt: prompt,
  });

  try {
    const result = await generateText({
      model: google('gemini-2.5-flash-image-preview'),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image', image: userImage },
            { type: 'image', image: productInfo.image },
          ],
        },
      ],
    });

    for (const file of result.files) {
      if (file.mediaType.startsWith('image/')) {
        const generatedImage = `data:${file.mediaType};base64,${file.base64}`;
        console.info('[AI Client] Output:', {
          success: true,
          mediaType: file.mediaType,
          generatedImageLength: generatedImage.length,
        });
        return generatedImage;
      }
    }

    throw new Error('No image was generated in the response');
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate virtual try-on image');
  }
}
