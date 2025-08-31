
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Cookie, Printer, ShoppingCart, ChefHat, CheckCircle2, Home, BookHeart } from 'lucide-react';
import type { Product } from '@/types/product';
import { Logo } from '@/components/Logo';

const kastengelProduct: Product = {
    name: 'Kastengel Premium',
    flavors: [{
        name: 'Original',
        description: 'Renyahnya kebersamaan dalam tradisi yang selalu dinanti, dengan rasa keju yang melimpah.',
        image: '/kastengel.jpg', // Ganti dengan path gambar Anda di folder public
        hint: 'kaasstengels cheese',
        sizes: [
            { size: '500 ml', price: 70000 },
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
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="group-hover:animate-spin" style={{ animationDuration: '2s' }} />
          <span className="text-2xl font-bold font-headline text-foreground">Nasthara</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" asChild>
                <Link href="/">
                    <Home className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Home</span>
                </Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/recipes">
                     <BookHeart className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Resep</span>
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

export default function KastengelPremiumRecipePage() {
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
              <p className="text-primary font-semibold mb-2">Resep Pilihan Dapur Nasthara</p>
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Kastengel Keju Premium</h1>
              <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
                Resep kastengel andalan dengan perpaduan keju Edam dan Parmesan yang menghasilkan rasa gurih maksimal dan tekstur yang renyah sempurna.
              </p>
            </header>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/resep-kastengel.jpg" // Ganti dengan path gambar Anda di folder public
                alt="Kastengel Keju Premium"
                width={1200}
                height={600}
                data-ai-hint="premium kaasstengels"
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
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>150 gr Mentega</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>100 gr Margarin</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>2 butir Kuning telur</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>100 gr Keju edam parut</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>50 gr Keju parmesan bubuk</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>350 gr Tepung terigu protein rendah</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>50 gr Tepung maizena</span></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Olesan & Taburan:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>2 butir Kuning telur (kocok lepas)</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>Keju cheddar parut secukupnya</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    
                    <Separator className="my-8" />

                    <section>
                        <h2 className="text-2xl font-headline font-bold text-accent mb-4">Cara Membuat</h2>
                        <ol className="list-decimal list-outside space-y-4 pl-5 text-muted-foreground">
                            <li>Kocok mentega, margarin, dan kuning telur hingga rata, sekitar 2 menit.</li>
                            <li>Masukkan keju edam parut dan keju parmesan, aduk rata dengan spatula.</li>
                            <li>Campurkan tepung terigu dan maizena, ayak, lalu masukkan ke dalam adonan secara bertahap. Aduk hingga adonan kalis dan tidak lengket.</li>
                            <li>Gilas adonan dengan ketebalan sekitar 1 cm, lalu potong-potong memanjang atau sesuai selera.</li>
                            <li>Tata di atas loyang, olesi dengan kuning telur dan taburi dengan keju cheddar parut.</li>
                            <li>Panggang dalam oven dengan suhu 130-140°C selama 40-50 menit, atau hingga matang dan kering.</li>
                            <li>Angkat, dinginkan sepenuhnya sebelum disimpan di dalam toples kedap udara.</li>
                        </ol>
                    </section>
                </div>
                <aside className="md:col-span-1 space-y-6">
                    <Card className="bg-card/80">
                        <CardHeader>
                            <CardTitle className="text-xl font-headline">Pecinta Keju Sejati?</CardTitle>
                            <CardDescription>Pesan Kastengel Premium kami yang dibuat dengan keju melimpah.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-4">
                                <Image 
                                    src={kastengelProduct.flavors[0].image} 
                                    alt={kastengelProduct.name} 
                                    width={80} 
                                    height={80} 
                                    className="rounded-md object-cover"
                                    data-ai-hint={kastengelProduct.flavors[0].hint}
                                />
                                <div>
                                    <h4 className="font-bold">{kastengelProduct.name}</h4>
                                    <p className="text-sm text-muted-foreground">{formatPrice(kastengelProduct.flavors[0].sizes[0].price)}</p>
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
