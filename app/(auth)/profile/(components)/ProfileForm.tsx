'use client';
import { userAuth, userProfile } from '@/recoilStore/member';
import React from 'react'
import { useRecoilState } from 'recoil';

export default function ProfileForm() {

    const [user, setUser] = useRecoilState<any | null>(userAuth);
    const [profile, setProfile] = useRecoilState<any | null>(userProfile);

    const submitProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            nickname: { value: string };
            name: { value: string };
            gender: { value: string };
        }

        console.log(target.email.value, target.name.value, target.nickname.value, target.gender.value);
    }
    return (
        <form onSubmit={submitProfile} className='p-5'>
            <div>
                <label>이메일</label>
                <input type="email" name="email" className='border w-full p-3' defaultValue={user?.email} disabled />
            </div>
            <div className='mt-3'>
                <label>이름</label>
                <input type="text" name="name" className='border w-full p-3' required minLength={3} maxLength={10} defaultValue={user?.name} disabled />
            </div>
            <div className='mt-3'>
                <label>닉네임</label>
                <input type="text" placeholder="닉네임을 입력하세요." name="nickname" className='border w-full p-3' required minLength={5} maxLength={10} />
            </div>
            <div className='mt-3'>
                <label>성별</label>
                <select name="gender" className='border w-full p-3' required defaultValue="">
                    <option value="" disabled>선택하세요.</option>
                    <option value="man">남성</option>
                    <option value="woman">여성</option>
                </select>
            </div>
            <div className='mt-3'><button type="submit" className='border w-full p-3 bg-slate-600 text-white'>프로필 등록</button></div>
        </form>
    )
}
