import { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What does buying a model license give me?',
    answer: 'When you purchase a license, you receive an NFT that grants you the right to use the AI model according to the license terms (personal, commercial, or enterprise). The NFT serves as proof of ownership and can be verified on the Solana blockchain.',
  },
  {
    question: 'How are royalties paid to creators?',
    answer: 'Creators set their royalty percentage (typically 5-15%) when minting their model. Every time the model is licensed, royalties are automatically distributed to the creator\'s wallet via smart contracts — no manual intervention required.',
  },
  {
    question: 'Can I test models before purchasing?',
    answer: 'Yes! Our in-browser sandbox allows you to test any model with your own data before buying. Simply upload a sample, run inference, and see the results in real-time.',
  },
  {
    question: 'What chains are supported?',
    answer: 'Currently, Synthera operates exclusively on Solana for its low fees and fast transaction speeds. We plan to expand to other chains in the future based on community demand.',
  },
  {
    question: 'How do I upload my own model?',
    answer: 'Connect your wallet, navigate to the Developer Dashboard, and click "Upload Model". You\'ll need to provide model files, metadata, pricing, and license terms. Once uploaded, mint your model as an NFT with a single transaction.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support common AI model formats including .onnx, .pt (PyTorch), .h5 (Keras/TensorFlow), .pkl, and .joblib. Maximum file size is 2GB per model.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full py-20 md:py-28 bg-[#0B0F1F]"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div
          className={`text-center mb-12 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <HelpCircle size={16} className="text-purple-400" />
            <span className="text-sm text-purple-400">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="text-[#A9B2C5]">
            Everything you need to know about Synthera
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-[#111827] rounded-xl border border-purple-500/20 overflow-hidden transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-purple-500/5 transition-colors"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-purple-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4">
                  <p className="text-[#A9B2C5] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
