import { auth } from '@/auth';
import { signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NavBar = async () => {
  const session = await auth();

  return (
    <div className='px-5 py-3 bg-white shadow-sm'>
      <nav className='flex items-center justify-between'>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={30} />
        </Link>

        <div className='flex items-center gap-4 text-black'>
          {session?.user ? ( // if user is logged in
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form action={async() =>{ 
                "use server";
                await signOut({ redirectTo: '/' });
                
              }
              }>
                <button type='submit'>Logout</button>
              </form>
              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <>
              <form action={async () => {
                "use server";
                await signIn('github');
              }
              }>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Login
                </button>

              </form>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;