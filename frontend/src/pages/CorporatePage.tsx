import Card from '../components/Card'
import { Building2, Target, Eye, Phone, Mail } from 'lucide-react'

const managementTeam = [
  {
    id: '1',
    name: 'Name 1',
    role: 'Designation 1',
    department: 'Board of Management',
    phone: '+94 11 260 1001',
    email: 'chairman@ntnsp.lk',
  },
  {
    id: '2',
    name: 'Name 2',
    role: 'Designation 2',
    department: 'Corporate Management',
    phone: '+94 11 260 1002',
    email: 'gm@ntnsp.lk',
  },
  {
    id: '3',
    name: 'Name 3',
    role: 'Designation 3',
    department: 'Transmission Operations',
    phone: '+94 11 260 1010',
    email: 'dgm.operations@ntnsp.lk',
  },
  {
    id: '4',
    name: 'Name 4',
    role: 'Designation 4',
    department: 'Finance and Accounts',
    phone: '+94 11 260 1020',
    email: 'dgm.finance@ntnsp.lk',
  },
  {
    id: '5',
    name: 'Name 5',
    role: 'Designation 5',
    department: 'Network Planning',
    phone: '+94 11 260 1030',
    email: 'ce.planning@ntnsp.lk',
  },
  {
    id: '6',
    name: 'Name 6',
    role: 'Designation 6',
    department: 'Infrastructure Development',
    phone: '+94 11 260 1040',
    email: 'ce.infrastructure@ntnsp.lk',
  },
]

export default function CorporatePage() {
  return (
    <div className="bg-base min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Corporate Profile</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Corporate Profile</h1>
          <p className="text-secondary/60 mt-2">Overview of NTNSP strategic direction and key management contacts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-l-4 border-l-primary">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-bold text-secondary">Vision</h2>
            </div>
            <p className="text-secondary/70 leading-relaxed">
              Your vision statement goes here.
            </p>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-bold text-secondary">Mission</h2>
            </div>
            <p className="text-secondary/70 leading-relaxed">
              Your mission statement goes here.
            </p>
          </Card>
        </div>

        <h2 className="text-3xl font-bold text-secondary mb-8">Corporate Management Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managementTeam.map((manager) => (
            <Card key={manager.id} hover>
              <h3 className="text-lg font-bold text-secondary">{manager.name}</h3>
              <p className="text-sm font-semibold text-primary mt-1">{manager.role}</p>
              <p className="text-sm text-secondary/70 mt-1">{manager.department}</p>

              <div className="mt-4 space-y-2 text-sm text-secondary/70">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>{manager.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>{manager.email}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
