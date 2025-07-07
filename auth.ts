import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from '@/sanity/lib/queries'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })],
    callbacks: {
      // if new user signed up using Github, then make an author in the Sanity so that he can create startups!
  async signIn({ user, profile }) {
  try {
    await writeClient.createIfNotExists({ //this function is used instead of just writeClient.create, becaue it wil first see if the _id is different of what we passing through profile.id, if different then will make a new author doc in sanity otherwise will ignore the function!
      _id: profile.id, //_id is the sanity original id, and we set it to the github id (by using profile.id)..this make sure it has unique id
      _type: "author",
      name:    user.name,
      username:user.login,
      email:   user.email,
      image:   user.image,
      bio:     profile.bio || "",
    });
  } catch (err) {
    console.error("⚠️ Sanity write failed:", err);
  }
  // always return true so NextAuth will proceed
  return true;
},
      // connect Github user with sanity author
      // that can create a startup
      async jwt({token, account, profile}){
        if(account && profile){
          const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });
          token.id = user?._id;
        }
        return token;
      },

      // in order to use the id, we have to call a 3rd callback function call "session"

      async session({session, token}){
        Object.assign(session, {id: token.id});
        return session;
      }
    }
  
});
