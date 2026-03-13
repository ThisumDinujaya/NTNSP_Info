import type { NewsDto } from '../types';

export const mockNews: NewsDto[] = [
  {
    id: '1',
    title: 'New 400kV Transmission Line Project Commenced',
    excerpt: 'NTNSP initiates construction of critical transmission infrastructure to strengthen national grid.',
    content: 'Full article content here...',
    category: 'Infrastructure',
    imageUrl: '/images/new-transmission-line.jpeg',
    publishedAt: '2026-02-05',
    author: 'Infrastructure Division'
  },
  {
    id: '2',
    title: 'Grid Modernization Initiative Reaches Milestone',
    excerpt: 'Smart grid implementation achieves 60% completion across transmission network.',
    content: 'Full article content here...',
    category: 'Technology',
    imageUrl: '/images/image-35-2-768x433.png',
    publishedAt: '2026-02-04',
    author: 'Technology Team'
  },
  {
    id: '3',
    title: 'Annual Grid Maintenance Schedule Released',
    excerpt: 'Planned outages and maintenance activities for Q1 2026 announced.',
    content: 'Full article content here...',
    category: 'Operations',
    imageUrl: '/images/grid-maintenance.jpeg',
    publishedAt: '2026-02-03',
    author: 'Operations Division'
  },
  {
    id: '4',
    title: 'Substation Upgrade Program Expansion',
    excerpt: 'Investment approved for upgrading 15 key substations nationwide.',
    content: 'Full article content here...',
    category: 'Development',
    imageUrl: '/images/GettyImages-1340413200.original.jpg',
    publishedAt: '2026-02-02',
    author: 'Development Team'
  }
];
