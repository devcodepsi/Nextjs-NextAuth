import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='p-5 text-center'>
            <h2 className='font-bold text-2xl'>Not Found</h2>
            <p className='mt-2'>Could not find requested resource</p>
            <Link href="/" className='underline mt-5 block'>Return Home</Link>
        </div>
    )
}