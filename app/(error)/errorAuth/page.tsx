import Link from 'next/link'
import React from 'react'

export default function ErrorAuth() {
    return (
        <main className='p-5 text-center'>
            <h2 className='mb-5'>로그인 오류가 발생했습니다.</h2>
            <Link href="/" className='underline'>홈으로</Link>
        </main>

    )
}
