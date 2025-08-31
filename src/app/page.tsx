'use client';
import { useState } from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Instagram, MessageCircle, Cookie, Wheat, ChefHat, Star, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart, type CartItem } from '@/contexts/CartContext';
import type { Product } from '@/types/product';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CookieRecommender from '@/components/cookie-recommender';
import { useToast } from '@/hooks/use-toast';

const products: Product[] = [
  {
    name: 'Nastar',
    description: 'Classic pineapple tarts with a buttery, melt-in-your-mouth crust.',
    image: 'https://picsum.photos/600/400',
    hint: 'nastar cookie',
    price: 100000,
  },
  {
    name: 'Lidah Kucing',
    description: 'Thin, crispy, and light cookies, perfect with a cup of tea or coffee.',
    image: 'https://picsum.photos/600/400',
    hint: 'cat tongue cookie',
    price: 85000,
  },
  {
    name: 'Choco Mede',
    description: 'Rich chocolate cookies packed with crunchy cashew nuts.',
    image: 'https://picsum.photos/600/400',
    hint: 'chocolate cashew cookie',
    price: 95000,
  },
  {
    name: 'Kastengel',
    description: 'Savory cheese sticks with a satisfying crunch and rich cheesy flavor.',
    image: 'https://picsum.photos/600/400',
    hint: 'cheese cookie',
    price: 90000,
  },
];

