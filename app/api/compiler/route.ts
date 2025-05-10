import { NextResponse } from 'next/server';

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

const LANGUAGE_MAP: { [key: string]: number } = {
  c: 50,
  cpp: 54,
  python: 71,
  java: 62,
  javascript: 63,
};

export async function POST(req: Request) {
  const { code, language } = await req.json();
  
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/execute-code/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_code: code,
        language_id: LANGUAGE_MAP[language],
        stdin: '',
        redirect_stderr_to_stdout: true
      })
    });

    const data = await response.json();
    return NextResponse.json({
      output: data.stdout || data.stderr || data.message,
      status: data.status?.description
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to execute code' },
      { status: 500 }
    );
  }
}
