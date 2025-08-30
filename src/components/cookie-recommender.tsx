'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { getCookieRecommendations } from '@/app/actions';

const FormSchema = z.object({
  orderHistory: z.string().min(10, {
    message: 'Please tell us a bit more about what you like!',
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function CookieRecommender() {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      orderHistory: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    const result = await getCookieRecommendations(data);

    if (result.success) {
      setRecommendations(result.recommendations);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }

    setIsLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="orderHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Tell us your cookie preferences!</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I love classic buttery cookies like Nastar, but I've also tried and enjoyed savory ones like Kastengel. I bought 2 Nastar and 1 Kastengel last time.'"
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Baking recommendations...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Card className="mt-6 border-destructive">
          <CardContent className="p-4">
            <p className="text-destructive text-center">{error}</p>
          </CardContent>
        </Card>
      )}

      {recommendations && (
        <div className="mt-6">
            <h3 className="text-2xl font-headline font-bold text-center mb-4">You might also love...</h3>
            <Card className="bg-primary/10 border-primary">
                <CardContent className="p-6">
                    <p className="text-lg whitespace-pre-line">{recommendations}</p>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
