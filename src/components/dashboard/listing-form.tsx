'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Loader2, Info } from 'lucide-react';

import { addCropListing, getAIListingSuggestions } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { ImproveCropListingOutput } from '@/ai/flows/improve-crop-listing';

const listingFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  photo: z.any().refine(files => files?.length === 1, 'A photo is required.'),
  address: z.string().min(5, { message: 'Address is required.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  quantity: z.string().min(1, { message: 'Quantity is required.' }),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

export function ListingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<ImproveCropListingOutput | null>(null);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      price: 0,
      quantity: '',
    },
  });

  async function onSubmit(data: ListingFormValues) {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'photo') {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });
    await addCropListing(formData);
    setIsSubmitting(false);
  }

  const handleImproveWithAI = async () => {
    setIsAiLoading(true);
    setAiError(null);
    await form.trigger(['title', 'description', 'photo', 'address', 'price', 'quantity']);
    const { title, description, photo, address, price, quantity } = form.getValues();
    const photoFile = photo?.[0];
    
    if (!photoFile || !title || !description || !address || !price || !quantity) {
        setAiError("Please fill all fields and select a photo before using AI.");
        setIsAiLoading(false);
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onload = async () => {
        const photoDataUri = reader.result as string;
        try {
            const result = await getAIListingSuggestions({ title, description, photoDataUri, address, price, quantity });
            setAiSuggestions(result);
        } catch (error) {
            setAiError("Failed to get AI suggestions. Please try again.");
        } finally {
            setIsAiLoading(false);
        }
    };
    reader.onerror = () => {
      setAiError('Failed to read photo file.');
      setIsAiLoading(false);
    };
  };
  
  const applySuggestion = (field: 'title' | 'description', value: string) => {
    if (field === 'title') form.setValue('title', value, { shouldValidate: true });
    if (field === 'description') form.setValue('description', value, { shouldValidate: true });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fresh Organic Tomatoes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your crop, its quality, and any special features." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
                   <FormControl>
                     <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                   </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (per unit)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50" {...field} />
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
                      <FormLabel>Unit / Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 1 kg or 1 dozen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Listing
            </Button>
            <Button type="button" variant="secondary" onClick={handleImproveWithAI} disabled={isAiLoading} className="w-full sm:w-auto">
              {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Improve with AI
            </Button>
          </div>
          {aiError && <p className="text-sm text-destructive">{aiError}</p>}
        </form>
      </Form>
      
      <Dialog open={!!aiSuggestions} onOpenChange={() => setAiSuggestions(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Wand2/> AI Listing Suggestions</DialogTitle>
            <DialogDescription>
              Here are some AI-powered suggestions to make your listing more appealing.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] p-1">
             <div className="space-y-6 pr-4">
                 {aiSuggestions && (
                     <>
                        <div>
                            <h3 className="font-semibold mb-2">Improved Title</h3>
                            <Alert>
                                <AlertDescription className="italic">
                                    {aiSuggestions.improvedTitle}
                                </AlertDescription>
                                <Button size="sm" variant="link" onClick={() => applySuggestion('title', aiSuggestions.improvedTitle)}>Apply Title</Button>
                            </Alert>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Improved Description</h3>
                             <Alert>
                                <AlertDescription className="italic whitespace-pre-wrap">
                                    {aiSuggestions.improvedDescription}
                                </AlertDescription>
                                <Button size="sm" variant="link" onClick={() => applySuggestion('description', aiSuggestions.improvedDescription)}>Apply Description</Button>
                            </Alert>
                        </div>
                         <div>
                            <h3 className="font-semibold mb-2">Suggested Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {aiSuggestions.suggestedKeywords.map(keyword => (
                                    <span key={keyword} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">{keyword}</span>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h3 className="font-semibold mb-2">Market Appeal</h3>
                            <Alert variant="default" className="bg-accent/20 border-accent/50">
                                <Info className="h-4 w-4" />
                                <AlertTitle>Suggestion</AlertTitle>
                                <AlertDescription>
                                    {aiSuggestions.marketAppealSuggestions}
                                </AlertDescription>
                            </Alert>
                        </div>
                     </>
                 )}
             </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
