import { useState, useEffect, useRef } from 'react';
import { Star, Eye, Image, MessageSquare, Music, Code, Filter } from 'lucide-react';

const categories = ['All', 'Image', 'Text', 'Audio', 'Code'];

const models = [
  {
    id: 1,
    title: 'Neon Portrait Generator',
    category: 'Image',
    version: 'v2.1',
    price: 12,
    rating: 4.8,
    reviews: 234,
    image: '/model_thumb_01.jpg',
    author: 'NeuralArts',
  },
  {
    id: 2,
    title: 'CyberFace Synthesizer',
    category: 'Image',
    version: 'v1.5',
    price: 18,
    rating: 4.9,
    reviews: 189,
    image: '/model_thumb_02.jpg',
    author: 'DeepVision',
  },
  {
    id: 3,
    title: 'Sentiment Analyzer Pro',
    category: 'Text',
    version: 'v3.0',
    price: 8,
    rating: 4.6,
    reviews: 412,
    image: '/model_thumb_03.jpg',
    author: 'TextMind',
  },
  {
    id: 4,
    title: 'WaveForm AI Studio',
    category: 'Audio',
    version: 'v1.2',
    price: 25,
    rating: 4.7,
    reviews: 156,
    image: '/model_thumb_04.jpg',
    author: 'SoundLab',
  },
  {
    id: 5,
    title: 'CodeGen Assistant',
    category: 'Code',
    version: 'v2.3',
    price: 15,
    rating: 4.8,
    reviews: 567,
    image: '/model_thumb_05.jpg',
    author: 'DevAI',
  },
  {
    id: 6,
    title: 'PolyMesh 3D Generator',
    category: 'Image',
    version: 'v1.0',
    price: 32,
    rating: 4.5,
    reviews: 89,
    image: '/model_thumb_06.jpg',
    author: 'PolyForm',
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Image: <Image size={14} />,
  Text: <MessageSquare size={14} />,
  Audio: <Music size={14} />,
  Code: <Code size={14} />,
};

export default function BrowseModels() {
  const [activeCategory, setActiveCategory] = useState('All');
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

  const filteredModels = activeCategory === 'All' 
    ? models 
    : models.filter(m => m.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="browse"
      className="relative w-full py-20 md:py-28 bg-[#0B0F1F]"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-10 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-0">
            Featured Models
          </h2>

          {/* Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            <Filter size={16} className="text-[#A9B2C5] mr-2 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-purple-500 text-white'
                    : 'bg-[#111827] text-[#A9B2C5] hover:text-white border border-purple-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model, index) => (
            <ModelCard 
              key={model.id} 
              model={model} 
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelCard({ model, isVisible, delay }: { model: typeof models[0]; isVisible: boolean; delay: number }) {
  return (
    <div 
      className={`group relative bg-[#111827] rounded-2xl overflow-hidden border border-purple-500/20 card-hover transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={model.image}
          alt={model.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 px-3 py-1 rounded-full bg-[#0B0F1F]/80 backdrop-blur-sm border border-purple-500/30">
          <span className="text-purple-400">{categoryIcons[model.category]}</span>
          <span className="text-xs text-[#A9B2C5] mono">{model.category}</span>
        </div>

        {/* Version badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
          <span className="text-xs text-cyan-400 mono">{model.version}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
            {model.title}
          </h3>
        </div>

        <p className="text-sm text-[#A9B2C5] mb-4">by {model.author}</p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-white font-medium">{model.rating}</span>
          <span className="text-sm text-[#A9B2C5]">({model.reviews})</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-white">${model.price}</span>
            <span className="text-sm text-[#A9B2C5]">/license</span>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white transition-all">
            <Eye size={16} />
            <span className="text-sm font-medium">Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
}