const testimonials = [
  {
    name: 'Andi',
    quote: 'The Nastar is just like my grandma used to make! So delicious and brings back so many memories. Will definitely order again.',
    stars: 5,
  },
  {
    name: 'Bunga',
    quote: 'I ordered the Choco Mede for a family gathering and everyone loved it. The combination of chocolate and cashew is perfect!',
    stars: 5,
  },
  {
    name: 'Citra',
    quote: 'Lidah Kucingnya renyah banget! Ga kemanisan, pas buat temen ngeteh sore-sore. Recommended!',
    stars: 4,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const CartDialogFormSchema = z.object({
  customerName: z.string().min(2, { message: "Nama harus diisi, minimal 2 karakter." }),
});

type CartDialogFormValues = z.infer<typeof CartDialogFormSchema>;

const Header: FC<{ onCartClick: () => void }> = ({ onCartClick }) => {
  const { cartCount } = useCart();
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Cookie className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-foreground">Nasthara</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
            <ShoppingCart className="h-6 w-6 text-accent" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Keranjang Belanja</span>
          </Button>
          <Link href="https://instagram.com/NASTHAR_A" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Button variant="ghost" size="icon">
              <Instagram className="h-6 w-6 text-accent" />
            </Button>
          </Link>
          <Link href="https://wa.me/6282233676703" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6 text-accent" />
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

const HeroSection: FC = () => (
  <section className="text-center py-20 px-4">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4">Freshly Baked with Love</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground mb-8">
        Temukan cita rasa rumahan dalam kukis artisanal kami, dibuat dari bahan-bahan terbaik dan dipanggang dengan sempurna khusus untuk Anda.
      </p>
      <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <a href="#products">Pesan Sekarang</a>
      </Button>
    </div>
  </section>
);

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Berhasil!",
      description: `${product.name} telah ditambahkan ke keranjang.`,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col group border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            data-ai-hint={product.hint}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="font-headline text-2xl mb-2">{product.name}</CardTitle>
        <p className="font-semibold text-lg text-primary mb-2">{formatPrice(product.price)}</p>
        <CardDescription className="text-base text-muted-foreground flex-grow mb-4">{product.description}</CardDescription>
        <Button onClick={handleAddToCart} className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const CartDialog: FC<{ isOpen: boolean; onOpenChange: (open: boolean) => void; }> = ({ isOpen, onOpenChange }) => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const form = useForm<CartDialogFormValues>({
    resolver: zodResolver(CartDialogFormSchema),
    defaultValues: {
      customerName: "",
    },
  });

  const onSubmit = (values: CartDialogFormValues) => {
    let message = `Halo Nasthara, saya mau pre-order:\n\n*Nama Pemesan:* ${values.customerName}\n\n*Pesanan:*\n`;
    cartItems.forEach(item => {
      message += `- ${item.name} (${item.quantity} toples) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\n*Total Harga:* ${formatPrice(totalPrice)}\n\nTerima kasih!`;
    
    const whatsappUrl = `https://wa.me/6282233676703?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onOpenChange(false);
    form.reset();
    clearCart();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2"><ShoppingCart /> Keranjang Belanja</DialogTitle>
          <DialogDescription>
            Periksa pesanan Anda di bawah ini sebelum melanjutkan ke WhatsApp.
          </DialogDescription>
        </DialogHeader>
        {cartItems.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <p>Keranjang Anda masih kosong.</p>
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto pr-4 -mr-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.name} className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.hint} />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.name, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.name, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeFromCart(item.name)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Anda</FormLabel>
                      <FormControl>
                        <Input placeholder="contoh: Budi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Checkout via WhatsApp
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};


const ProductSection: FC = () => {
  return (
    <section id="products" className="py-20 px-4 bg-card">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-2">Kukis Andalan Kami</h2>
        <p className="text-lg text-center text-muted-foreground mb-12">Fresh from the oven, just for you.</p>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

const AboutSection: FC = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Seni Membuat Kue</h2>
        <p className="text-lg text-muted-foreground">
          Di Nasthara, kami percaya pada keajaiban kukis buatan sendiri. Setiap batch dibuat berdasarkan pesanan (sistem Pre-Order) untuk memastikan Anda menerima suguhan yang paling segar dan lezat. Kami hanya menggunakan bahan-bahan berkualitas tinggi tanpa bahan pengawet.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">Bagaimana Cara Pre-Order?</AccordionTrigger>
            <AccordionContent className="text-base">
             Pilih kue favoritmu dan klik "Add to Cart". Setelah selesai memilih, klik ikon keranjang di pojok kanan atas, isi nama Anda, lalu checkout ke WhatsApp. Kami akan segera memproses pesananmu!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">Bahan-Bahan Kami</AccordionTrigger>
            <AccordionContent className="text-base">
              Kami berkomitmen menggunakan bahan-bahan premium: mentega murni, tepung berkualitas, telur segar, serta keju & buah asli. Tanpa jalan pintas, hanya kebaikan murni.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Image
          src="https://picsum.photos/800/600"
          alt="Baking process"
          width={800}
          height={600}
          data-ai-hint="baking cookies"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </section>
);

const RecommendationSection: FC = () => (
  <section className="py-20 px-4 bg-card">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/20 p-3 rounded-full mb-4">
          <ChefHat className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Bingung Mau Pilih yang Mana?</h2>
        <p className="text-lg text-muted-foreground mt-2">Biar koki AI kami yang kasih rekomendasi personal!</p>
      </div>
      <CookieRecommender />
    </div>
  </section>
);

const TestimonialSection: FC = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Kata Manis dari Pelanggan Kami</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-card shadow-lg">
            <CardContent className="p-6">
              <div className="flex gap-1 mb-2">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="text-primary fill-primary" />
                ))}
                {[...Array(5 - testimonial.stars)].map((_, i) => (
                  <Star key={i} className="text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
              <p className="font-bold text-right">- {testimonial.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Footer: FC = () => (
  <footer className="bg-card py-8 px-4">
    <div className="container mx-auto text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Cookie className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold font-headline text-foreground">Nasthara</span>
      </div>
      <p className="text-muted-foreground mb-4">Fresh from the oven, just for you.</p>
      <div className="flex justify-center gap-4 mb-4">
        <Link href="https://instagram.com/NASTHAR_A" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Button variant="outline" size="icon" className="bg-background">
            <Instagram className="h-5 w-5 text-accent" />
          </Button>
        </Link>
        <Link href="https://wa.me/6282233676703" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <Button variant="outline" size="icon" className="bg-background">
            <MessageCircle className="h-5 w-5 text-accent" />
          </Button>
        </Link>
      </div>
      <Separator className="my-4 w-1/4 mx-auto" />
      <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Nasthara. All rights reserved.</p>
    </div>
  </footer>
);

export default function Home() {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <div className="bg-background font-body text-foreground">
      <Header onCartClick={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <ProductSection />
        <AboutSection />
        <RecommendationSection />
        <TestimonialSection />
      </main>
      <Footer />
      <CartDialog isOpen={isCartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
