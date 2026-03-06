import Card from '../components/Card'
import { Image as ImageIcon, MapPin } from 'lucide-react'

const galleryItems = [
  {
    id: '1',
    title: 'Primary Substation Upgrade',
    location: 'Colombo North Grid',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600',
  },
  {
    id: '2',
    title: 'Smart Meter Installation Drive',
    location: 'Western Service Area',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
  },
  {
    id: '3',
    title: 'Field Operations Team Briefing',
    location: 'Central Regional Office',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
  },
  {
    id: '4',
    title: 'Distribution Line Maintenance',
    location: 'Eastern Sector',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
  },
  {
    id: '5',
    title: 'Control Center Monitoring',
    location: 'Operations Hub',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600',
  },
  {
    id: '6',
    title: 'Community Service Connection Program',
    location: 'Southern Province',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
  },
]

export default function GalleryPage() {
  return (
    <div className="bg-base min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <ImageIcon className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">NTNSP Media</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Gallery</h1>
          <p className="text-secondary/60 mt-2">
            Highlights from operations, infrastructure projects, and initiatives across NTNSP.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} hover className="overflow-hidden p-0">
              <img src={item.imageUrl} alt={item.title} className="w-full h-52 object-cover" />
              <div className="p-5">
                <h2 className="text-lg font-bold text-secondary mb-2 line-clamp-2">{item.title}</h2>
                <div className="flex items-center gap-2 text-sm text-secondary/70">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>{item.location}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
