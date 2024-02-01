import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const url = new URL(req.url);
  const params = url.searchParams;

  const font = {
    file: 'Redaction-Regular.woff2',
    name: 'Redaction',
  };

  const html = `
        <html>
        <head>
        <style>
            @font-face {
                font-family: "${font.name}";
                src:
                    local("${font.name}"),
                    url("/fonts/${font.file}") format("woff2");
                }
            body {
                margin: 0;
                padding: 0;
            }
            fc-frame {
                font-family: "${font.name}";
                display: flex;
                flex-direction: column;
                width: 100vw;
                height: 100vh;
                color: white;
                background: black;
                align-items: center;
                justify-content: center;
                line-height: 1;
                border: 2em solid #232323;
            }
        </style>
        </head>
        <body>
        <fc-frame>
            <div style="font-size: 5em;">i've been framed ${
              params.get('title') || 'Title not found'
            } times</div>
        </fc-frame>
        </body>
    </html>
    `;

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

export const config = {
  path: '/frame',
};
