import React, { useState } from 'react';
import { Menu, X, BookOpen, Users, FileText, Upload, LogIn } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Previous Papers', href: '/papers', icon: FileText },
    { name: 'Collaborate', href: '/collaborate', icon: Users },
    { name: 'Upload Resources', href: '/upload', icon: Upload },
  ];

  return (
    <nav className="bg-[#1A237E]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-xl font-bold">StudySphere</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E8EAF6] hover:bg-[#3949AB] px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-xs mx-4">
            <SearchBar />
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF4081] text-white hover:bg-[#F50057] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </a>
              <a
                href="/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#1A237E] hover:bg-[#E8EAF6] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign up
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[#E8EAF6] hover:bg-[#3949AB] focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1A237E]/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8EAF6] hover:bg-[#3949AB] block px-3 py-2 rounded-lg text-base font-medium flex items-center gap-2 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </a>
            ))}
            <div className="mt-4 space-y-2">
              <a
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF4081] text-white hover:bg-[#F50057] block px-3 py-2 rounded-lg text-base font-medium flex items-center gap-2 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </a>
              <a
                href="/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#1A237E] hover:bg-[#E8EAF6] block px-3 py-2 rounded-lg text-base font-medium text-center transition-colors"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}