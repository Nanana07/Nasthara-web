
'use client';
import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Instagram, Cookie, Star, Minus, Plus, ShoppingCart, Trash2, Wand2, Loader2, Sparkles, ChefHat, CakeSlice, Wheat, BookOpen, Gift, BookHeart, Heart } from 'lucide-react';
import { useCart, type CartItem } from '@/contexts/CartContext';
import type { Product, ProductFlavorVariant, ProductSizeVariant } from '@/types/product';
import { recommendCookie } from '@/ai/flows/recommend-cookie-flow';
import { RecommendationInputSchema, type RecommendationInput } from '@/ai/flows/recommend-cookie-types';
import { generateCookieStory } from '@/ai/flows/story-generator-flow';
import { recommendGift } from '@/ai/flows/gift-assistant-flow';
import { GiftAssistantInputSchema, type GiftAssistantInput } from '@/ai/flows/gift-assistant-types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';


const products: Product[] = [
    {
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
    },
    {
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
    },
    {
        name: 'Lidah Kucing',
        bestseller: true,
        flavors: [{
            name: 'Original',
            description: 'Untuk obrolan ringan ditemani secangkir teh hangat dan kebahagiaan yang renyah.',
            image: '/lidah_kucing.png',
            hint: 'cat tongue cookie',
            sizes: [
                { size: '500 ml', price: 37000 },
                { size: '3 pcs', price: 100000 },
                { size: '1 kg', price: 80000 },
            ],
        }]
    },
    {
        name: 'Kastengel Premium',
        flavors: [{
            name: 'Original',
            description: 'Renyahnya kebersamaan dalam tradisi yang selalu dinanti, dengan rasa keju yang melimpah.',
            image: '/kastengel.png',
            hint: 'kaasstengels cheese',
            sizes: [
                { size: '500 ml', price: 70000 },
            ],
        }]
    },
    {
        name: 'Choco Mede',
        flavors: [{
            name: 'Original',
            description: 'Petualangan rasa baru di setiap gigitan, sebuah kejutan di tengah kesederhanaan.',
            image: '/choco_mede.png',
            hint: 'chocolate cashew cookie',
            sizes: [
                { size: '330 ml', price: 40000 },
                { size: '500 ml', price: 55000 },
                { size: '750 ml', price: 65000 },
                { size: '1000 ml', price: 70000 },
            ],
        }]
    },
    {
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
    },
];

const allProductFlavors: (ProductFlavorVariant & { productName: string, bestseller: boolean | undefined })[] = products.flatMap(p => 
    p.flavors.map(f => ({ ...f, productName: p.name, bestseller: p.bestseller }))
);


