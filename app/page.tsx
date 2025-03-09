import Hero from './ui/hero'
import HymnsGallery from './ui/hymns-gallery/hymns-gallery'

export default async function HomePage() {
  return (
    <div>
      <Hero />
      <HymnsGallery />
    </div>
  )
}
