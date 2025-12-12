import React from 'react';
import { Search, BookOpen, Users, FileText, Download } from 'lucide-react';

export default function Hero() {
  const features = [
    {
      icon: BookOpen,
      title: 'Previous Year Papers',
      description: 'Access a comprehensive collection of past exam papers',
      color: 'bg-[#2196F3]',
    },
    {
      icon: Users,
      title: 'Collaborate',
      description: 'Connect with peers and share knowledge',
      color: 'bg-[#4CAF50]',
    },
    {
      icon: FileText,
      title: 'Study Resources',
      description: 'Download and share study materials',
      color: 'bg-[#9C27B0]',
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-[#1A237E] to-[#3949AB]">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#5C6BC0] rounded-full opacity-20"></div>
        <div className="absolute top-60 -left-20 w-60 h-60 bg-[#7986CB] rounded-full opacity-20"></div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8">
            Your Digital
            <span className="block text-[#82B1FF]">Academic Companion</span>
          </h1>

          {/* Featured Images Grid */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400"
              alt="Students studying"
              className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 h-40 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400"
              alt="Library"
              className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 h-40 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400"
              alt="Study group"
              className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 h-40 w-full object-cover"
            />
          </div>

          <p className="mt-3 max-w-2xl mx-auto text-xl text-[#E8EAF6] sm:mt-5">
            Access previous year papers, collaborate with peers, and share resources all in one place.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative rounded-full shadow-lg">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-14 pr-6 py-4 rounded-full border-0 bg-white/90 backdrop-blur-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#82B1FF]"
                placeholder="Search for papers, resources..."
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/papers"
              className="inline-flex items-center px-8 py-3 rounded-full text-white bg-[#FF4081] hover:bg-[#F50057] transition-colors shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Get Started
            </a>
            <a
              href="/collaborate"
              className="inline-flex items-center px-8 py-3 rounded-full text-[#1A237E] bg-white hover:bg-[#E8EAF6] transition-colors shadow-lg hover:shadow-xl"
            >
              <Users className="w-5 h-5 mr-2" />
              Collaborate
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="absolute -top-5 left-6">
                <span className={`inline-flex items-center justify-center p-3 ${feature.color} rounded-xl shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}