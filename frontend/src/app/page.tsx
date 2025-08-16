import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />
      
      {/* Placeholder pour les autres sections */}
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Sections à venir</h2>
          <p className="text-gray-400">
            Skills • Projects • Contact
          </p>
        </div>
      </div>
    </main>
  );
}
