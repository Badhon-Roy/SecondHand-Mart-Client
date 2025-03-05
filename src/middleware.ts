import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService"

type IRole = keyof typeof roleBasedPrivateRoute;
const authRoutes = ['/login', '/register']

const roleBasedPrivateRoute = {
    user: [/^\/user/, /^\/products/,/^\/order/ ,/^\/favorite/],
    admin: [/^\/admin/,/^\/products/,/^\/order/ ,/^\/favorite/]
}

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const userInfo = await getCurrentUser();
    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(`http://localhost:3000/login?redirectPath=${pathname}`, request.url)
            )
        }
    }
    if (userInfo?.role && roleBasedPrivateRoute[userInfo?.role as IRole]) {
        const routes = roleBasedPrivateRoute[userInfo?.role as IRole]
        if (routes.some(route => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url))
}


export const config = {
    matcher: ['/login',
        '/products',
        '/admin',
        '/admin/:page*',
        '/user',
        '/user/:page*',
        '/order',
        '/order/:page*',
        '/favorite'
    ],
}