const testimonials = [
  {
    name: 'Nana',
    quote: "wah enak banget ini, selain rasa tampilannya juga cantik. pokoknya beauty outside, melt on your mouth inside.",
    stars: 5,
  },
  {
    name: 'Rian',
    quote: "Gila sih Palm Cheese-nya, nagih banget. Gurihnya keju sama manis gula palem tuh pas, gak nyangka bisa seenak ini.",
    stars: 5,
  },
  {
    name: 'Fitri',
    quote: "Order buat acara keluarga, semua pada suka! Nastarnya the best, lumer banget. Auto jadi langganan.",
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
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="group-hover:animate-spin" style={{ animationDuration: '2s' }} />
          <span className="text-xl sm:text-2xl font-bold font-headline text-foreground">Nasthara</span>
        </Link>
        <nav className="flex items-center shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="group">
                  <Heart className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/recipes">
                    <BookHeart className="mr-2 h-4 w-4" />
                    <span>Resep</span>
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
          <Button variant="ghost" size="icon" onClick={onCartClick} className="relative group">
            <ShoppingCart className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground animate-in fade-in zoom-in">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Keranjang Belanja</span>
          </Button>
          <Link href="https://wa.me/6282233676703" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Button variant="ghost" size="icon" className="group">
              <Image src="/whatsapp.png" alt="WhatsApp Icon" width={24} height={24} className="group-hover:scale-110 transition-transform" />
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
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>A Cookie Made to Feel Like Home</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        We built a brand that melts hearts before it melts in your mouth ✨
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <a href="#products">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Order Now
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
          <a href="https://wa.me/6282233676703" target="_blank" rel="noopener noreferrer" className="flex items-center">
             <Image src="/whatsapp.png" alt="WhatsApp Icon" width={20} height={20} className="mr-2" /> Hubungi Kami
          </a>
        </Button>
      </div>
    </div>
  </section>
);

const ProductCard: FC<{ product: Product, onSelect: () => void }> = ({ product, onSelect }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const [selectedSize, setSelectedSize] = useState(selectedFlavor.sizes[0]);

  useEffect(() => {
    setSelectedFlavor(product.flavors[0]);
  }, [product]);

  useEffect(() => {
    setSelectedSize(selectedFlavor.sizes[0]);
  }, [selectedFlavor]);

  const handleAddToCart = () => {
    addToCart(product.name, selectedFlavor, selectedSize);
    toast({
      title: "Berhasil!",
      description: `${product.name} ${selectedFlavor.name !== 'Original' ? `(${selectedFlavor.name})` : ''} (${selectedSize.size}) telah ditambahkan ke keranjang.`,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col group border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 bg-card">
      <CardHeader className="p-0 relative">
         {product.bestseller && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full z-10 animate-pulse">
            Bestseller 💛
          </div>
        )}
        <button onClick={onSelect} className="aspect-video overflow-hidden w-full cursor-pointer">
          <Image
            src={selectedFlavor.image}
            alt={`${product.name} - ${selectedFlavor.name}`}
            width={600}
            height={400}
            data-ai-hint={selectedFlavor.hint}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </button>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="font-headline text-2xl mb-2">{product.name}</CardTitle>
        <p className="font-semibold text-lg text-accent mb-2">{formatPrice(selectedSize.price)}</p>
        <CardDescription className="text-base text-muted-foreground flex-grow mb-4">{selectedFlavor.description}</CardDescription>
        
        {product.flavors.length > 1 && (
            <div className="mb-4">
                <Label>Rasa</Label>
                <RadioGroup 
                    value={selectedFlavor.name} 
                    onValueChange={(flavorName) => {
                        const newFlavor = product.flavors.find(f => f.name === flavorName);
                        if (newFlavor) setSelectedFlavor(newFlavor);
                    }} 
                    className="flex gap-2 pt-2"
                >
                    {product.flavors.map((flavor) => (
                        <div key={flavor.name} className="flex items-center">
                            <RadioGroupItem value={flavor.name} id={`${product.name}-${flavor.name}`} className="sr-only" />
                            <Label 
                                htmlFor={`${product.name}-${flavor.name}`}
                                className={cn(
                                    "px-4 py-2 border rounded-full cursor-pointer text-sm",
                                    selectedFlavor.name === flavor.name 
                                        ? "bg-primary text-primary-foreground border-primary" 
                                        : "bg-background hover:bg-accent/10"
                                )}
                            >
                                {flavor.name}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        )}

        {selectedFlavor.sizes.length > 1 && (
            <div className="mb-4">
                <Label>Ukuran</Label>
                <Select
                    value={selectedSize.size}
                    onValueChange={(size) => {
                        const newSize = selectedFlavor.sizes.find(v => v.size === size);
                        if(newSize) setSelectedSize(newSize);
                    }}
                >
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Pilih ukuran" />
                    </SelectTrigger>
                    <SelectContent>
                        {selectedFlavor.sizes.map((variant) => (
                            <SelectItem key={variant.size} value={variant.size}>
                                {variant.size} - {formatPrice(variant.price)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        )}
        <Button onClick={handleAddToCart} className="w-full mt-auto bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform group-hover:-translate-y-1">
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
      const flavorName = item.flavorName !== 'Original' ? ` (${item.flavorName})` : '';
      message += `- ${item.productName}${flavorName} (${item.size.size}) x ${item.quantity} - ${formatPrice(item.size.price * item.quantity)}\n`;
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
      <DialogContent className="sm:max-w-lg bg-card">
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
                  <Image src={item.image} alt={item.productName} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.hint} />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.productName} {item.flavorName !== 'Original' ? `(${item.flavorName})` : ''}</p>
                    <p className="text-sm text-muted-foreground">{item.size.size} - {formatPrice(item.size.price)}</p>
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

const ProductSection: FC<{ onProductSelect: (product: Product) => void }> = ({ onProductSelect }) => {
  return (
    <section id="products" className="py-20 px-4 bg-card/80">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-accent">Our Delights</h2>
            <div className="flex items-center gap-2 bg-background p-2 rounded-md shadow-sm">
                <Image src="/halal-mui.png" alt="Logo Halal MUI" width={40} height={40} />
                 <p className="text-xs text-green-700 font-semibold leading-tight">TERSERTIFIKASI<br/>HALAL<br/>INDONESIA</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                <div key={product.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
                  <ProductCard product={product} onSelect={() => onProductSelect(product)} />
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
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-accent mb-4">Our Story, Your Comfort</h2>
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
  <section className="py-20 px-4 bg-card/80">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 text-accent">What Our Family Says</h2>
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
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-accent mb-4">Homemade with care, released in limited batches</h2>
        <p className="text-lg text-muted-foreground mb-8">
          To preserve the flavor, freshness, and the feeling — each Nasthara batch is made in small quantities. Secure yours through pre-order. We only bake what we can lovefully deliver.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="#products">Order Before It’s Gone</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500/10 hover:text-orange-600">
            <a href="https://shopee.co.id/nasthar_a" target="_blank" rel="noopener noreferrer" className="flex items-center">
               <Image src="/shopee.png" alt="Logo Shopee" width={20} height={20} className="mr-2" /> Belanja di Shopee
            </a>
          </Button>
        </div>
    </div>
  </section>
);

const MidCtaSection: FC = () => (
   <section className="py-10 px-4">
    <div className="container mx-auto">
       <div className="grid md:grid-cols-2 gap-12 items-center bg-card/80 p-10 rounded-2xl shadow-lg">
        <div className="order-2 md:order-1 text-left">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-accent mb-4">More Than Just Cookies.</h2>
          <p className="text-2xl text-muted-foreground italic mb-6">It’s a Memory in Every Bite.</p>
          <p className="text-lg text-foreground">
           Kami percaya, rasa yang paling berkesan bukan hanya tentang bahan-bahan terbaik, tapi juga sentuhan hati yang merangkainya. Kue kami bisa sama dengan yang lain, tapi sentuhan tangan yang membuatnya, itu yang membedakan.
          </p>
        </div>
        <div className="order-1 md:order-2 overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/cookies.jpg"
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

const AIRecommenderSection: FC<{ onProductSelect: (product: Product) => void }> = ({ onProductSelect }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [recommendation, setRecommendation] = useState<{name: string, reason: string} | null>(null);
    const [error, setError] = useState<string | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    
    const [isStoryLoading, setIsStoryLoading] = useState(false);
    const [story, setStory] = useState<string | null>(null);
    const [storyError, setStoryError] = useState<string | null>(null);

    const form = useForm<RecommendationInput>({
        resolver: zodResolver(RecommendationInputSchema),
        defaultValues: {
            baseFlavor: 'Manis',
            texture: 'Renyah',
            specialIngredient: 'Keju',
        },
    });

    const onSubmit = async (values: RecommendationInput) => {
        setIsLoading(true);
        setRecommendation(null);
        setError(null);
        setStory(null);
        setStoryError(null);
        try {
            const result = await recommendCookie(values);
            setRecommendation(result);
        } catch (e) {
            setError("Maaf, terjadi kesalahan saat membuat rekomendasi. Coba lagi nanti.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateStory = async () => {
        if (!recommendation) return;
        
        setIsStoryLoading(true);
        setStory(null);
        setStoryError(null);
        try {
            const result = await generateCookieStory({
                name: recommendation.name,
                description: recommendedProductFlavor?.description || '',
            });
            setStory(result.story);
        } catch (e) {
            setStoryError("Maaf, terjadi kesalahan saat membuat dongeng. Coba lagi nanti.");
            console.error(e);
        } finally {
            setIsStoryLoading(false);
        }
    };
    
    useEffect(() => {
        if (recommendation && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [recommendation]);
    
    const recommendedProductFlavor = allProductFlavors.find(p => `${p.productName} ${p.name}`.toLowerCase().includes(recommendation?.name.toLowerCase() || ''));
    const recommendedProduct = products.find(p => p.name === recommendedProductFlavor?.productName);


    return (
        <section className="py-20 px-4 bg-baking-pattern">
            <div className="container mx-auto max-w-2xl">
                <Card className="p-8 shadow-2xl bg-card/95 backdrop-blur-sm">
                    <CardHeader className="text-center p-0 mb-6">
                        <Wand2 className="mx-auto h-10 w-10 text-primary mb-4" />
                        <CardTitle className="text-3xl font-headline text-accent">Dapur Ajaib Nasthara</CardTitle>
                        <CardDescription className="text-lg">Sulap kombinasi favoritmu menjadi kue!</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                
                                <FormField
                                  control={form.control}
                                  name="baseFlavor"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-lg font-semibold flex items-center gap-2"><CakeSlice/> Dasar Rasa</FormLabel>
                                      <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                                          {['Manis', 'Gurih', 'Kombinasi'].map(value => (
                                            <FormItem key={value}>
                                              <FormControl>
                                                <RadioGroupItem value={value} id={`flavor-${value}`} className="sr-only"/>
                                              </FormControl>
                                              <Label htmlFor={`flavor-${value}`} className={cn("block w-full text-center p-4 border rounded-lg cursor-pointer", field.value === value && "bg-primary text-primary-foreground border-primary")}>
                                                {value}
                                              </Label>
                                            </FormItem>
                                          ))}
                                        </RadioGroup>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="texture"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-lg font-semibold flex items-center gap-2"><ChefHat/> Tekstur</FormLabel>
                                      <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                                          {['Renyah', 'Lembut', 'Lumer'].map(value => (
                                            <FormItem key={value}>
                                               <FormControl>
                                                <RadioGroupItem value={value} id={`texture-${value}`} className="sr-only"/>
                                               </FormControl>
                                               <Label htmlFor={`texture-${value}`} className={cn("block w-full text-center p-4 border rounded-lg cursor-pointer", field.value === value && "bg-primary text-primary-foreground border-primary")}>
                                                {value}
                                              </Label>
                                            </FormItem>
                                          ))}
                                        </RadioGroup>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="specialIngredient"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-lg font-semibold flex items-center gap-2"><Wheat/> Bahan Spesial</FormLabel>
                                      <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                                          {['Keju', 'Cokelat', 'Kacang', 'Buah'].map(value => (
                                            <FormItem key={value}>
                                               <FormControl>
                                                <RadioGroupItem value={value} id={`ingredient-${value}`} className="sr-only"/>
                                               </FormControl>
                                               <Label htmlFor={`ingredient-${value}`} className={cn("block w-full text-center p-4 border rounded-lg cursor-pointer", field.value === value && "bg-primary text-primary-foreground border-primary")}>
                                                {value}
                                              </Label>
                                            </FormItem>
                                          ))}
                                        </RadioGroup>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground !mt-8 text-base">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Meracik adonan ajaib...</> : <><Wand2 className="mr-2 h-5 w-5" /> Aduk Adonan!</>}
                                 </Button>
                            </form>
                        </Form>

                        {error && <p className="text-destructive mt-4 text-center">{error}</p>}

                        {recommendation && recommendedProductFlavor && recommendedProduct && (
                            <div ref={resultRef} className="mt-8 text-center animate-in fade-in-up">
                                <Separator className="my-6"/>
                                <h3 className="text-2xl font-headline font-bold text-accent mb-4">Resep Ajaib-mu Sudah Jadi!</h3>
                                <Card className="overflow-hidden">
                                     <Image
                                        src={recommendedProductFlavor.image}
                                        alt={recommendedProductFlavor.name}
                                        width={600}
                                        height={300}
                                        data-ai-hint={recommendedProductFlavor.hint}
                                        className="object-cover w-full h-48"
                                    />
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-headline">
                                            <Sparkles className="h-6 w-6 text-primary"/> {recommendedProduct.name} {recommendedProductFlavor.name !== 'Original' ? `(${recommendedProductFlavor.name})` : ''}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground italic mb-4">"{recommendation.reason}"</p>
                                        <div className="flex flex-col gap-2">
                                            <Button onClick={() => onProductSelect(recommendedProduct)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                              Lihat Produk
                                            </Button>
                                            <Button onClick={handleGenerateStory} disabled={isStoryLoading} variant="outline" className="w-full">
                                                {isStoryLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Membuka buku dongeng...</> : <><BookOpen className="mr-2 h-4 w-4" /> Bacakan Dongeng Kue Ini</>}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {storyError && <p className="text-destructive mt-4">{storyError}</p>}
                                
                                {story && (
                                    <div className="mt-6 text-left p-6 bg-background rounded-lg border animate-in fade-in-up">
                                        <h4 className="font-headline text-xl text-accent mb-3">Dongeng untukmu...</h4>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{story}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

const GiftAssistantSection: FC<{ onProductSelect: (product: Product) => void }> = ({ onProductSelect }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [recommendation, setRecommendation] = useState<{name: string, reason: string} | null>(null);
    const [error, setError] = useState<string | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    
    const form = useForm<GiftAssistantInput>({
        resolver: zodResolver(GiftAssistantInputSchema),
        defaultValues: {
            description: '',
        },
    });

    const onSubmit = async (values: GiftAssistantInput) => {
        setIsLoading(true);
        setRecommendation(null);
        setError(null);
        try {
            const result = await recommendGift(values);
            setRecommendation(result);
        } catch (e) {
            setError("Maaf, terjadi kesalahan saat mencari kado. Coba lagi nanti.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (recommendation && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [recommendation]);
    
    const recommendedProductFlavor = allProductFlavors.find(p => `${p.productName}`.toLowerCase().includes(recommendation?.name.toLowerCase() || ''));
    const recommendedProduct = products.find(p => p.name === recommendedProductFlavor?.productName);

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <Card className="p-8 shadow-2xl bg-card/95 backdrop-blur-sm">
                    <CardHeader className="text-center p-0 mb-6">
                        <Gift className="mx-auto h-10 w-10 text-primary mb-4" />
                        <CardTitle className="text-3xl font-headline text-accent">Asisten Kado Nasthara</CardTitle>
                        <CardDescription className="text-lg">Bingung pilih kado? Biarkan kami bantu!</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                  control={form.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-lg font-semibold">Ceritakan sedikit tentang kado yang Anda cari</FormLabel>
                                       <FormControl>
                                        <Textarea
                                          placeholder="Contoh: 'Untuk ulang tahun sahabat yang suka banget keju' atau 'Camilan buat nonton bareng teman-teman, yang gurih dan seru'"
                                          className="resize-none"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground !mt-8 text-base">
                                    {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Mencari kado terbaik...</> : <><Sparkles className="mr-2 h-5 w-5" /> Cari Kado!</>}
                                 </Button>
                            </form>
                        </Form>

                        {error && <p className="text-destructive mt-4 text-center">{error}</p>}

                        {recommendation && recommendedProductFlavor && recommendedProduct && (
                            <div ref={resultRef} className="mt-8 text-center animate-in fade-in-up">
                                <Separator className="my-6"/>
                                <h3 className="text-2xl font-headline font-bold text-accent mb-4">Kami Punya Ide Kado Sempurna!</h3>
                                <Card className="overflow-hidden">
                                     <Image
                                        src={recommendedProductFlavor.image}
                                        alt={recommendedProduct.name}
                                        width={600}
                                        height={300}
                                        data-ai-hint={recommendedProductFlavor.hint}
                                        className="object-cover w-full h-48"
                                    />
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-headline">
                                            <Gift className="h-6 w-6 text-primary"/> {recommendedProduct.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground italic mb-4">"{recommendation.reason}"</p>
                                        <Button onClick={() => onProductSelect(recommendedProduct)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                          Bungkus Kado Ini!
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

const ProductDetailDialog: FC<{
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ product, isOpen, onOpenChange }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [selectedFlavor, setSelectedFlavor] = useState<ProductFlavorVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSizeVariant | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedFlavor(product.flavors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (selectedFlavor) {
      setSelectedSize(selectedFlavor.sizes[0]);
    }
  }, [selectedFlavor]);
  
  if (!product || !selectedFlavor || !selectedSize) return null;

  const handleAddToCart = () => {
    addToCart(product.name, selectedFlavor, selectedSize);
    toast({
      title: "Berhasil!",
      description: `${product.name} ${selectedFlavor.name !== 'Original' ? `(${selectedFlavor.name})` : ''} (${selectedSize.size}) telah ditambahkan ke keranjang.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl grid-cols-1 md:grid-cols-2 grid gap-0 p-0 bg-card">
        <div className="p-0 overflow-hidden rounded-l-lg hidden md:block">
           <Image
            src={selectedFlavor.image}
            alt={`${product.name} - ${selectedFlavor.name}`}
            width={800}
            height={800}
            data-ai-hint={selectedFlavor.hint}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-8 flex flex-col">
          <div className="block md:hidden p-0 overflow-hidden rounded-t-lg -m-8 mb-8">
             <Image
              src={selectedFlavor.image}
              alt={`${product.name} - ${selectedFlavor.name}`}
              width={800}
              height={600}
              data-ai-hint={selectedFlavor.hint}
              className="object-cover w-full h-48"
            />
          </div>
          <DialogHeader className="text-left">
            <DialogTitle className="font-headline text-3xl mb-2 text-accent">{product.name}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedFlavor.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow my-6 space-y-6">
            <p className="text-3xl font-bold text-primary">{formatPrice(selectedSize.price)}</p>
            
            {product.flavors.length > 1 && (
                <div>
                    <Label>Rasa</Label>
                    <RadioGroup 
                        value={selectedFlavor.name} 
                        onValueChange={(flavorName) => {
                            const newFlavor = product.flavors.find(f => f.name === flavorName);
                            if (newFlavor) setSelectedFlavor(newFlavor);
                        }} 
                        className="flex gap-2 pt-2"
                    >
                        {product.flavors.map((flavor) => (
                            <div key={flavor.name} className="flex items-center">
                                <RadioGroupItem value={flavor.name} id={`dialog-${product.name}-${flavor.name}`} className="sr-only" />
                                <Label 
                                    htmlFor={`dialog-${product.name}-${flavor.name}`}
                                    className={cn(
                                        "px-4 py-2 border rounded-full cursor-pointer text-sm",
                                        selectedFlavor.name === flavor.name 
                                            ? "bg-primary text-primary-foreground border-primary" 
                                            : "bg-background hover:bg-accent/10"
                                    )}
                                >
                                    {flavor.name}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            )}

            {selectedFlavor.sizes.length > 1 && (
                <div>
                    <Label>Ukuran</Label>
                    <Select
                        value={selectedSize.size}
                        onValueChange={(size) => {
                            const newSize = selectedFlavor.sizes.find(v => v.size === size);
                            if(newSize) setSelectedSize(newSize);
                        }}
                    >
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Pilih ukuran" />
                        </SelectTrigger>
                        <SelectContent>
                            {selectedFlavor.sizes.map((variant) => (
                                <SelectItem key={variant.size} value={variant.size}>
                                    {variant.size} - {formatPrice(variant.price)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
          </div>
          <DialogFooter>
             <Button onClick={handleAddToCart} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};


const Footer: FC = () => (
  <footer className="bg-card/80 py-12 px-4 mt-20">
    <div className="container mx-auto text-center text-muted-foreground">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Logo />
        <span className="text-2xl font-bold font-headline text-foreground">Nasthara</span>
      </div>
      <p className="text-lg italic mb-6">“Because every home has a taste. And that taste is Nasthara.”</p>
      <div className="mb-6">
        <p className="font-semibold text-foreground mb-2">Connect With Us</p>
        <div className="flex justify-center gap-2">
           <Button asChild variant="link" className="text-muted-foreground hover:text-primary">
            <Link href="/recipes">Resep</Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setProductDetailOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setProductDetailOpen(true);
  }

  const handleRecommendationSelect = (productName: string) => {
    const product = products.find(p => p.name === productName);
    if (product) {
      handleProductSelect(product);
    }
  }


  return (
    <div className="bg-background font-body text-foreground">
      <Header onCartClick={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductSection onProductSelect={handleProductSelect} />
        <MidCtaSection />
        <AIRecommenderSection onProductSelect={handleProductSelect} />
        <GiftAssistantSection onProductSelect={handleProductSelect} />
        <TestimonialSection />
        <SeasonalSection/>
      </main>
      <Footer />
      <CartDialog isOpen={isCartOpen} onOpenChange={setCartOpen} />
      <ProductDetailDialog 
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onOpenChange={setProductDetailOpen}
      />
    </div>
  );
}
