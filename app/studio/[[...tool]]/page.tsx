import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// prevent Next from statically caching or streaming this route
export const dynamic = 'force-static'

// pull in the default <meta> tags that Studio needs
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}