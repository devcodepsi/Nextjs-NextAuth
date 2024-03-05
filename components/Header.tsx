import Link from 'next/link';
import React from 'react';
import HeaderSign from './HeaderSign';

const Header = () => {
    return (
        <div className='p-5 border-b flex items-center'>
            <h1 className='w-[200px]'><Link href="/">logo</Link></h1>
            <menu className='flex-1 flex gap-5'>
                <Link href="/sub1">sub1</Link>
                <Link href="/sub2">sub2</Link>
                <Link href="/sub3">sub3</Link>
            </menu>
            <HeaderSign />
        </div>
    );
};

export default Header;