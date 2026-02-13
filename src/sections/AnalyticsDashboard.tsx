import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Download, Star, DollarSign, ArrowUpRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const stats = [
  { label: 'Total Earnings', value: '$12,450', change: '+23%', icon: DollarSign },
  { label: 'Monthly Licenses', value: '847', change: '+12%', icon: Download },
  { label: 'Avg Rating', value: '4.8', change: '+0.2', icon: Star },
];

const chartData = [
  { name: 'Jan', earnings: 2400 },
  { name: 'Feb', earnings: 3600 },
  { name: 'Mar', earnings: 3200 },
  { name: 'Apr', earnings: 4800 },
  { name: 'May', earnings: 5200 },
  { name: 'Jun', earnings: 6100 },
];

const transactions = [
  { id: '#TX-8921', model: 'Neon Portrait', buyer: '0x7a...3f', amount: '$24', time: '2m ago' },
  { id: '#TX-8920', model: 'CodeGen Pro', buyer: '0x9c...8a', amount: '$15', time: '5m ago' },
  { id: '#TX-8919', model: 'Neon Portrait', buyer: '0x2d...7e', amount: '$24', time: '12m ago' },
  { id: '#TX-8918', model: 'WaveForm AI', buyer: '0x5f...1b', amount: '$32', time: '18m ago' },
];

export default function AnalyticsDashboard() {
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
            Earnings you can <span className="text-gradient">see</span>
          </h2>
          <p className="text-[#A9B2C5] max-w-xl mx-auto">
            Track your model performance, royalties, and buyer activity in real-time
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-[#111827] rounded-xl p-5 border border-purple-500/20 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[#A9B2C5]">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <stat.icon size={16} className="text-purple-400" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-green-400 flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard */}
        <div
          className={`bg-[#111827] rounded-2xl border border-purple-500/20 overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ perspective: '1000px', transitionDelay: '300ms' }}
        >
          {/* Dashboard Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/10">
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold">Revenue Overview</span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-sm">
                  6M
                </button>
                <button className="px-3 py-1 rounded-lg text-[#A9B2C5] text-sm hover:bg-purple-500/10">
                  1Y
                </button>
                <button className="px-3 py-1 rounded-lg text-[#A9B2C5] text-sm hover:bg-purple-500/10">
                  All
                </button>
              </div>
            </div>
            <button className="flex items-center space-x-1 text-purple-400 text-sm hover:text-purple-300">
              <span>View Dashboard</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Chart */}
            <div className="lg:col-span-2 p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(168,85,247,0.1)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#A9B2C5" 
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#A9B2C5" 
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111827',
                        border: '1px solid rgba(168,85,247,0.3)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#A9B2C5' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: number) => [`$${value}`, 'Earnings']}
                    />
                    <Area
                      type="monotone"
                      dataKey="earnings"
                      stroke="#A855F7"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorEarnings)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="border-t lg:border-t-0 lg:border-l border-purple-500/10 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">
                Recent Transactions
              </h3>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-2 border-b border-purple-500/10 last:border-0"
                  >
                    <div>
                      <p className="text-sm text-white font-medium">{tx.model}</p>
                      <p className="text-xs text-[#A9B2C5] mono">{tx.buyer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-400 font-medium">{tx.amount}</p>
                      <p className="text-xs text-[#A9B2C5]">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
