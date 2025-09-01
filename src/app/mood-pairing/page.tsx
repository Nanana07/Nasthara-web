
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Sparkles, Home, BookHeart, Instagram, Heart, ShoppingCart } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { products } from '@/app/page';
import type { Product } from '@/types/product';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

type Step = 'mood' | 'taste' | 'result';
type Mood = 'semangat' | 'santai' | 'nostalgia' | 'rayain';
type Taste = 'manis' | 'gurih' | 'klasik' | 'cokelat';

const moodQuestions = {
  title: "Lagi ngerasain apa hari ini?",
  options: [
    { value: 'semangat', label: 'Butuh semangat' },
    { value: 'santai', label: 'Santai sore' },
    { value: 'nostalgia', label: 'Nostalgia masa kecil' },
    { value: 'rayain', label: 'Rayain momen spesial' },
  ],
};

const tasteQuestions = {
  title: "Suka rasa yang kayak gimana?",
  options: [
    { value: 'manis', label: 'Manis & Lumer' },
    { value: 'gurih', label: 'Gurih & Renyah' },
    { value: 'klasik', label: 'Klasik & Bikin Kangen' },
    { value: 'cokelat', label: 'Cokelat Banget' },
  ],
};

const getRecommendation = (mood: Mood, taste: Taste): Product => {
  const mapping: { [key in Mood]?: { [key in Taste]?: string } } = {
    semangat: { manis: 'Palm Cheese', gurih: 'Bawang Gunting', cokelat: 'Choco Mede', klasik: 'Kastengel Premium' },
    santai: { manis: 'Lidah Kucing', gurih: 'Bawang Gunting', cokelat: 'Choco Mede', klasik: 'Palm Cheese' },
    nostalgia: { manis: 'Nastar', gurih: 'Kastengel Premium', klasik: 'Nastar', cokelat: 'Choco Mede' },
    rayain: { manis: 'Lidah Kucing', gurih: 'Kastengel Premium', klasik: 'Nastar', cokelat: 'Choco Mede' },
  };

  const recommendedName = mapping[mood]?.[taste] || 'Nastar';
  return products.find(p => p.name === recommendedName) || products[0];
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const Header = () => (
  <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
    <div className="container mx-auto flex items-center justify-between gap-2">
      <Link href="/" className="flex items-center gap-2 group">
        <Logo className="group-hover:animate-spin" style={{ animationDuration: '2s' }} />
        <span className="text-xl sm:text-2xl font-bold font-headline text-foreground">Nasthara</span>
      </Link>
      <nav className="flex items-center shrink-0">
        <Button variant="ghost" asChild>
          <Link href="/">
            <Home className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="group">
                <Heart className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem asChild>
                <Link href="/blog">
                <BookHeart className="mr-2 h-4 w-4" />
                <span>Blog</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="https://instagram.com/NASTHAR_A" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-4 w-4" />
                <span>Instagram</span>
                </Link>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="bg-card/80 py-12 px-4 mt-20">
    <div className="container mx-auto text-center text-muted-foreground">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Logo />
        <span className="text-2xl font-bold font-headline text-foreground">Nasthara</span>
      </div>
      <p className="text-lg italic mb-6">“Because every home has a taste. And that taste is Nasthara.”</p>
      <p className="text-xs">&copy; {new Date().getFullYear()} Nasthara. All rights reserved.</p>
    </div>
  </footer>
);

export default function MoodPairingPage() {
  const [step, setStep] = useState<Step>('mood');
  const [mood, setMood] = useState<Mood | null>(null);
  const [taste, setTaste] = useState<Taste | null>(null);
  const [recommendation, setRecommendation] = useState<Product | null>(null);

  const handleMoodSelect = (selectedMood: Mood) => {
    setMood(selectedMood);
    setStep('taste');
  };

  const handleTasteSelect = (selectedTaste: Taste) => {
    setTaste(selectedTaste);
    if (mood) {
      const result = getRecommendation(mood, selectedTaste);
      setRecommendation(result);
    }
    setStep('result');
  };
  
  const resetQuiz = () => {
    setStep('mood');
    setMood(null);
    setTaste(null);
    setRecommendation(null);
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-background font-body text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <section className="w-full max-w-2xl text-center">
            <AnimatePresence mode="wait">
                {step === 'mood' && (
                    <motion.div key="mood" variants={cardVariants} initial="hidden" animate="visible" exit="exit">
                        <Card className="p-8 shadow-lg">
                            <CardHeader>
                                <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
                                <CardTitle className="text-3xl font-headline text-accent">{moodQuestions.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {moodQuestions.options.map(option => (
                                    <Button key={option.value} variant="outline" size="lg" className="h-16 text-base" onClick={() => handleMoodSelect(option.value as Mood)}>
                                        {option.label}
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {step === 'taste' && (
                     <motion.div key="taste" variants={cardVariants} initial="hidden" animate="visible" exit="exit">
                        <Card className="p-8 shadow-lg">
                            <CardHeader>
                                <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
                                <CardTitle className="text-3xl font-headline text-accent">{tasteQuestions.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {tasteQuestions.options.map(option => (
                                    <Button key={option.value} variant="outline" size="lg" className="h-16 text-base" onClick={() => handleTasteSelect(option.value as Taste)}>
                                        {option.label}
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {step === 'result' && recommendation && (
                    <motion.div key="result" variants={cardVariants} initial="hidden" animate="visible" exit="exit">
                        <Card className="p-8 shadow-lg">
                             <CardHeader className="text-center">
                                <CardDescription className="text-lg">Untuk kamu, kami rekomendasikan...</CardDescription>
                                <CardTitle className="text-4xl font-headline text-accent py-2">{recommendation.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-6">
                               <Image 
                                    src={recommendation.flavors[0].image} 
                                    alt={recommendation.name} 
                                    width={200} 
                                    height={200} 
                                    className="rounded-lg object-cover shadow-lg"
                                    data-ai-hint={recommendation.flavors[0].hint}
                                />
                                <p className="text-muted-foreground text-lg italic text-center max-w-md">
                                    "{recommendation.flavors[0].description}"
                                </p>
                                <p className="text-2xl font-bold text-primary">
                                    Mulai dari {formatPrice(recommendation.flavors[0].sizes[0].price)}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                        <Link href="/#products">
                                            <ShoppingCart className="mr-2 h-5 w-5" /> Pesan Sekarang
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="lg" onClick={resetQuiz}>
                                        Coba Lagi
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  );
}
