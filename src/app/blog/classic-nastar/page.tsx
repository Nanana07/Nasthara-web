
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Printer, ShoppingCart, ChefHat, CheckCircle2, Home, Heart, Instagram } from 'lucide-react';
import type { Product } from '@/types/product';
import { Logo } from '@/components/Logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const nastarProduct: Product = {
    name: 'Nastar',
    bestseller: true,
    flavors: [
        {
            name: 'Original',
            description: 'Sehangat kumpul keluarga di ruang tamu nenek, dengan aroma manis mentega dan nanas.',
            image: '/nastar.png',
            hint: 'nastar cookie',
            sizes: [
                { size: '330 ml', price: 45000 },
                { size: '500 ml', price: 65000 },
                { size: '750 ml', price: 75000 },
                { size: '1000 ml', price: 85000 },
                { size: '1 kg', price: 110000 },
            ],
        },
        {
            name: 'Jeruk',
            description: 'Klasik yang diberi sentuhan baru. Aroma segar kulit jeruk berpadu dengan manisnya nanas premium.',
            image: '/nastar.png',
            hint: 'orange nastar cookie',
            sizes: [
                { size: '330 ml', price: 45000 },
                { size: '500 ml', price: 65000 },
                { size: '750 ml', price: 75000 },
                { size: '1000 ml', price: 85000 },
                { size: '1 kg', price: 110000 },
            ],
        }
    ]
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


export default function ClassicNastarRecipePage() {
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
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Classic Nastar</h1>
              <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
                Kue kering legendaris yang lumer di mulut dengan isian selai nanas premium. Ikuti resep ini untuk membawa kehangatan Nasthara ke rumah Anda.
              </p>
            </header>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/nastar.png"
                alt="Classic Nastar"
                width={1200}
                height={600}
                data-ai-hint="nastar cookies plate"
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
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>250 gr Mentega (Anchor/Wijsman)</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>50 gr Gula halus</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>2 butir Kuning telur</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>300 gr Tepung terigu protein rendah (Kunci Biru)</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>50 gr Susu bubuk (Dancow)</span></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Selai Nanas:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>2 buah Nanas (parut)</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>150 gr Gula pasir</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>1 batang Kayu manis</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>3 butir Cengkeh</span></li>
                                </ul>
                            </div>
                             <div>
                                <h3 className="font-semibold text-foreground mb-2">Olesan:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>2 butir Kuning telur</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>1 sdt Minyak goreng</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>1 sdt Susu kental manis</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    
                    <Separator className="my-8" />

                    <section>
                        <h2 className="text-2xl font-headline font-bold text-accent mb-4">Cara Membuat</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2"><ChefHat size={20} /> Selai Nanas</h3>
                                <ol className="list-decimal list-outside space-y-2 pl-5 text-muted-foreground">
                                    <li>Masak nanas parut bersama kayu manis dan cengkeh hingga airnya menyusut.</li>
                                    <li>Masukkan gula pasir, aduk terus hingga selai mengering dan bisa dipulung. Dinginkan.</li>
                                </ol>
                            </div>
                             <div>
                                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2"><ChefHat size={20} /> Adonan Nastar</h3>
                                <ol className="list-decimal list-outside space-y-2 pl-5 text-muted-foreground">
                                    <li>Kocok mentega dan gula halus sebentar saja, asal tercampur rata (sekitar 30 detik).</li>
                                    <li>Masukkan kuning telur, kocok rata.</li>
                                    <li>Masukkan tepung terigu dan susu bubuk yang sudah diayak. Aduk perlahan dengan spatula hingga rata.</li>
                                    <li>Ambil sedikit adonan, pipihkan, isi dengan selai nanas, lalu bulatkan.</li>
                                    <li>Tata di atas loyang yang sudah diolesi mentega tipis.</li>
                                </ol>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2"><ChefHat size={20} /> Penyelesaian</h3>
                                <ol className="list-decimal list-outside space-y-2 pl-5 text-muted-foreground">
                                    <li>Panggang dalam oven yang sudah dipanaskan suhu 140°C selama 20 menit.</li>
                                    <li>Keluarkan dari oven, biarkan agak dingin, lalu olesi dengan bahan olesan.</li>
                                    <li>Panggang kembali selama 10-15 menit atau hingga matang berwarna kuning keemasan.</li>
                                    <li>Angkat dan dinginkan di cooling rack sebelum dimasukkan ke dalam toples.</li>
                                </ol>
                            </div>
                        </div>
                    </section>
                </div>
                <aside className="md:col-span-1 space-y-6">
                    <Card className="bg-card/80">
                        <CardHeader>
                            <CardTitle className="text-xl font-headline">Males Bikin Sendiri?</CardTitle>
                            <CardDescription>Pesan versi original dari dapur Nasthara!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-4">
                                <Image 
                                    src={nastarProduct.flavors[0].image} 
                                    alt={nastarProduct.name} 
                                    width={80} 
                                    height={80} 
                                    className="rounded-md object-cover"
                                    data-ai-hint={nastarProduct.flavors[0].hint}
                                />
                                <div>
                                    <h4 className="font-bold">{nastarProduct.name}</h4>
                                    <p className="text-sm text-muted-foreground">Mulai dari {formatPrice(nastarProduct.flavors[0].sizes[0].price)}</p>
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
