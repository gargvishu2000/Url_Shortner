
export const cookieOptions = {
    httpOnly : true,
    secure: process.env.NODE_ENV === "production",
    samesite: 'lax',
    maxAge: 1000 * 60 * 60 // 60 minutes.
}