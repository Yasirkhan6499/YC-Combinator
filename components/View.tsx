import { client } from "@/sanity/lib/client";
import Ping from "./Ping"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from 'next/streaming'

const View = async ({id}:{id:string}) => {
  const {views: totalViews} = await client.withConfig({useCdn:false})
  .fetch(STARTUP_VIEWS_QUERY, {id});

   // Increment the view count by 1
 after( async()=>await writeClient
  .patch(id)
  .set({views: totalViews + 1})
  .commit()); 
 
  return (
    <div className="view-container">
        <div className="absolute -right-2  -top-2">
            <Ping />
        </div>

        <p className= "view-text">
            <span className="font-black">Views: {totalViews}</span>
        </p>
    </div>
  )
}

export default View