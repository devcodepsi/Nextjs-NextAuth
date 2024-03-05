"use client";
import { SessionProvider } from "next-auth/react"

export default function ProviderForSession({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider refetchInterval={60 * 60 * 24} /* 해당 초마다 토큰 갱신 */ >{children}</SessionProvider>
    )
}