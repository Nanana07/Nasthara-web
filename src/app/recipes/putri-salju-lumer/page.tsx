
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Cookie, Printer, ShoppingCart, ChefHat, CheckCircle2, Home, BookHeart } from 'lucide-react';
import type { Product } from '@/types/product';

const lidahKucingProduct: Product = {
    name: 'Lidah Kucing',
    bestseller: true,
    flavors: [{
        name: 'Original',
        description: 'Untuk obrolan ringan ditemani secangkir teh hangat dan kebahagiaan yang renyah.',
        image: 'https://picsum.photos/600/400',
        hint: 'cat tongue cookie',
        sizes: [
            { size: '500 ml', price: 37000 },
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
          <Cookie className="h-8 w-8 text-primary group-hover:animate-spin" style={{ animationDuration: '2s' }} />
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
        <Cookie className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold font-headline text-foreground">Nasthara</span>
      </div>
       <p className="text-lg italic mb-6">“Because every home has a taste. And that taste is Nasthara.”</p>
      <p className="text-xs">&copy; {new Date().getFullYear()} Nasthara. All rights reserved.</p>
    </div>
  </footer>
);

export default function PutriSaljuRecipePage() {
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
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Putri Salju Lumer</h1>
              <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
                Kue manis berbentuk bulan sabit yang dibalut gula halus, memberikan sensasi dingin dan lumer di mulut.
              </p>
            </header>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://picsum.photos/1200/600"
                alt="Putri Salju"
                width={1200}
                height={600}
                data-ai-hint="snow white cookies"
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
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>100 gr Kacang mede sangrai, haluskan</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>250 gr Tepung terigu protein rendah</span></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Taburan:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>100 gr Gula halus</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" /><span>50 gr Gula donat/gula dingin</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    
                    <Separator className="my-8" />

                    <section>
                        <h2 className="text-2xl font-headline font-bold text-accent mb-4">Cara Membuat</h2>
                        <ol className="list-decimal list-outside space-y-4 pl-5 text-muted-foreground">
                            <li>Kocok mentega dan gula halus hingga lembut. Masukkan kuning telur, kocok rata.</li>
                            <li>Masukkan kacang mede halus, aduk rata. Tambahkan tepung terigu sambil diayak, aduk dengan spatula hingga adonan bisa dibentuk.</li>
                            <li>Ambil sedikit adonan, bentuk seperti bulan sabit. Tata di atas loyang.</li>
                            <li>Panggang dalam oven suhu 140°C selama 25-30 menit. Jangan sampai terlalu coklat.</li>
                            <li>Setelah matang, selagi masih panas, gulingkan kue ke dalam gula halus biasa.</li>
                            <li>Setelah dingin, gulingkan kembali ke dalam gula donat agar lebih menempel dan memberikan sensasi dingin.</li>
                        </ol>
                    </section>
                </div>
                <aside className="md:col-span-1 space-y-6">
                    <Card className="bg-card/80">
                        <CardHeader>
                            <CardTitle className="text-xl font-headline">Suka yang Klasik & Renyah?</CardTitle>
                            <CardDescription>Cobain Lidah Kucing, favorit sepanjang masa!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mb-4">
                                <Image 
                                    src={lidahKucingProduct.flavors[0].image} 
                                    alt={lidahKucingProduct.name} 
                                    width={80} 
                                    height={80} 
                                    className="rounded-md object-cover"
                                    data-ai-hint={lidahKucingProduct.flavors[0].hint}
                                />
                                <div>
                                    <h4 className="font-bold">{lidahKucingProduct.name}</h4>
                                    <p className="text-sm text-muted-foreground">Mulai dari {formatPrice(lidahKucingProduct.flavors[0].sizes[0].price)}</p>
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
