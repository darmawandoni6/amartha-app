import packageJson from '../../../package.json';

export async function GET() {
  const data: { [K: string]: unknown } = {
    status: 'ok',
    env: process.env.NEXT_PUBLIC_MODE,
    releaseVersion: packageJson.version,
    timestamp: Date.now(),
    devVersion: undefined,
  };

  if (data.env !== 'production') {
    data.devVersion = packageJson.development.version;
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
