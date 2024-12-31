import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

export function middleware(request: NextRequest) {
  if (!isMaintenanceMode) {
    // メンテナンスモードでない時は、/maintenance を404にする
    if (request.nextUrl.pathname === "/maintenance/") {
      request.nextUrl.pathname = "/404";
      return NextResponse.rewrite(request.nextUrl);
    }

    return;
  }

  // メンテナンスモード時の処理
  if (isMaintenanceMode) {
    // 繰り返しリダイレクトを防ぐ
    if (request.nextUrl.pathname === "/maintenance/") return;

    // メンテナンス画面へリダイレクト
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_HOST}/maintenance`);
  }
}

export const config = {
  matcher: [
    // 画面遷移以外のリクエストを除外する
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export {};