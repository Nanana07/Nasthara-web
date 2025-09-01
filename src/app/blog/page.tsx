
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookHeart, Heart, Instagram } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const recipes = [
  {
    title: 'Classic Nastar',
    slug: 'classic-nastar',
    description: 'Resep klasik yang tak lekang oleh waktu, menghadirkan kelembutan dan rasa nanas yang sempurna di setiap gigitan.',
    image: '/nastar.png',
    hint: 'nastar cookie',
    tags: ['Best Seller', 'Manis', 'Klasik'],
  },
  {
    title: 'Palm Cheese Cookies',
    slug: 'palm-cheese',
    description: 'Perpaduan unik rasa gurih dari keju edam dan manis dari gula palem. Renyah di luar, lembut di dalam.',
    image: '/palm_cheese.png',
    hint: 'palm cheese cookie',
    tags: ['Gurih', 'Manis', 'Unik'],
  },
  {
    title: 'Lidah Kucing Renyah',
    slug: 'lidah-kucing',
    description: 'Kue tipis, renyah, dan ringan dengan rasa manis vanila yang lembut. Sempurna untuk teman minum teh.',
    image: '/lidah_kucing.png',
    hint: 'cat tongue cookie',
    tags: ['Best Seller', 'Renyah', 'Ringan'],
  },
    {
    title: 'Kastengel Keju Premium',
    slug: 'kastengel-keju-premium',
    description: 'Resep Kastengel premium dengan cita rasa keju yang kuat dan tekstur renyah yang bikin nagih.',
    image: '/kastengel.png',
    hint: 'premium kaasstengels',
    tags: ['Gurih', 'Premium', 'Keju'],
  },
  {
    title: 'Choco Mede Cookies',
    slug: 'choco-mede',
    description: 'Kombinasi klasik cokelat premium dan kacang mede renyah. Manisnya pas, tidak berlebihan.',
    image: '/choco_mede.png',
    hint: 'chocolate cashew cookie',
    tags: ['Cokelat', 'Kacang', 'Manis'],
  },
  {
    title: 'Stik Bawang Gunting',
    slug: 'bawang-gunting',
    description: 'Camilan gurih dan renyah dengan aroma bawang yang khas. Cocok untuk yang tidak terlalu suka manis.',
    image: '/bawang_gunting.png',
    hint: 'savory snack',
    tags: ['Gurih', 'Renyah', 'Asin'],
  }
];

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
                    Home
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

export default function RecipesPage() {
  return (
    <div className="bg-background font-body text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto text-center">
            <BookHeart className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Blog Internal Nasthara</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
              Kumpulan resep rahasia dari dapur kami, kini untuk Anda coba di rumah. Selamat berkreasi!
            </p>
          </div>
        </section>

        <section className="pb-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => {
                const href = `/blog/${recipe.slug}`;
                
                return (
                    <Card key={index} className="overflow-hidden h-full flex flex-col group border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 bg-card">
                    <CardHeader className="p-0 relative">
                        <Link href={href} className="aspect-video overflow-hidden w-full cursor-pointer block">
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            width={600}
                            height={400}
                            data-ai-hint={recipe.hint}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                        </Link>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow flex flex-col">
                        <CardTitle className="font-headline text-2xl mb-2">{recipe.title}</CardTitle>
                        <CardDescription className="text-base text-muted-foreground flex-grow mb-4">{recipe.description}</CardDescription>
                        <div className="flex gap-2 mb-4">
                        {recipe.tags.map(tag => (
                            <span key={tag} className="text-xs bg-primary/20 text-primary-foreground py-1 px-3 rounded-full font-semibold">{tag}</span>
                        ))}
                        </div>
                        <Button asChild className="w-full mt-auto bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform group-hover:-translate-y-1">
                        <Link href={href}>
                            Lihat Postingan <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        </Button>
                    </CardContent>
                    </Card>
                );
            })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
