import { useEffect, useRef, useState } from 'react';
import { Star, Quote, Trophy, Medal, Award } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'AC',
    model: 'Neon Portrait Generator',
    rating: 5,
    quote: 'Sold my first model in 48 hours. Royalties hit my wallet instantly. The platform is incredibly smooth.',
  },
  {
    id: 2,
    name: 'Sarah Kim',
    avatar: 'SK',
    model: 'CodeGen Assistant',
    rating: 5,
    quote: 'As a buyer, I love being able to test models before purchasing. The sandbox feature is a game-changer.',
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    avatar: 'MJ',
    model: 'WaveForm AI Studio',
    rating: 4,
    quote: 'Great community and transparent pricing. The Solana integration makes everything fast and cheap.',
  },
];

const leaderboard = [
  { rank: 1, name: 'NeuralArts', models: 12, earnings: '$45,230', icon: Trophy },
  { rank: 2, name: 'DeepVision', models: 8, earnings: '$38,450', icon: Medal },
  { rank: 3, name: 'SoundLab', models: 15, earnings: '$32,180', icon: Award },
  { rank: 4, name: 'TextMind', models: 6, earnings: '$28,920', icon: null },
  { rank: 5, name: 'DevAI', models: 9, earnings: '$24,650', icon: null },
];

export default function Community() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative w-full py-20 md:py-28 bg-[#0B0F1F]"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Built by the <span className="text-gradient">community</span>
          </h2>
          <p className="text-[#A9B2C5] max-w-xl mx-auto">
            Join thousands of developers and buyers in the future of AI model marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Quote size={18} className="text-purple-400 mr-2" />
              What creators are saying
            </h3>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`bg-[#111827] rounded-xl p-5 border border-purple-500/20 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{review.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-white font-medium">{review.name}</p>
                          <p className="text-xs text-[#A9B2C5]">Licensed {review.model}</p>
                        </div>
                        <div className="flex items-center space-x-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#A9B2C5] leading-relaxed">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Trophy size={18} className="text-yellow-400 mr-2" />
              Top Creators
            </h3>
            <div
              className={`bg-[#111827] rounded-xl border border-purple-500/20 overflow-hidden transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b border-purple-500/10 text-sm text-[#A9B2C5]">
                <span>Rank</span>
                <span className="col-span-2">Creator</span>
                <span className="text-right">Earnings</span>
              </div>
              
              {/* Rows */}
              {leaderboard.map((creator, index) => (
                <div
                  key={creator.rank}
                  className={`grid grid-cols-4 gap-4 px-5 py-4 border-b border-purple-500/10 last:border-0 hover:bg-purple-500/5 transition-all ${
                    creator.rank <= 3 ? 'bg-purple-500/5' : ''
                  }`}
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.5s ease ${300 + index * 60}ms`
                  }}
                >
                  <div className="flex items-center">
                    {creator.icon && (
                      <creator.icon
                        size={16}
                        className={`mr-2 ${
                          creator.rank === 1
                            ? 'text-yellow-400'
                            : creator.rank === 2
                            ? 'text-gray-300'
                            : 'text-amber-600'
                        }`}
                      />
                    )}
                    <span className={`font-bold ${creator.rank <= 3 ? 'text-white' : 'text-[#A9B2C5]'}`}>
                      #{creator.rank}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-white font-medium">{creator.name}</p>
                    <p className="text-xs text-[#A9B2C5]">{creator.models} models</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-medium mono">{creator.earnings}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
