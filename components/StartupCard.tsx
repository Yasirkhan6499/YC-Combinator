// app/components/StartupCard.tsx or components/StartupCard.tsx

import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import  Link  from 'next/link';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';

// Define the StartupCardType type
export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
     const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
   <li className='startup-card group'>
    <div className="flex justify-between">
        <p className='startup_card_date'>
            {formatDate(_createdAt)}
        </p>
        <div className='flex gap-1.5'>
            <EyeIcon className="size-6 text-primary" />
                <span className='text-16-medium'>{views}</span>
           
        </div>
        </div>
        <div className='flex-between mt-5 gap-5'>
            <div className='flex-1'>
                <Link href={`/user/${author?._id}`}>
                    <p className='text-16-medium line-clamp-1'>
                        {author?.name}
                    </p>
                </Link>
                <div className='flex justify-between gap-3'>
                <Link href={`/startup/${_id}`}>
                    <h3 className="text-xl font-semibold line-clamp-2 mt-1">
                        {title}
                    </h3>
                </Link>
                 <Link href={`/startup/${_id}`}>
                   <Image src="https://placehold.co/48x48" alt='placeholder' 
                   width={48} height={48} className='rounded-full'/>
                 </Link>
                 </div>
                 {/* description */}
                 <Link href={`/startup/${_id}`}>
                    <p className='startup-card-desc'>{description}</p>

                    {/* image */}
                    <img src={image} alt={title} className='startup-card_img' />
                 </Link>

                 {/* image footer */}
                 <div className='flex justify-between gap-3 mt-5'>
                    <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='font-medium'>{category}</p>
                    </Link>
                    <Button className='startup-card_btn hover:bg-white hover:text-black' asChild>
                        <Link href={`/startup/${_id}`}>Details</Link>
                    </Button>
                 </div>
        
            </div>
        </div>
            
    
   </li>
  );
};

export default StartupCard;