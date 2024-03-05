'use client';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { userAuth } from '@/recoilStore/member';

export default function HeaderSign() {
    const dataset = useSession();
    const { data: session } = dataset;

    const [user, setUser] = useRecoilState<any | null>(userAuth);
    const userRefresh = useRecoilRefresher_UNSTABLE(userAuth);

    const logout = () => {
        signOut({ callbackUrl: '/' });
        userRefresh();
    }


    /* 로그인 세션 확인용 console */
    useEffect(() => {
        if (session) {
            console.log(dataset)
            console.log(user)
            console.log(session.user)
            setUser(session.user);
        }
    }, [session])



    if (!session) {
        return <Link href="/signIn" className='p-3 bg-gray-200 rounded'>로그인</Link>
    } else {
        return (
            <div className='flex gap-5'>
                <Link href="/mypage" className='p-3 bg-gray-200 rounded'>   마이페이지</Link>
                <button onClick={logout} className='p-3 bg-gray-200 rounded'>로그아웃</button>
            </div>
        )
    }
};