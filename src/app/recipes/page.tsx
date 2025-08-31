'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cookie, BookHeart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const recipes = [
  {
    title: 'Classic Nastar',
    slug: 'classic-nastar',
    description: 'Resep klasik yang tak lekang oleh waktu, menghadirkan kelembutan dan rasa nanas yang sempurna di setiap gigitan.',
    image: 'https://picsum.photos/600/400',
    hint: 'nastar cookie',
    tags: ['Klasik', 'Lebaran', 'Manis'],
  },
  // Tambahkan resep lain di sini
];

const Header = () => (
  <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Cookie className="h-8 w-8 text-primary group-hover:animate-spin" style={{ animationDuration: '2s' }} />
          <span className="text-2xl font-bold font-headline text-foreground">Nasthara</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" asChild>
                <Link href="/">
                    Home
                </Link>
            </Button>
        </nav>
      </div>
    </header>
);

const Footer: React.FC = () => (
  <footer className="bg-card/80 py-12 px-4 mt-20">
    <div className="container mx-auto text-center text-muted-foreground">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Cookie className="h-8 w-8 text-primary" />
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Buku Resep Nasthara</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
              Kumpulan resep rahasia dari dapur kami, kini untuk Anda coba di rumah. Selamat berkreasi!
            </p>
          </div>
        </section>

        <section className="pb-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <Card key={index} className="overflow-hidden h-full flex flex-col group border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 bg-card">
                  <CardHeader className="p-0 relative">
                    <Link href={`/recipes/${recipe.slug}`} className="aspect-video overflow-hidden w-full cursor-pointer block">
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
                        <span key={tag} className="text-xs bg-primary/20 text-primary-foreground py-1 px-3 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <Button asChild className="w-full mt-auto bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform group-hover:-translate-y-1">
                      <Link href={`/recipes/${recipe.slug}`}>
                        Lihat Resep <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
