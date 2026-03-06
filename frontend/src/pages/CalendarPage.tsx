import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react'
import { mockEvents } from '../mocks/events'
import type { EventDto } from '../types'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CATEGORY_COLORS: Record<string, string> = {
  Training:       'bg-primary/15 text-primary',
  Meeting:        'bg-accent/15 text-accent',
  Wellness:       'bg-primary/10 text-primary',
  HR:             'bg-secondary/15 text-secondary',
  Infrastructure: 'bg-accent/10 text-accent',
  Compliance:     'bg-primary/20 text-primary',
}

function eventsForDate(date: Date): EventDto[] {
  const key = date.toISOString().split('T')[0]
  return mockEvents.filter((e) => e.eventDate === key)
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstWeekday(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return (day + 6) % 7
}

export default function CalendarPage() {
  const today = new Date()
  const [viewYear, setViewYear]       = useState(today.getFullYear())
  const [viewMonth, setViewMonth]     = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
    setSelectedDate(null)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
    setSelectedDate(null)
  }

  const daysInMonth  = getDaysInMonth(viewYear, viewMonth)
  const firstWeekday = getFirstWeekday(viewYear, viewMonth)
  const totalCells   = firstWeekday + daysInMonth
  const totalRows    = Math.ceil(totalCells / 7)
  const gridCells    = totalRows * 7

  const todayIso = today.toISOString().split('T')[0]

  const upcomingEvents = mockEvents
    .filter((e) => e.eventDate >= todayIso)
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate))

  const selectedEvents = selectedDate
    ? mockEvents.filter((e) => e.eventDate === selectedDate)
    : upcomingEvents

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString('default', {
    month: 'long', year: 'numeric',
  })

  return (
    <div className="bg-base min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
        {/* Page header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">NTNSP Calendar</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Events Calendar & Upcoming Events</h1>
          <p className="text-secondary/60 mt-2">
            Browse by month or scroll the events panel. Click any day to filter events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start">
          {/* ── Monthly calendar grid ── */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
            {/* Month navigator */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5 text-secondary" />
              </button>
              <h2 className="text-lg font-bold text-secondary">{monthLabel}</h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5 text-secondary" />
              </button>
            </div>

            {/* Weekday labels */}
            <div className="grid grid-cols-7 border-b border-border">
              {WEEKDAYS.map((d) => (
                <div key={d} className="py-2 text-center text-xs font-semibold text-secondary/70">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 flex-1">
              {Array.from({ length: gridCells }).map((_, idx) => {
                const dayNum = idx - firstWeekday + 1
                const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth
                if (!isCurrentMonth) {
                  return (
                    <div key={idx} className="h-16 border-b border-r border-border/30 bg-muted/20" />
                  )
                }

                const dateObj  = new Date(viewYear, viewMonth, dayNum)
                const isoDate  = dateObj.toISOString().split('T')[0]
                const evts     = eventsForDate(dateObj)
                const isToday   =
                  dateObj.getFullYear() === today.getFullYear() &&
                  dateObj.getMonth()    === today.getMonth()    &&
                  dateObj.getDate()     === today.getDate()
                const isSelected = selectedDate === isoDate

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(isSelected ? null : isoDate)}
                    className={`relative h-16 p-1.5 border-b border-r border-border text-left transition-colors w-full
                      ${isSelected ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold
                        ${isToday
                          ? 'bg-primary text-white'
                          : isSelected
                            ? 'text-primary font-bold'
                            : 'text-secondary'}`}
                    >
                      {dayNum}
                    </span>
                    <div className="mt-1 space-y-0.5 overflow-hidden">
                      {evts.slice(0, 2).map((e) => (
                        <div
                          key={e.id}
                          className="text-[10px] font-medium px-1 py-0.5 rounded bg-primary/15 text-primary truncate"
                        >
                          {e.title}
                        </div>
                      ))}
                      {evts.length > 2 && (
                        <div className="text-[10px] text-secondary/60 px-1">+{evts.length - 2} more</div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Events detail panel ── */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-secondary">
              {selectedDate
                ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('default', {
                    weekday: 'long', month: 'long', day: 'numeric',
                  })
                : 'Upcoming Events'}
            </h3>

            {selectedEvents.length === 0 ? (
              <div className="bg-surface border border-border rounded-2xl p-6 text-sm text-secondary/60">
                No events on this date.
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto pr-1">
                {selectedEvents.map((event) => {
                  const colorCls = CATEGORY_COLORS[event.category] ?? 'bg-primary/10 text-primary'
                  return (
                    <div
                      key={event.id}
                      className="bg-surface border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-bold text-secondary leading-snug">{event.title}</h4>
                        <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${colorCls}`}>
                          {event.category}
                        </span>
                      </div>
                      <p className="text-xs text-secondary/70 mb-3">{event.description}</p>
                      <div className="space-y-1 text-xs text-secondary/60">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="h-3.5 w-3.5 text-accent" />
                          <span>{new Date(event.eventDate + 'T00:00:00').toLocaleDateString()}</span>
                        </div>
                        {event.eventTime && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-accent" />
                            <span>{event.eventTime}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-accent" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-xs text-secondary/60 hover:text-primary transition-colors self-start"
              >
                ← Show upcoming events
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
