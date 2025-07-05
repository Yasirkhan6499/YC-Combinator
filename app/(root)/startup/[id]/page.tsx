import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import React, { Suspense } from 'react'
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import {formatDate} from "@/lib/utils";
import Link from 'next/link';   
import Image from 'next/image';
import markdownit from "markdown-it";
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit();

export const experimental_ppr = true; //this enables partial page rendering for this page
const page = async ({params} : {params: Promise<{id:string}>}) => {
    const id = (await params).id;

    const results = await client.fetch(STARTUP_BY_ID_QUERY, {id});
    const post = results[0];

    if(!post) return notFound();

    // parsed content
    const parsedContent = md.render(post?.pitch || "");

  return (
    <>
    {/* header */}
    <section className='pink_container !min-h-[230px]'>
    <p className="tag">{formatDate(post?._createdAt)}</p>
    <p className="header">{post.title}</p>
    <p className="sub-heading !max-w-5xl">{post.description}</p>
    </section>

    {/* 2nd section */}

    <section className='section_container'>
      <img
       src={post.image}
       alt="thumbnail"
       className="w-full h-auto rounded-xl"
       />

       {/* author link */}
       <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className='flex-betweeen gap-5'>
          <Link href={`/user/${post.author?._id}`}
          className="flex gap-2 items-center mb-3">
          <Image
           src={post.author?.image || "https://placehold.co/48x48"}
           alt={post.author?.name || "Author"}
           width={64}
           height={64}
           className="rounded-full drop-shadow-lg" />

           {/* author name*/}
           <div>
            <p className='text-20-medium'>{post.author.name}</p>
            <p className='text-16-medium !text-gray-400'>@{post.author.username}</p>
           </div>
          </Link>
          <p className="category-tag">{post.category}</p>
        </div>
        <h3 className="text-3xl font-bold">Pitch Details</h3>
        {parsedContent ? (
          <article 
            className='prose max-2-4xl font-work-sans break-all'
            dangerouslySetInnerHTML={{__html: parsedContent}}
          />

          
        ): (
          <p className='no-result'>
            No pitch details provided.
          </p>
        )}
       </div>
       <hr className='divider' />
       {/* TODO: EDITOR SELECTED STARTUPS */}

       <Suspense fallback={<Skeleton className='view-skeleton'/>}>
        <View id={id} />
       </Suspense>
      </section> 

     
      </>
  );
}

export default page;