
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Printer, ShoppingCart, CheckCircle2, Home, BookHeart, Heart, Instagram } from 'lucide-react';
import type { Product } from '@/types/product';
import { Logo } from '@/components/Logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const product: Product = {
    name: 'Palm Cheese',
    flavors: [{
        name: 'Original',
        description: 'Saat keju gurih berpadu dengan manisnya gula aren, menciptakan kelezatan tak terduga.',
        image: '/palm_cheese.png',
        hint: 'palm cheese cookie',
        sizes: [
            { size: '330 ml', price: 27000 },
            { size: '500 ml', price: 35000 },
            { size: '750 ml', price: 45000 },
            { size: '1000 ml', price: 50000 },
            { size: '1 kg', price: 80000 },
        ],
    }]
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

export default function PalmCheeseRecipePage() {
    const handlePrint = () => {
        window.print();
    };

  return (
    <div className="bg-background font-body text-foreground">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <article>
            <header className="mb-8 text-center">
              <p className="text-primary font-semibold mb-2">Blog Internal Dapur Nasthara</p>
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Palm Cheese Cookies</h1>
              <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
                Kue kering dengan perpaduan rasa manis gula palem dan gurihnya keju yang unik, menciptakan sensasi rasa yang tak terlupakan.
              </p>
            </header>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/palm_cheese.png"
                alt="Palm Cheese Cookies"
                width={1200}
                height={600}
                data-ai-hint="palm cheese cookies"
                className="w-full object-cover"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <section className="mb-8">
                        <h2 className="text-2xl font-headline font-bold text-accent mb-4">Bahan-bahan</h2>
                         <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-muted-foreground">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Adonan Kue:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>200 gr Mentega</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>50 gr Gula halus</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>1 butir Kuning telur</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>250 gr Tepung terigu protein rendah</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>30 gr Tepung maizena</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>20 gr Susu bubuk</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>100 gr Keju edam/parmesan parut</span></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Lapisan:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>Gula palem secukupnya</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    
                    <Separator className="my-8" />

                    <section>
                        <h2 className="text-2xl font-headline font-bold text-accent mb-4">Cara Membuat</h2>
                        <ol className="list-decimal list-outside space-y-4 pl-5 text-muted-foreground">
                            <li>Kocok mentega dan gula halus hingga lembut. Masukkan kuning telur, kocok rata.</li>
                            <li>Masukkan keju parut, aduk rata dengan spatula.</li>
                            <li>Campurkan tepung terigu, maizena, dan susu bubuk. Ayak dan masukkan ke dalam adonan secara bertahap, aduk hingga rata.</li>
                            <li>Bentuk adonan menjadi bola-bola kecil.</li>
                            <li>Gulingkan bola adonan di atas gula palem hingga seluruh permukaannya tertutup.</li>
                            <li>Tata di atas loyang yang sudah diolesi mentega. Beri sedikit tekanan di bagian atasnya.</li>
                            <li>Panggang dalam oven dengan suhu 150°C selama 25-30 menit atau hingga matang.</li>
                        </ol>
                    </section>
                </div>
                <aside className="md:col-span-1 space-y-6">
                    <Card className="bg-card/80">
                        <CardHeader>
                            <CardTitle className="text-xl font-headline">Suka Kombinasi Unik?</CardTitle>
                            <CardDescription>Pesan Palm Cheese original dari kami sekarang juga!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-4">
                                <Image 
                                    src={product.flavors[0].image} 
                                    alt={product.name} 
                                    width={80} 
                                    height={80} 
                                    className="rounded-md object-cover"
                                    data-ai-hint={product.flavors[0].hint}
                                />
                                <div>
                                    <h4 className="font-bold">{product.name}</h4>
                                    <p className="text-sm text-muted-foreground">Mulai dari {formatPrice(product.flavors[0].sizes[0].price)}</p>
                                </div>
                            </div>
                            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                <Link href="/#products">
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Pesan Sekarang
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                     <Button variant="outline" className="w-full" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" /> Cetak Resep
                    </Button>
                </aside>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
