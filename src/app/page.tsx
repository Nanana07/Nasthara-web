'use client';
import { useState } from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Instagram, MessageCircle, Cookie, Star, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart, type CartItem } from '@/contexts/CartContext';
import type { Product } from '@/types/product';
import { ShopeeIcon } from '@/components/ui/shopee-icon';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';

const products: Product[] = [
  {
    name: 'Nastar',
    description: 'Reminds you of: Kumpul keluarga di ruang tamu nenek, aroma manis mentega dan nanas.',
    image: 'https://picsum.photos/600/400',
    hint: 'nastar cookie',
    price: 100000,
    bestseller: true,
  },
  {
    name: 'Palm Cheese',
    description: 'Reminds you of: Keju gurih berpadu manisnya gula aren, kelezatan yang tak terduga.',
    image: 'https://picsum.photos/600/400',
    hint: 'palm cheese cookie',
    price: 90000,
  },
  {
    name: 'Lidah Kucing',
    description: 'Reminds you of: Obrolan ringan ditemani secangkir teh hangat, kebahagiaan yang renyah.',
    image: 'https://picsum.photos/600/400',
    hint: 'cat tongue cookie',
    price: 85000,
  },
  {
    name: 'Kastengel Premium',
    description: 'Reminds you of: Keju melimpah dan renyahnya kebersamaan, tradisi yang selalu dinanti.',
    image: 'https://picsum.photos/600/400',
    hint: 'kaasstengels cheese',
    price: 95000,
  },
  {
    name: 'Choco Mede',
    description: 'Reminds you of: Petualangan rasa baru di setiap gigitan, kejutan di tengah kesederhanaan.',
    image: 'https://picsum.photos/600/400',
    hint: 'chocolate cashew cookie',
    price: 95000,
  },
  {
    name: 'Bawang Gunting',
    description: 'Reminds you of: Camilan renyah di sore hari, teman setia saat santai bersama keluarga.',
    image: 'https://picsum.photos/600/400',
    hint: 'savory snack',
    price: 75000,
  },
];

const testimonials = [
  {
    name: 'Sarah K.',
    quote: "Nasthara benar-benar membawa pulang rasa Lebaran! Nastarnya meleleh di lidah, persis kayak buatan Ibu.",
    stars: 5,
  },
  {
    name: 'Budi A.',
    quote: "Cokelat medenya juara! Pengiriman cepat dan packaging-nya premium banget. Bakal repeat order!",
    stars: 5,
  },
  {
    name: 'Dewi R.',
    quote: "Setiap gigitan lidah kucingnya bikin nostalgia masa kecil. Ini bukan cuma kue, tapi mesin waktu!",
    stars: 5,
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
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
            <ShoppingCart className="h-6 w-6 text-accent" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Keranjang Belanja</span>
          </Button>
          <Link href="https://shopee.co.id/nasthar_a" target="_blank" rel="noopener noreferrer" aria-label="Shopee">
            <Button variant="ghost" size="icon">
              <ShopeeIcon className="h-6 w-6 text-accent" />
            </Button>
          </Link>
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
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">A Cookie Made to Feel Like Home</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground mb-8">
        We built a brand that melts hearts before it melts in your mouth ✨
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <a href="#products">Order Now</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="https://shopee.co.id/nasthar_a" target="_blank" rel="noopener noreferrer">
            <ShopeeIcon className="mr-2 h-5 w-5" /> Order via Shopee
          </a>
        </Button>
      </div>
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
      <CardHeader className="p-0 relative">
         {product.bestseller && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full z-10">
            Bestseller 💛
          </div>
        )}
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
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Our Delights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection: FC = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Our Story, Your Comfort</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Di balik setiap toples Nasthara, ada dapur kecil yang selalu hangat. Di sanalah semuanya dimulai — bukan dari pabrik besar, tapi dari resep warisan keluarga, tangan ibu, dan cinta yang tak pernah ditakar.
        </p>
        <p className="text-lg text-muted-foreground mb-8">
          Kami percaya, makanan terenak bukan yang paling mahal. Tapi yang bisa bikin kamu merasa pulang, meski sedang jauh dari rumah. Karena itu, setiap kue di Nasthara dibuat dengan dua bahan utama: rasa sayang dan kenangan 🤎
        </p>
        <p className="text-xl font-semibold text-foreground italic border-l-4 border-primary pl-4">
          “Nasthara hadir bukan untuk sekadar memenuhi toples di meja tamu. Tapi untuk mengisi ruang rindu.”
        </p>
    </div>
  </section>
);


