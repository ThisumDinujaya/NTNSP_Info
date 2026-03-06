import type { NewsDto } from '../types';

export const mockNews: NewsDto[] = [
  {
    id: '1',
    title: 'New 400kV Transmission Line Project Commenced',
    excerpt: 'NTNSP initiates construction of critical transmission infrastructure to strengthen national grid.',
    content: 'Full article content here...',
    category: 'Infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
    publishedAt: '2026-02-05',
    author: 'Infrastructure Division'
  },
  {
    id: '2',
    title: 'Grid Modernization Initiative Reaches Milestone',
    excerpt: 'Smart grid implementation achieves 60% completion across transmission network.',
    content: 'Full article content here...',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    publishedAt: '2026-02-04',
    author: 'Technology Team'
  },
  {
    id: '3',
    title: 'Annual Grid Maintenance Schedule Released',
    excerpt: 'Planned outages and maintenance activities for Q1 2026 announced.',
    content: 'Full article content here...',
    category: 'Operations',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
    publishedAt: '2026-02-03',
    author: 'Operations Division'
  },
  {
    id: '4',
    title: 'Substation Upgrade Program Expansion',
    excerpt: 'Investment approved for upgrading 15 key substations nationwide.',
    content: 'Full article content here...',
    category: 'Development',
    imageUrl: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800',
    publishedAt: '2026-02-02',
    author: 'Development Team'
  }
];
