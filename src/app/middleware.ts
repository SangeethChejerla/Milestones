import { NextRequest, NextResponse } from 'next/server';

// Replace this with your laptop's IP address
const ALLOWED_IP = '172.21.32.1'; // Example IP, replace with yours

export function middleware(request: NextRequest) {
  // Get the 'X-Forwarded-For' header to extract the client IP
  const forwardedFor = request.headers.get('x-forwarded-for');

  // If 'X-Forwarded-For' is present, use the first IP; otherwise fallback to 'unknown'
  const clientIP = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

  console.log('Client IP:', clientIP); // Log to verify the correct IP

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check if the client's IP matches the allowed IP
    if (clientIP !== ALLOWED_IP) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
