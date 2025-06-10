/**
 * El código comentado es un ejemplo de middleware en Astro que maneja la localización
 * basado en el encabezado "Accept-Language". Dependiendo del idioma, se establece un título
 * diferente en el contexto local. Este middleware se ejecuta antes de procesar la solicitud.
 * Pero con la implementación actual de Clerk, no es necesario manejar la localización manualmente.
 * Si se desea implementar un middleware personalizado, se puede descomentar y ajustar según sea necesario.
 */
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