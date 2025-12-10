# Virtual Try-On Prototype

A learning project exploring, image generation capabilities of [Gemini Nano Banana](https://gemini.google/overview/image-generation/), creating a virtual try-on. Upload a photo and visualize clothing items on yourself.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [Google Gemini](https://ai.google.dev/) - Multimodal AI model
- [Zod](https://zod.dev/) - Schema validation
- [v0](https://v0.dev/) - Initial UI bootstrap

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/)

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create a `.env` file with your Google API key:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Credits

Product images from [alexeygrigorev/clothing-dataset](https://github.com/alexeygrigorev/clothing-dataset)
