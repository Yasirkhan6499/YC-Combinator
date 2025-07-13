import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    // Check if the user is logged in
    // If not, redirect to the home page
    const session = await auth();
    if(!session) redirect("/");
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <h1 className="heading">
            Submit Your Startup
        </h1>

        </section>

        <StartupForm />

    </>
    
  )
}

export default page