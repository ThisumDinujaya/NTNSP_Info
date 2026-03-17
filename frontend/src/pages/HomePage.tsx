import { useState, useEffect } from 'react';
import { mockQuickLinks } from '../mocks/quickLinks';
import { mockEvents } from '../mocks/events';
import { mockHighlights } from '../mocks/highlights';
import { mockHeroImages } from '../mocks/heroImages';
import Card from '../components/Card';
import { Calendar, FileText, Activity, ArrowRight, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Zap, Newspaper, MapPin, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchPublicNews } from '../services/newsService';
import type { NewsDto } from '../types';
import {
  DocumentTextIcon,
  UserIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const iconMap: Record<string, any> = {
  Activity,
  Zap,
  DocumentTextIcon,
  UserIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestNews, setLatestNews] = useState<NewsDto[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setNewsLoading(true);
      try {
        const data = await fetchPublicNews();
        setLatestNews(data.slice(0, 3)); // Show top 3 latest news
      } catch (error) {
        console.error('Failed to load latest news:', error);
      } finally {
        setNewsLoading(false);
      }
    };
    loadNews();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockHeroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockHeroImages.length) % mockHeroImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel with NTNSP Branding */}
      <div className="relative h-[500px] bg-gradient-to-r from-[hsl(var(--navy-dark))] via-[hsl(var(--primary))] to-[hsl(var(--accent))] overflow-hidden">
        {/* Circuit Pattern Overlay */}
        <div className="absolute inset-0 circuit-pattern"></div>
        {/* Data lines pattern background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--accent))]/20 to-transparent animate-pulse"></div>
          <svg className="w-full h-full" viewBox="0 0 1200 500" preserveAspectRatio="none">
            <defs>
              <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M 0 250 Q 300 100, 600 250 T 1200 250" stroke="url(#dataGradient)" strokeWidth="2" fill="none" />
            <path d="M 0 300 Q 300 150, 600 300 T 1200 300" stroke="url(#dataGradient)" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="100" cy="250" r="4" fill="hsl(var(--accent))" opacity="0.8" />
            <circle cx="300" cy="150" r="3" fill="hsl(var(--primary))" opacity="0.6" />
            <circle cx="600" cy="250" r="5" fill="hsl(var(--accent))" opacity="0.9" className="animate-pulse" />
            <circle cx="900" cy="150" r="3" fill="hsl(var(--primary))" opacity="0.6" />
            <circle cx="1100" cy="250" r="4" fill="hsl(var(--accent))" opacity="0.8" />
          </svg>
        </div>

        {mockHeroImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--navy-dark))]/85 via-[hsl(var(--primary))]/60 to-[hsl(var(--accent))]/50 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-glow drop-shadow-lg">
                    {image.title}
                  </h1>
                  <p className="text-xl text-gray-50 drop-shadow-md">{image.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Animated Transmission Lines with Current Flow */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <svg className="w-full h-full" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="transmissionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#1E90FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path 
              d="M 150 200 L 300 180 L 450 200 L 600 180 L 750 200 L 900 180 L 1050 200" 
              className="transmission-line current-flow"
            />
            <path 
              d="M 300 180 L 350 150" 
              className="transmission-line current-flow"
              style={{ animationDelay: '0.3s' }}
            />
            <path 
              d="M 450 200 L 500 230" 
              className="transmission-line current-flow"
              style={{ animationDelay: '0.6s' }}
            />
            <path 
              d="M 600 180 L 650 150" 
              className="transmission-line current-flow"
              style={{ animationDelay: '0.9s' }}
            />
            <path 
              d="M 750 200 L 800 230" 
              className="transmission-line current-flow"
              style={{ animationDelay: '1.2s' }}
            />
            <path 
              d="M 900 180 L 950 150" 
              className="transmission-line current-flow"
              style={{ animationDelay: '1.5s' }}
            />
            <circle cx="150" cy="200" r="6" fill="#00FFFF" opacity="0.9" filter="blur(2px)" />
            <circle cx="300" cy="180" r="5" fill="#1E90FF" opacity="0.8" filter="blur(1px)" />
            <circle cx="450" cy="200" r="6" fill="#00FFFF" opacity="0.9" filter="blur(2px)" />
            <circle cx="600" cy="180" r="5" fill="#1E90FF" opacity="0.8" filter="blur(1px)" />
            <circle cx="750" cy="200" r="6" fill="#00FFFF" opacity="0.9" filter="blur(2px)" />
            <circle cx="900" cy="180" r="5" fill="#1E90FF" opacity="0.8" filter="blur(1px)" />
            <circle cx="1050" cy="200" r="6" fill="#00FFFF" opacity="0.9" filter="blur(2px)" />
            <circle cx="350" cy="150" r="4" fill="#00FFFF" opacity="0.7" filter="blur(1px)" />
            <circle cx="500" cy="230" r="4" fill="#1E90FF" opacity="0.7" filter="blur(1px)" />
            <circle cx="650" cy="150" r="4" fill="#00FFFF" opacity="0.7" filter="blur(1px)" />
            <circle cx="800" cy="230" r="4" fill="#1E90FF" opacity="0.7" filter="blur(1px)" />
            <circle cx="950" cy="150" r="4" fill="#00FFFF" opacity="0.7" filter="blur(1px)" />
          </svg>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full transition-all neon-glow-sm"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full transition-all neon-glow-sm"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Glowing Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {mockHeroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 h-3 bg-white neon-glow-sm' 
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Glassmorphism Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mockHighlights.map((highlight) => {
            const Icon = iconMap[highlight.icon] || Activity;
            const isPositiveTrend = highlight.trend === 'up';
            return (
              <div key={highlight.id} className="ntnsp-gradient-border p-6 relative overflow-hidden group">
                {/* Circuit Pattern Background */}
                <div className="absolute inset-0 circuit-pattern opacity-20"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 p-3 rounded-xl border border-[hsl(var(--accent))]/30 group-hover:neon-glow-sm transition-all">
                      <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                    </div>
                    {highlight.trend && (
                      <div className={`flex items-center text-sm font-semibold gap-1 ${isPositiveTrend ? 'neon-gold' : 'text-red-500'}`}>
                        {isPositiveTrend ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span>{highlight.trendValue}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-[hsl(var(--secondary))] mb-1">{highlight.value}</h3>
                  <p className="text-sm font-medium text-gray-700 mb-1">{highlight.title}</p>
                  <p className="text-xs text-gray-500">{highlight.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[hsl(var(--secondary))] flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 rounded-lg border border-[hsl(var(--accent))]/30 neon-glow-sm">
                  <Newspaper className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                Latest News
              </h2>
              <Link to="/news" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] flex items-center text-sm font-semibold transition-colors gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {newsLoading ? (
                <div className="ntnsp-gradient-border p-8 text-center text-gray-600">Loading latest news...</div>
              ) : latestNews.length === 0 ? (
                <div className="ntnsp-gradient-border p-8 text-center text-gray-600">No news available yet.</div>
              ) : (
                latestNews.map((news) => (
                  <div key={news.id ?? news._id} className="ntnsp-gradient-border p-6 group">
                    <div className="flex gap-4">
                      {news.imageUrl && (
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0 group-hover:shadow-lg transition-all"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/10 text-[hsl(var(--primary))] text-xs font-semibold rounded-full border border-[hsl(var(--accent))]/20">
                            {news.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-[hsl(var(--secondary))] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-sm text-gray-600">{news.summary}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Events Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[hsl(var(--secondary))] flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 rounded-lg border border-[hsl(var(--accent))]/30 neon-glow-sm">
                  <Calendar className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                Events
              </h2>
            </div>
            <div className="ntnsp-gradient-border p-6 neon-glow-sm">
              <div className="space-y-6">
                {mockEvents.slice(0, 4).map((event) => (
                  <div key={event.id} className="border-l-4 border-[hsl(var(--accent))] pl-4 pb-4 last:pb-0 last:border-l-0">
                    <h4 className="font-semibold text-sm text-[hsl(var(--secondary))] mb-3">{event.title}</h4>
                    <div className="flex flex-col gap-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[hsl(var(--primary))]" />
                        <span className="font-medium text-[hsl(var(--primary))]">
                          {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[hsl(var(--accent))]" />
                        <span className="text-gray-700">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/calendar"
                className="mt-6 block text-center py-3 text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] text-sm font-semibold transition-colors border-t border-white/20 hover:bg-[hsl(var(--primary))]/5"
              >
                View Full Calendar →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[hsl(var(--secondary))] mb-8 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 rounded-lg border border-[hsl(var(--accent))]/30 neon-glow-sm">
              <Zap className="h-6 w-6 text-[hsl(var(--primary))]" />
            </div>
            Quick Access
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockQuickLinks.slice(0, 8).map((link) => {
              const Icon = iconMap[link.icon] || Activity;
              return (
                <Link
                  key={link.id}
                  to={link.url}
                  className="ntnsp-gradient-border p-6 text-center group"
                >
                  <div className="bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-3 border border-[hsl(var(--accent))]/30 group-hover:neon-glow-sm transition-all">
                    <Icon className="h-7 w-7 text-[hsl(var(--primary))]" />
                  </div>
                  <h3 className="font-semibold text-sm text-[hsl(var(--secondary))] mb-1 group-hover:text-[hsl(var(--primary))] transition-colors">{link.title}</h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">{link.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