const TestimonialSection: FC = () => (
  <section className="py-20 px-4 bg-card">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">What Our Family Says</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-background shadow-lg text-center">
            <CardContent className="p-8 flex flex-col items-center">
               <div className="flex gap-1 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="text-primary fill-primary h-5 w-5" />
                ))}
                {[...Array(5 - testimonial.stars)].map((_, i) => (
                  <Star key={i} className="text-primary h-5 w-5" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
              <p className="font-bold">- {testimonial.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const SeasonalSection: FC = () => (
  <section className="py-20 px-4">
     <div className="container mx-auto text-center max-w-3xl">
        <h3 className="text-2xl font-bold text-primary mb-2">Seasonal Only!</h3>
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Homemade with care, released in limited batches</h2>
        <p className="text-lg text-muted-foreground mb-8">
          To preserve the flavor, freshness, and the feeling — each Nasthara batch is made in small quantities. Secure yours through pre-order. We only bake what we can lovefully deliver.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="#products">Order Before It’s Gone</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://shopee.co.id/nasthar_a" target="_blank" rel="noopener noreferrer">
             <ShopeeIcon className="mr-2 h-5 w-5" /> Belanja di Shopee
            </a>
          </Button>
        </div>
    </div>
  </section>
);

const MidCtaSection: FC = () => (
   <section className="py-10 px-4">
    <div className="container mx-auto text-center">
       <div className="grid md:grid-cols-2 gap-12 items-center bg-card p-10 rounded-lg">
        <div className="order-2 md:order-1 text-left">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">More Than Just Cookies.</h2>
          <p className="text-2xl text-muted-foreground italic mb-6">It’s a Memory in Every Bite.</p>
          <p className="text-lg text-foreground">
           Kami percaya, rasa yang paling berkesan bukan hanya tentang bahan-bahan terbaik, tapi juga sentuhan hati yang merangkainya. Kue kami bisa sama dengan yang lain, tapi sentuhan tangan yang membuatnya, itu yang membedakan.
          </p>
        </div>
        <div className="order-1 md:order-2">
            <Image
              src="https://picsum.photos/800/600"
              alt="Close up of a cookie"
              width={800}
              height={600}
              data-ai-hint="cookie texture"
              className="rounded-lg shadow-lg"
            />
        </div>
      </div>
    </div>
  </section>
);


const Footer: FC = () => (
  <footer className="bg-card py-12 px-4 mt-20">
    <div className="container mx-auto text-center text-muted-foreground">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Cookie className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold font-headline text-foreground">Nasthara</span>
      </div>
      <p className="text-lg italic mb-6">“Because every home has a taste. And that taste is Nasthara.”</p>
      <div className="mb-6">
        <p className="font-semibold text-foreground mb-2">Connect With Us</p>
        <div className="flex justify-center gap-2">
           <Button asChild variant="link" className="text-muted-foreground hover:text-primary">
            <Link href="https://wa.me/6282233676703" target="_blank" rel="noopener noreferrer">WhatsApp</Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button asChild variant="link" className="text-muted-foreground hover:text-primary">
            <Link href="https://instagram.com/NASTHAR_A" target="_blank" rel="noopener noreferrer">Instagram</Link>
          </Button>
           <Separator orientation="vertical" className="h-6" />
          <Button asChild variant="link" className="text-muted-foreground hover:text-primary">
            <Link href="https://shopee.co.id/nasthar_a" target="_blank" rel="noopener noreferrer">Shopee</Link>
          </Button>
        </div>
      </div>
      <p className="text-sm mb-4">Since 2022, Made by Order (PO)</p>
      <p className="text-sm mb-6">Handmade in Indonesia — from our kitchen to your heart.</p>
      
      <p className="text-xs">&copy; {new Date().getFullYear()} Nasthara. All rights reserved.</p>
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
        <AboutSection />
        <ProductSection />
        <MidCtaSection />
        <TestimonialSection />
        <SeasonalSection/>
      </main>
      <Footer />
      <CartDialog isOpen={isCartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
