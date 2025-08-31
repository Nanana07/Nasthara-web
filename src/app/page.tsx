'use client';
import { useState, useEffect } from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Instagram, MessageCircle, Cookie, Star, Minus, Plus, ShoppingCart, Trash2, ChevronDown } from 'lucide-react';
import { useCart, type CartItem } from '@/contexts/CartContext';
import type { Product, ProductVariant } from '@/types/product';
import { ShopeeIcon } from '@/components/ui/shopee-icon';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";


const products: Product[] = [
    {
        name: 'Nastar',
        description: 'Reminds you of: Kumpul keluarga di ruang tamu nenek, aroma manis mentega dan nanas.',
        image: 'https://picsum.photos/600/400',
        hint: 'nastar cookie',
        bestseller: true,
        variants: [
            { size: '250gr', price: 45000 },
            { size: '500gr', price: 65000 },
        ],
    },
    {
        name: 'Palm Cheese',
        description: 'Reminds you of: Keju gurih berpadu manisnya gula aren, kelezatan yang tak terduga.',
        image: 'https://picsum.photos/600/400',
        hint: 'palm cheese cookie',
        variants: [
            { size: '250gr', price: 27000 },
            { size: '500gr', price: 35000 },
        ],
    },
    {
        name: 'Lidah Kucing',
        description: 'Reminds you of: Obrolan ringan ditemani secangkir teh hangat, kebahagiaan yang renyah.',
        image: 'https://picsum.photos/600/400',
        hint: 'cat tongue cookie',
        bestseller: true,
        variants: [
            { size: '500ml', price: 37000 },
        ],
    },
    {
        name: 'Kastengel Premium',
        description: 'Reminds you of: Keju melimpah dan renyahnya kebersamaan, tradisi yang selalu dinanti.',
        image: 'https://picsum.photos/600/400',
        hint: 'kaasstengels cheese',
        variants: [
            { size: '500ml', price: 70000 },
        ],
    },
    {
        name: 'Choco Mede',
        description: 'Reminds you of: Petualangan rasa baru di setiap gigitan, kejutan di tengah kesederhanaan.',
        image: 'https://picsum.photos/600/400',
        hint: 'chocolate cashew cookie',
        variants: [
            { size: '250gr', price: 40000 },
            { size: '500gr', price: 55000 },
        ],
    },
    {
        name: 'Bawang Gunting',
        description: 'Reminds you of: Camilan renyah di sore hari, teman setia saat santai bersama keluarga.',
        image: 'https://picsum.photos/600/400',
        hint: 'savory snack',
        variants: [
            { size: '100gr', price: 8000 },
            { size: '200gr', price: 15000 },
        ],
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

const HalalLogo: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Logo Halal MUI"
    role="img"
  >
    <path
      d="M19.78 6.22C19.43 5.87 19.01 5.58 18.56 5.36C17.65 4.92 16.62 4.96 15.68 5.4L15.37 5.56L15.11 5.7L14.77 5.91L14.47 6.13L14.24 6.3L14.08 6.44L12.01 7.9L9.93 6.44L9.77 6.3L9.54 6.13L9.25 5.91L8.9 5.7L8.64 5.56L8.33 5.4C7.39 4.96 6.36 4.92 5.45 5.36C5.01 5.58 4.58 5.87 4.23 6.22C3.88 6.57 3.59 6.99 3.37 7.44C2.93 8.35 2.97 9.38 3.41 10.32L3.57 10.63L3.72 10.89L3.92 11.23L4.14 11.53L4.31 11.76L4.45 11.92L6.11 13.58L6.44 14.54L6.68 15.86L6.82 17.55C6.88 18.3 7.5 18.92 8.25 18.98C8.3 18.99 8.35 18.99 8.4 18.99C9.11 18.99 9.69 18.47 9.74 17.77L9.58 15.93L9.44 14.65L9.26 13.91L8.79 12.56L7.91 10.82L9.08 9.92L9.7 12.1L10.02 13.08L10.35 14.07L10.61 14.82L10.74 15.21L11.13 16.35C11.17 16.45 11.23 16.55 11.3 16.64C11.66 17.22 12.36 17.49 13.04 17.29C13.73 17.09 14.15 16.4 13.95 15.71L13.11 13.02L12.87 12.2L12.29 10.22L12.01 9.37L12.29 9.19L14.14 10.4L15.22 12.55L14.68 13.91L14.5 14.65L14.36 15.93L14.2 17.77C14.15 18.47 14.73 18.99 15.44 18.99C15.49 18.99 15.54 18.99 15.59 18.98C16.34 18.92 16.96 18.3 17.02 17.55L17.16 15.86L17.4 14.54L17.73 13.58L19.39 11.92L19.53 11.76L19.7 11.53L19.92 11.23L20.12 10.89L20.27 10.63L20.43 10.32C20.87 9.38 20.91 8.35 20.47 7.44C20.25 6.99 19.96 6.57 19.61 6.22H19.78Z"
      fill="#009A44"
    />
    <path
      d="M12.01 12.16C12.51 12.16 12.91 11.76 12.91 11.26C12.91 10.76 12.51 10.36 12.01 10.36C11.51 10.36 11.11 10.76 11.11 11.26C11.11 11.76 11.51 12.16 12.01 12.16Z"
      fill="#009A44"
    />
  </svg>
);


const Header: FC<{ onCartClick: () => void }> = ({ onCartClick }) => {
  const { cartCount } = useCart();
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b border-border/20">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Cookie className="h-8 w-8 text-primary group-hover:animate-spin" style={{ animationDuration: '2s' }} />
          <span className="text-2xl font-bold font-headline text-foreground">Nasthara</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={onCartClick} className="relative group">
            <ShoppingCart className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground animate-in fade-in zoom-in">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Keranjang Belanja</span>
          </Button>
          <Link href="https://instagram.com/NASTHAR_A" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Button variant="ghost" size="icon" className="group">
              <Instagram className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          <Link href="https://wa.me/6282233676703" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Button variant="ghost" size="icon" className="group">
              <MessageCircle className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
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
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>A Cookie Made to Feel Like Home</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        We built a brand that melts hearts before it melts in your mouth ✨
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <a href="#products">Order Now</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="https://wa.me/6282233676703" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-5 w-5" /> Hubungi Kami
          </a>
        </Button>
      </div>
    </div>
  </section>
);

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  useEffect(() => {
    // Reset to the first variant whenever the product prop changes.
    setSelectedVariant(product.variants[0]);
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant);
    toast({
      title: "Berhasil!",
      description: `${product.name} (${selectedVariant.size}) telah ditambahkan ke keranjang.`,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col group border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0 relative">
         {product.bestseller && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full z-10 animate-pulse">
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
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="font-headline text-2xl mb-2">{product.name}</CardTitle>
        <p className="font-semibold text-lg text-primary mb-2">{formatPrice(selectedVariant.price)}</p>
        <CardDescription className="text-base text-muted-foreground flex-grow mb-4">{product.description}</CardDescription>
        
        {product.variants.length > 1 && (
            <div className="mb-4">
                <Select
                    value={selectedVariant.size}
                    onValueChange={(size) => {
                        const newVariant = product.variants.find(v => v.size === size);
                        if(newVariant) setSelectedVariant(newVariant);
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih ukuran" />
                    </SelectTrigger>
                    <SelectContent>
                        {product.variants.map((variant) => (
                            <SelectItem key={variant.size} value={variant.size}>
                                {variant.size} - {formatPrice(variant.price)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        )}

        <Button onClick={handleAddToCart} className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform group-hover:-translate-y-1">
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
      message += `- ${item.name} (${item.variant.size}) x ${item.quantity} - ${formatPrice(item.variant.price * item.quantity)}\n`;
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
            <Cookie className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p>Keranjang Anda masih kosong.</p>
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto pr-4 -mr-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.hint} />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.variant.size} - {formatPrice(item.variant.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:bg-destructive/10">
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
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
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
        <div className="flex justify-center items-center gap-4 mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Delights</h2>
            <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm">
                <HalalLogo className="h-10 w-10" />
                 <p className="text-xs text-green-700 font-semibold leading-tight">TERSERTIFIKASI<br/>HALAL<br/>INDONESIA</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
                  <ProductCard product={product} />
                </div>
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
          <Card key={index} className="bg-background shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
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
        <div className="order-1 md:order-2 overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://picsum.photos/800/600"
              alt="Close up of a cookie"
              width={800}
              height={600}
              data-ai-hint="cookie texture"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
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
