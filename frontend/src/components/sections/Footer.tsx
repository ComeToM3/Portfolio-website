'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/i18n/useTranslations';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const [currentYear, setCurrentYear] = useState('2024');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const quickLinks = [
    { name: t('links.home') as string, href: '#home' },
    { name: t('links.about') as string, href: '#about' },
    { name: t('links.skills') as string, href: '#skills' },
    { name: t('links.projects') as string, href: '#projects' },
    { name: t('links.contact') as string, href: '#contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/ComeToM3', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/johan-dominguez', icon: '💼' },
    { name: 'Portfolio', url: 'https://hordearii.ca', icon: '🌐' }
  ];

  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <span className="text-white font-bold text-xl">Johan Dominguez</span>
            </div>
            <p className="text-gray-400 max-w-md">
              {t('description') as string}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('quick_links') as string}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('contact_info') as string}</h4>
            <div className="space-y-2">
              <p className="text-gray-400">
                📧 contact@hordearii.ca
              </p>
              <p className="text-gray-400">
                📍 Montréal, QC
              </p>
              <p className="text-gray-400">
                ⏰ {t('availability') as string}
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                >
                  <span className="text-xl">{social.icon}</span>
                  <span className="hidden sm:inline">{social.name}</span>
                </Link>
              ))}
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t('privacy_policy') as string}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t('terms_of_service') as string}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Johan Dominguez. {t('rights_reserved') as string}
          </p>
        </div>
      </div>
    </footer>
  );
}
