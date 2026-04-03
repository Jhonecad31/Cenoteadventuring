export async function GET({ request }) {
    const urlParam = new URL(request.url).searchParams.get('url');
    if (!urlParam) {
        return new Response('Missing URL parameter', { status: 400 });
    }

    try {
        const originalResponse = await fetch(urlParam);
        const body = await originalResponse.text();

        return new Response(body, {
            headers: {
                'Content-Type': originalResponse.headers.get('Content-Type') || 'application/javascript',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return new Response('Proxy error', { status: 500 });
    }
}