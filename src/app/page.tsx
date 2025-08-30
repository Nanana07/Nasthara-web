'use client';
import { useState } from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Instagram, MessageCircle, Cookie, Wheat, ChefHat, Star, Minus, Plus } from 'lucide-react';

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

const products = [
  {
    name: 'Nastar',
    description: 'Classic pineapple tarts with a buttery, melt-in-your-mouth crust.',
    image: 'https://picsum.photos/600/400',
    hint: 'nastar cookie',
  },
  {
    name: 'Lidah Kucing',
    description: 'Thin, crispy, and light cookies, perfect with a cup of tea or coffee.',
    image: 'https://picsum.photos/600/400',
    hint: 'cat tongue cookie',
  },
  {
    name: 'Choco Mede',
    description: 'Rich chocolate cookies packed with crunchy cashew nuts.',
    image: 'https://picsum.photos/600/400',
    hint: 'chocolate cashew cookie',
  },
  {
    name: 'Kastengel',
    description: 'Savory cheese sticks with a satisfying crunch and rich cheesy flavor.',
    image: 'https://picsum.photos/600/400',
    hint: 'cheese cookie',
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

const PreOrderFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  quantity: z.number().min(1, { message: "Minimum order is 1." }),
  cookie: z.string(),
});

type PreOrderFormValues = z.infer<typeof PreOrderFormSchema>;

const Header: FC = () => (
  <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
    <div className="container mx-auto flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Cookie className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold font-headline text-foreground">Nastthara Bites</span>
      </Link>
      <nav className="flex items-center gap-4">
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

const HeroSection: FC = () => (
  <section className="text-center py-20 px-4">
    <div className="container mx-auto">
      <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4">Freshly Baked with Love</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground mb-8">
        Discover the taste of home with our artisanal cookies, made from the finest ingredients and baked to perfection just for you.
      </p>
      <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <a href="#products">Pre-Order Now</a>
      </Button>
    </div>
  </section>
);

const ProductCard: FC<{ product: typeof products[0], onOrder: () => void }> = ({ product, onOrder }) => (
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
      <CardDescription className="text-base text-muted-foreground flex-grow mb-4">{product.description}</CardDescription>
      <Button onClick={onOrder} className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground">Pre-Order Now</Button>
    </CardContent>
  </Card>
);

const PreOrderDialog: FC<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cookieName: string;
}> = ({ isOpen, onOpenChange, cookieName }) => {
  const form = useForm<PreOrderFormValues>({
    resolver: zodResolver(PreOrderFormSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      cookie: cookieName,
    },
  });

  const quantity = form.watch('quantity');

  const onSubmit = (values: PreOrderFormValues) => {
    const message = encodeURIComponent(
      `Halo Nastthara Bites, saya mau pre-order:\n\nNama: ${values.name}\nKue: ${values.cookie}\nJumlah: ${values.quantity} toples\n\nTerima kasih!`
    );
    const whatsappUrl = `https://wa.me/6282233676703?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onOpenChange(false);
    form.reset();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Pre-Order {cookieName}</DialogTitle>
          <DialogDescription>
            Fill in the details below to place your pre-order. We'll contact you via WhatsApp for confirmation.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Budi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (toples)</FormLabel>
                   <FormControl>
                     <div className="flex items-center gap-2">
                       <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => form.setValue('quantity', Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease</span>
                       </Button>
                       <Input {...field} type="number" className="w-16 text-center" readOnly />
                       <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => form.setValue('quantity', quantity + 1)}>
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                       </Button>
                     </div>
                   </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Order via WhatsApp
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const ProductSection: FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedCookie, setSelectedCookie] = useState('');

  const handleOrderClick = (cookieName: string) => {
    setSelectedCookie(cookieName);
    setDialogOpen(true);
  };

  return (
    <section id="products" className="py-20 px-4 bg-card">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-2">Our Signature Cookies</h2>
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
                <ProductCard product={product} onOrder={() => handleOrderClick(product.name)} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        <PreOrderDialog isOpen={isDialogOpen} onOpenChange={setDialogOpen} cookieName={selectedCookie} />
      </div>
    </section>
  );
};

const AboutSection: FC = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">The Art of Baking</h2>
        <p className="text-lg text-muted-foreground">
          At Nastthara Bites, we believe in the magic of homemade cookies. Each batch is made-to-order (Pre-Order system) to ensure you receive the freshest, most delicious treats. We use only high-quality ingredients without any preservatives.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">How to Pre-Order?</AccordionTrigger>
            <AccordionContent className="text-base">
              Simply click the "Pre-Order Now" button on your favorite cookie, fill out the form, and we'll finalize your order via WhatsApp. We bake based on orders to guarantee freshness.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">Our Ingredients</AccordionTrigger>
            <AccordionContent className="text-base">
              We are committed to using premium ingredients: pure butter, quality flour, fresh eggs, and real cheese & fruits. No shortcuts, just pure goodness.
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
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Can't Decide?</h2>
        <p className="text-lg text-muted-foreground mt-2">Let our AI chef give you a personalized recommendation!</p>
      </div>
      <CookieRecommender />
    </div>
  </section>
);

const TestimonialSection: FC = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Sweet Words from Our Customers</h2>
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
        <span className="text-xl font-bold font-headline text-foreground">Nastthara Bites</span>
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
      <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Nastthara Bites. All rights reserved.</p>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="bg-background font-body text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ProductSection />
        <AboutSection />
        <RecommendationSection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
}
