import { NextRequest, NextResponse } from "next/server";

const RAW_BACKEND_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";
const BACKEND_BASE_URL = RAW_BACKEND_BASE_URL
  .replace(/\/api\/v1\/?$/, "")
  .replace(/\/$/, "");

type HeadersWithSetCookie = Headers & {
  getSetCookie?: () => string[];
};

function buildTargetUrl(path: string[]) {
  const joinedPath = path.join("/");
  return `${BACKEND_BASE_URL}/${joinedPath}`;
}

function buildProxyResponseHeaders(response: Response) {
  const responseHeaders = new Headers();

  response.headers.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();

    if (
      normalizedKey === "content-encoding" ||
      normalizedKey === "content-length" ||
      normalizedKey === "set-cookie"
    ) {
      return;
    }

    responseHeaders.append(key, value);
  });

  const setCookieHeaders =
    (response.headers as HeadersWithSetCookie).getSetCookie?.() ?? [];

  if (setCookieHeaders.length > 0) {
    setCookieHeaders.forEach((cookie) => {
      responseHeaders.append("set-cookie", cookie);
    });
  } else {
    const singleSetCookie = response.headers.get("set-cookie");

    if (singleSetCookie) {
      responseHeaders.append("set-cookie", singleSetCookie);
    }
  }

  return responseHeaders;
}

function getProxyErrorMessage(targetUrl: URL) {
  if (["localhost", "127.0.0.1", "::1"].includes(targetUrl.hostname)) {
    return "Unable to reach the backend service. If you're developing locally, make sure the API server is running.";
  }

  return "Unable to reach the backend service right now. Please try again in a moment.";
}

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const targetUrl = new URL(buildTargetUrl(path));

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  const headers = new Headers(request.headers);
  headers.delete("host");

  const init: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = await request.arrayBuffer();
    init.duplex = "half";
  }

  try {
    const response = await fetch(targetUrl, init);
    const responseHeaders = buildProxyResponseHeaders(response);

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`Backend proxy request failed for ${targetUrl.toString()}:`, error);

    return NextResponse.json(
      { message: getProxyErrorMessage(targetUrl) },
      { status: 502 },
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
export const HEAD = proxyRequest;
