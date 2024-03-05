'use client';
import Loader from '@/components/Loader';
import { userAuth, userProfile } from '@/recoilStore/member';
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function MypageForm() {
    const { data: session, status, update } = useSession();
    const [user, setUser] = useRecoilState<any | null>(userAuth);
    const [profile, setProfile] = useRecoilState<any | null>(userProfile);
    const [name, setName] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])

    if (status === 'unauthenticated') {
        redirect('/signIn');
    } else if (status === 'loading') {
        return <Loader />
    } /*else if (!profile) {
        redirect('/profile');
    } */else {
        return (
            <main className='p-5 flex flex-col justify-center items-center'>
                {user &&
                    <>
                        <div className='w-[100px] h-[100px] overflow-hidden rounded-full relative'><Image src={user.image || user.avatar} sizes="(max-width: 640px) 100vw, 640px" alt={session?.user?.name as string} fill priority={true} /></div>
                        <p className='text-2xl mb-2'><span className='font-bold'>{user.name}</span>. Signed In As</p>
                        <p className='font-bold mb-4'>{user.email}</p>
                        <div className='mb-4'><input type='text' defaultValue={name} onChange={(e) => setName(e.target.value)} className='border' /></div>
                        <ButtonList name={name} update={update} />
                    </>
                }
            </main>
        )
    }
}

function ButtonList({ name, update }: { name: string, update: any }) {
    const buttons = [
        { id: 1, label: 'edit name', fn: () => update({ name }) },
    ]
    return (
        <>
            {buttons.map(button => (
                <button key={button.id} onClick={button.fn} className='border p-3 w-full rounded mb-2'>{button.label}</button>
            ))}
        </>
    )
}