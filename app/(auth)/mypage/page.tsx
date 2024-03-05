import type { Metadata } from 'next'
import MypageForm from './(components)/MypageForm';

export const metadata: Metadata = {
    title: '마이페이지',
    description: '페이지 컨텐츠',
}

export default function MypagePage() {
    return (
        <main className='p-5 flex flex-col justify-center items-center'>
            <h2>{metadata.title as string}</h2>
            <MypageForm />
        </main>
    )
}