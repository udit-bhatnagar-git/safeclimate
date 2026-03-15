import React, { useState } from 'react';
import { 
  Star, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Send,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const MOCK_REVIEWS = [
  {
    id: 'REV-001',
    guest: 'Alice Johnson',
    property: 'Grand Plaza Hotel',
    date: 'Oct 12, 2025',
    rating: 5,
    status: 'Not Replied',
    text: 'The stay was absolutely wonderful! The room was spotless, the staff was incredibly helpful, and the view from the penthouse was breathtaking. I will definitely be back soon.',
    reply: null,
    avatar: 'AJ'
  },
  {
    id: 'REV-002',
    guest: 'Mark Thompson',
    property: 'Sunset Resort',
    date: 'Oct 10, 2025',
    rating: 4,
    status: 'Replied',
    text: 'Great experience overall. The amenities were top-notch and the beach access was very convenient. My only minor complaint was a slight delay during check-in.',
    reply: 'Thank you for your feedback, Mark! We are glad you enjoyed the resort and we are working on streamlining our check-in process to make it even faster.',
    avatar: 'MT'
  },
  {
    id: 'REV-003',
    guest: 'Sarah Miller',
    property: 'Urban Suites',
    date: 'Oct 08, 2025',
    rating: 2,
    status: 'Not Replied',
    text: 'Disappointing stay. The Wi-Fi was very inconsistent, which made it difficult to work. Also, the room felt much smaller than the photos suggested.',
    reply: null,
    avatar: 'SM'
  },
  {
    id: 'REV-004',
    guest: 'James Wilson',
    property: 'Grand Plaza Hotel',
    date: 'Oct 05, 2025',
    rating: 5,
    status: 'Replied',
    text: 'Exceptional service and beautiful room. The breakfast buffet was one of the best I have ever had.',
    reply: 'We are thrilled to hear you enjoyed the breakfast buffet, James! Our chefs take great pride in it. Hope to see you again soon!',
    avatar: 'JW'
  }
];

const RATING_BREAKDOWN = [
  { rating: 5, count: 124, percentage: 65 },
  { rating: 4, count: 42, percentage: 22 },
  { rating: 3, count: 15, percentage: 8 },
  { rating: 2, count: 7, percentage: 3 },
  { rating: 1, count: 3, percentage: 2 }
];

const AI_SUGGESTIONS = [
  "Thank you so much for your kind words! We're thrilled you enjoyed your stay and hope to welcome you back soon.",
  "We appreciate your feedback! It's great to know you had a positive experience, and we'll certainly look into your suggestions.",
  "I'm sorry to hear that your experience wasn't up to our usual standards. We're looking into this issue to ensure it doesn't happen again.",
  "Thank you for choosing us! We're glad we could make your stay comfortable and enjoyable."
];

export default function ReviewsManagementView() {
  const [filterProperty, setFilterProperty] = useState('All Properties');
  const [filterRating, setFilterRating] = useState('All Ratings');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const handleReplyChange = (id: string, text: string) => {
    setReplyText(prev => ({ ...prev, [id]: text }));
  };

  const applyAISuggestion = (id: string, suggestion: string) => {
    setReplyText(prev => ({ ...prev, [id]: suggestion }));
  };

  return (
    <div className="space-y-8 max-w-[1200px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1>Guest Reviews</h1>
          <p>Manage and respond to guest feedback across all properties.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Calendar className="w-4 h-4" />
            <span>Select Date Range</span>
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Avg Rating', value: '4.7', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Total Reviews', value: '191', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Positive', value: '166', icon: ThumbsUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Negative', value: '10', icon: ThumbsDown, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Response Rate', value: '92%', icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 flex flex-col items-center text-center">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">{stat.label}</p>
            <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Rating Breakdown */}
        <div className="xl:col-span-1 card">
          <h3 className="mb-6">Rating Breakdown</h3>
          <div className="space-y-4">
            {RATING_BREAKDOWN.map((item) => (
              <div key={item.rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-8">
                  <span className="text-sm font-bold">{item.rating}</span>
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                </div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
                <span className="text-xs text-text-secondary w-8 text-right">{item.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-sm font-bold text-text-primary">Review Sentiment</p>
            </div>
            <p className="text-xs text-text-secondary">
              Most guests are praising the staff service and cleanliness, while some have mentioned Wi-Fi issues in older wings.
            </p>
          </div>
        </div>

        {/* Filters & Reviews */}
        <div className="xl:col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-border shadow-sm">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="text" className="input pl-10 h-10 text-sm" placeholder="Search reviews..." />
            </div>
            <select 
              value={filterProperty} 
              onChange={(e) => setFilterProperty(e.target.value)}
              className="input h-10 w-auto min-w-[150px] text-sm py-0 pl-3 pr-8"
            >
              <option>All Properties</option>
              <option>Grand Plaza Hotel</option>
              <option>Sunset Resort</option>
              <option>Urban Suites</option>
            </select>
            <select 
              value={filterRating} 
              onChange={(e) => setFilterRating(e.target.value)}
              className="input h-10 w-auto min-w-[120px] text-sm py-0 pl-3 pr-8"
            >
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>2 Stars</option>
              <option>1 Star</option>
            </select>
            <button className="btn-secondary h-10 text-sm flex items-center gap-2 whitespace-nowrap">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Review Cards */}
          <div className="space-y-4">
            {MOCK_REVIEWS.map((review) => (
              <div key={review.id} className="card p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary">{review.guest}</h4>
                      <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                        <span className="font-medium text-primary bg-primary/5 px-2 py-0.5 rounded">{review.property}</span>
                        <span>•</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-4 h-4 ${s <= review.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} 
                        />
                      ))}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      review.status === 'Replied' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {review.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-text-secondary italic leading-relaxed">
                  "{review.text}"
                </p>

                {review.reply ? (
                  <div className="mt-2 p-4 bg-slate-50 rounded-xl border-l-4 border-primary/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-bold text-text-primary">Host Reply</span>
                    </div>
                    <p className="text-sm text-text-secondary italic">
                      {review.reply}
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 space-y-4">
                    <div className="relative">
                      <textarea 
                        value={replyText[review.id] || ''}
                        onChange={(e) => handleReplyChange(review.id, e.target.value)}
                        placeholder="Type your reply here..."
                        className="input h-24 resize-none py-3"
                      />
                      <div className="absolute top-2 right-2">
                         <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-text-secondary mr-2">AI Suggestions:</span>
                      {AI_SUGGESTIONS.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => applyAISuggestion(review.id, suggestion)}
                          className="px-3 py-1 bg-primary/5 text-primary text-[11px] font-medium rounded-full border border-primary/10 hover:bg-primary/10 transition-colors"
                        >
                          Suggest {i + 1}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <button className="btn-primary h-9 px-4">
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reply</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-border mt-8">
            <span className="text-sm text-text-secondary">Showing 1 to 4 of 191 results</span>
            <div className="flex items-center gap-2">
              <button className="btn-secondary w-8 h-8 p-0 flex items-center justify-center">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3, '...', 10].map((p, i) => (
                <button 
                  key={i} 
                  className={`w-8 h-8 text-sm font-bold rounded-lg transition-colors ${p === 1 ? 'bg-primary text-white' : 'hover:bg-slate-100 text-text-secondary'}`}
                >
                  {p}
                </button>
              ))}
              <button className="btn-secondary w-8 h-8 p-0 flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
