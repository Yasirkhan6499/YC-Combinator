import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from './../../sanity/lib/queries';
import { sanityFetch, SanityLive } from "@/sanity/lib/live";




export default async function Home({searchParams}:
  { searchParams: Promise<{ query?: string }> }
  ){
    const query = (await searchParams).query;
    const params = {search: query || null};

    // Fetching data from Sanity
    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});
    console.log(JSON.stringify(posts, null, 2));
    //posts
    // const posts = [
    //   {
    //     _createAt: new Date().toISOString(),
    //     views: 55,
    //     author: {_id:1, name:"Yasir"},
    //     _id: 1,
    //     description: "This is a description",
    //     image:
    //     "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    //     category: "Game",
    //     title: "Max Payne",
    //   },
    // ];
  
  return (
  <>
  {console.log("StartupCard type:", typeof StartupCard)}
  {/* Hero Section */}
  <section className="pink_container pattern">
    <h1 className="heading">Pitch Your Startup, <br />
    Connect With Entrepreneurs </h1>

    <p className="sub-heading">Submit Ideas, Vote On Pitches, and Get Noticed in Virtual Competition. </p>

    <SearchForm query={query}/>

  </section>

  {/* Startups section */}
  <section className="section_container">
    <p className="text-2xl font-semibold mb-4">
      {query? `Search results for "${query}"` : "All Startups"}
      
    </p>
    
    <ul className="mt-7 card_grid">
      {posts?.length > 0 ? (
        posts.map((post:StartupCardType, index: number) => (
          <StartupCard 
            key={post?._id}
            post={post}
          />
        ))
      ) : (
        <p className="no-results">No Startups Found</p>
      )}
    </ul>

  </section>
   <SanityLive />
  </>
  );
}