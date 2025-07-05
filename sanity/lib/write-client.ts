import "server-only" //The code in this 
// file should only run on server as their as
//a token involved which give access to write using sanity client!

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
});

if(!writeClient.config().token){
    throw new Error("Write token not found.");
}
