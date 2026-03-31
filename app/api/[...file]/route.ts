import { NextRequest, NextResponse } from 'next/server';

/**
 * Wildcard Proxy Route for StudyUK Offline API
 * Matches the original system architecture: /api/{file}
 */
const safeConsole = {
  error: (...args: any[]) => {
    console.error(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
  },
  warn: (...args: any[]) => {
    console.warn(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
  },
  log: (...args: any[]) => {
    console.log(...args.map(arg => (typeof arg === 'object' && arg !== null ? (arg instanceof Error ? arg.message : String(arg)) : arg)));
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ file: string[] }> }
) {
  const resolvedParams = await params;
  const filePath = resolvedParams.file.join('/');
  const { searchParams } = new URL(req.url);
  
  const API_BASE = "https://studyuk.site/offline/";
  const targetUrl = new URL(filePath, API_BASE);
  
  // Append all query parameters from the incoming request
  searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for proxy fetch

  try {
    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Host': 'studyuk.site',
        'Referer': 'https://studyuk.site/offline/batches.php',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
      },
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      safeConsole.error(`Proxy Error: ${targetUrl.toString()} returned ${response.status}`);
      return new NextResponse(`<!-- PROXY_ERROR: ${response.status} -->`, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const data = await response.text();
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    safeConsole.error('Proxy Crash:', error instanceof Error ? error.message : String(error));
    return new NextResponse(`<!-- PROXY_CRASH -->`, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

