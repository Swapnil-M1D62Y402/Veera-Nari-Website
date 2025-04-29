import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      q: '(women safety OR women protection OR women rights)',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '12',
      domains: [
        'ndtv.com',
        'hindustantimes.com',
        'timesofindia.indiatimes.com',
        'indianexpress.com',
        'bbc.com',
        'reuters.com',
        'theguardian.com'
      ].join(',')
    });

    const response = await fetch(
      `https://newsapi.org/v2/everything?${params}`,
      {
        headers: {
          'X-Api-Key': apiKey,
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`News API responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}