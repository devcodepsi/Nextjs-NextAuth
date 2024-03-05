'use client';
import React from 'react';
import { RecoilRoot } from 'recoil';

export default function ProviderForRecoil({ children }: { children: React.ReactNode }) {
    return (
        <RecoilRoot>{children}</RecoilRoot>
    )
}
