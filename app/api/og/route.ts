import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);

  // ?title=<title>
  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'My default title';

  const host = 'https://questcasterframes.vercel.app';
  const imagePath = `${host}/og-image?title=${title}`;
  const html = `
        <!doctype html>
        <html>
        <head>
            <style>
                figure {
                    display: inline-block;
                    margin: 0;
                    max-width: 100%;
                }
                img {
                    max-width: 100%;
                    border: 4px inset black;
                }
            </style>
            <meta property="og:image" content="${imagePath}" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imagePath}" />
            <meta property="fc:frame:button:1" content="Frame me!" />
            <title>Simplest Frame</title>
        </head>
        <body>
            <h1>The Simplest Frame</h1>
            <figure>
                <img width="600" src="${imagePath}" />
            </figure>
            <!-- Form for POST request -->
            <form action="/api/og" method="post">
                <input type="submit" value="Frame me!" /> 
            </form>
        </body>
        </html>
    `;

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

export const config = {
  path: '/',
};
