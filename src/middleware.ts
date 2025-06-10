// import { defineMiddleware } from "astro:middleware";

// export const onRequest = defineMiddleware((context, next ) => {
//     const lang = context.request.headers.get("Accept-Language");
//     const [langCode] = lang?.split(',') || [];
//     console.log({ langCode });

//     if (langCode === "es-ES") {
//         context.locals.title = "Spanish app";
//     } else {
//         context.locals.title = "English app";
//     }
//     return next();
// });

import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/challenges(.*)"])
export const onRequest = clerkMiddleware((auth, context) => {
    const { userId, redirectToSignIn } = auth();

    if(isProtectedRoute(context.request) && !userId){
        return redirectToSignIn();
    }
});