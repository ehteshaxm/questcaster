import satori from 'satori';
import sharp from 'sharp';
import { html } from 'satori-html';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  path: '/og-image',
};

export async function GET(req: NextRequest): Promise<Response> {
  const inboundUrl = new URL(req.url);
  const host = 'https://questcasterframes.vercel.app';
  const frameUrl = `${host}/frame?${inboundUrl.searchParams}`;

  const htmlResponse = await fetch(frameUrl);
  const markup = await htmlResponse.text();

  const font = {
    fileName: 'Redaction-Regular.otf',
    cssName: 'Redaction',
  };
  const fontResponse = await fetch(`${host}/fonts/${font.fileName}`);
  const fontData = await fontResponse.arrayBuffer();

  //@ts-ignore
  const svg = await satori(html(markup), {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: font.cssName,
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  });
  const svgBuffer = Buffer.from(svg);
  const png = sharp(svgBuffer).png();
  const response = await png.toBuffer();

  return new NextResponse(response, {
    status: 200,
    headers: { 'Content-Type': 'image/png' },
  });
}

export const dynamic = 'force-dynamic';
