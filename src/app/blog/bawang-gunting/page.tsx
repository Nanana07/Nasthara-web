
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Printer, ShoppingCart, CheckCircle2, Home, BookHeart } from 'lucide-react';
import type { Product } from '@/types/product';
import { Logo } from '@/components/Logo';

const product: Product = {
    name: 'Bawang Gunting',
    flavors: [{
        name: 'Original',
        description: 'Camilan renyah di sore hari, teman setia saat santai bersama keluarga tercinta.',
        image: '/bawang_gunting.png',
        hint: 'savory snack',
        sizes: [
            { size: 'Pouch', price: 8000 },
            { size: '1/2 kg', price: 40000 },
            { size: '1 kg', price: 75000 },
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
            <Button variant="ghost" asChild>
                <Link href="/blog">
                     <BookHeart className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline">Blog</span>
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
        <Logo />
        <span className="text-2xl font-bold font-headline text-foreground">Nasthara</span>
      </div>
       <p className="text-lg italic mb-6">“Because every home has a taste. And that taste is Nasthara.”</p>
      <p className="text-xs">&copy; {new Date().getFullYear()} Nasthara. All rights reserved.</p>
    </div>
  </footer>
);

export default function BawangGuntingRecipePage() {
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
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Stik Bawang Gunting</h1>
              <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
                Camilan asin dan gurih yang super renyah dan bikin nagih. Cocok untuk teman nonton atau kumpul bareng keluarga.
              </p>
            </header>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/bawang_gunting.png"
                alt="Bawang Gunting"
                width={1200}
                height={600}
                data-ai-hint="savory onion sticks"
                className="w-full object-cover"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <section className="mb-8">
                        <h2 className="text-2xl font-headline font-bold text-accent mb-4">Bahan-bahan</h2>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>250 gr Tepung terigu protein sedang</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>50 gr Tepung tapioka</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>1 butir Telur, kocok lepas</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>50 ml Santan instan</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>2 sdm Margarin, lelehkan</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>1 sdt Garam</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>1 sdt Kaldu bubuk</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>3 siung Bawang putih, haluskan</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>2 batang Seledri, cincang halus</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>Minyak untuk menggoreng</span></li>
                        </ul>
                    </section>
                    
                    <Separator className="my-8" />

                    <section>
                        <h2 className="text-2xl font-headline font-bold text-accent mb-4">Cara Membuat</h2>
                        <ol className="list-decimal list-outside space-y-4 pl-5 text-muted-foreground">
                            <li>Dalam wadah, campurkan tepung terigu, tapioka, garam, dan kaldu bubuk. Aduk rata.</li>
                            <li>Masukkan telur, bawang putih halus, dan seledri. Aduk sambil tuangi santan sedikit demi sedikit hingga adonan bergerindil.</li>
                            <li>Tambahkan margarin leleh, uleni adonan hingga kalis dan tidak lengket.</li>
                            <li>Ambil sebagian adonan, gilas tipis menggunakan rolling pin atau mesin pembuat pasta.</li>
                            <li>Potong adonan memanjang, lalu gunting serong kecil-kecil.</li>
                            <li>Panaskan banyak minyak. Goreng adonan yang sudah digunting dengan api sedang hingga kuning keemasan dan renyah.</li>
                            <li>Angkat, tiriskan, dan biarkan dingin sebelum disimpan di toples kedap udara.</li>
                        </ol>
                    </section>
                </div>
                <aside className="md:col-span-1 space-y-6">
                    <Card className="bg-card/80">
                        <CardHeader>
                            <CardTitle className="text-xl font-headline">Butuh Camilan Gurih?</CardTitle>
                            <CardDescription>Pesan Bawang Gunting super renyah dari Nasthara.</CardDescription>
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
