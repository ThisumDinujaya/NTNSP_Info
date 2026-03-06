import type { EventDto } from '../types';

export const mockEvents: EventDto[] = [
  {
    id: '1',
    title: 'Grid Operations Workshop',
    description: 'Advanced training on grid management and control systems.',
    eventDate: '2026-02-16',
    eventTime: '09:00 AM',
    location: 'NTNSP Training Center',
    category: 'Training'
  },
  {
    id: '2',
    title: 'Substation Safety Inspection',
    description: 'Quarterly safety audit of all major substations.',
    eventDate: '2026-02-19',
    eventTime: '08:00 AM',
    location: 'All Substations',
    category: 'Safety'
  },
  {
    id: '3',
    title: 'Network Reliability Review',
    description: 'Monthly review of transmission network performance metrics.',
    eventDate: '2026-02-22',
    eventTime: '02:00 PM',
    location: 'Control Center',
    category: 'Meeting'
  },
  {
    id: '4',
    title: 'Emergency Response Drill',
    description: 'Practice drill for grid emergency scenarios.',
    eventDate: '2026-03-18',
    eventTime: '10:00 AM',
    location: 'Regional Control Centers',
    category: 'Drill'
  },
  {
    id: '5',
    title: 'Infrastructure Planning Session',
    description: 'Strategic planning for future transmission projects.',
    eventDate: '2026-03-22',
    eventTime: '09:30 AM',
    location: 'NTNSP Headquarters',
    category: 'Planning'
  }
];
