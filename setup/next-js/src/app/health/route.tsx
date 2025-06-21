import packageJson from '../../../package.json';

export async function GET() {
  const data: { [K: string]: unknown } = {
    status: 'ok',
    env: process.env.NEXT_PUBLIC_MODE,
    releaseVersion: packageJson.version,
    timestamp: Date.now(),
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
