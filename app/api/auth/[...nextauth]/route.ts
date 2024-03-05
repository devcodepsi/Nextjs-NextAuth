import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    pages: {
        error: "/errorAuth",
        signIn: "/signIn",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: { label: "User Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const getToken = async () => {
                    try {
                        const fetchUrl = `${process.env.NEXT_PUBLIC_ESCUELAS_URL}api/v1/auth/login`;
                        const fetchOptions = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password,
                            }),
                        };
                        const resp = await fetch(fetchUrl, fetchOptions);
                        const data = await resp.json();
                        return data.access_token;
                    } catch (e) {}
                };
                const tokenData = await getToken();

                const getUser = async () => {
                    try {
                        const tokenFetchUrl = `${process.env.NEXT_PUBLIC_ESCUELAS_URL}api/v1/auth/profile`;
                        const tokenFetchOptions = {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${tokenData}`,
                            },
                        };
                        const tokenResp = await fetch(
                            tokenFetchUrl,
                            tokenFetchOptions
                        );
                        const user = await tokenResp.json();
                        return user;
                    } catch (e) {}
                };

                const user = await getUser();

                if (user) {
                    return user;
                }
                return null;
            },
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID as string,
            clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },

        async jwt({ token, trigger, session, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.id = user.id;
            } else if (trigger === "update" && session?.name) {
                token.name = session.name;
            }
            return { ...token, ...user };
        },
    },
});

export { handler as GET, handler as POST };
