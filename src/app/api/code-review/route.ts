import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { source_code, language } = body;

        const apiKey = process.env.CODERABBIT_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'CODERABBIT_API_KEY is not configured on the server.' },
                { status: 500 }
            );
        }

        const response = await fetch('https://api.coderabbit.ai/v1/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                source_code,
                language,
                rules: 'default',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(
                { error: errorData.message || 'Failed to fetch review from CodeRabbit API' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in code review API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
