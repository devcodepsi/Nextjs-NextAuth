"use client";
import Loader from "@/components/Loader";
import { useSession, signIn } from "next-auth/react"
import { redirect } from "next/navigation";

export default function SigninPage() {
    const { data: session, status } = useSession();

    if (status === 'authenticated') {
        redirect('/');
    } else if (status === 'loading') {
        return <Loader />
    } else {
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
                email: { value: string };
                password: { value: string };
            }
            const email = target.email.value;
            const password = target.password.value;
            try {
                const res = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                    //callbackUrl: '/mypage',
                });
            } catch (e) {

            }
        };
        return (
            <main className='p-5'>
                <form onSubmit={handleSubmit} className="p-3">
                    <div><input className="border w-full p-3" type="email" name="email" placeholder="user email" defaultValue="devcodepsi@gmail.com" required /></div>
                    <div className="py-3"><input className="border w-full p-3" type="password" name="password" placeholder="password" defaultValue="1111" required /></div>
                    <button className="border bg-red-400 w-full p-3" type="submit">Login</button>
                </form>

                <div className="w-full h-screen flex flex-col justify-center items-center p-3">
                    <p className="mb-2">social Login</p>
                    <div className="w-1/2"><button className="bg-yellow-300 p-3 rounded mb-2 w-full" onClick={() => signIn('kakao')}>카카오 로그인</button></div>
                    <div className="w-1/2"><button className="bg-gray-500 p-3 rounded mb-2 w-full" onClick={() => signIn('github')}>깃허브 로그인</button></div>
                </div>
            </main>
        )
    }
}