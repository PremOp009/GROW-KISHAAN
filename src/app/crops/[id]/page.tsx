import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, User, Package, IndianRupee, Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { crops, farmers } from '@/lib/data';
import { requestPurchase } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function CropDetailPage({ params }: { params: { id: string } }) {
  const crop = crops.find((c) => c.id === params.id);

  if (!crop) {
    notFound();
  }

  const farmer = farmers.find((f) => f.id === crop.farmerId);
  const [quantity, unit] = crop.quantity.split(' ');

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative aspect-video md:aspect-auto w-full min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={crop.imageUrl}
            alt={crop.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            data-ai-hint={crop.imageHint}
          />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">{crop.title}</h1>
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{crop.address}</span>
          </div>

          <p className="text-lg text-foreground/80 mb-6">{crop.description}</p>
          
          <Card className="mb-6 bg-card/80">
            <CardContent className="p-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <IndianRupee className="w-8 h-8 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-bold text-lg">rupees {crop.price} / {unit}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="font-bold text-lg">{crop.quantity}</p>
                    </div>
                </div>
            </CardContent>
          </Card>

          {farmer && (
            <div className="mb-6">
                <h2 className="text-xl font-headline font-semibold mb-3">About the Farmer</h2>
                <div className="flex items-center gap-3 text-lg">
                  <User className="w-6 h-6 text-muted-foreground" />
                  <span>{farmer.name}</span>
                </div>
            </div>
          )}
          
          <Separator className="my-6" />
          
          <form action={async (formData: FormData) => {
              'use server';
              await requestPurchase(crop.id, formData);
          }}>
            <div className="grid gap-4 mb-6">
                <div>
                    <Label htmlFor="quantity" className="text-lg font-medium">Desired Quantity</Label>
                    <div className="flex items-center gap-2 mt-2">
                        <Input 
                            id="quantity"
                            name="quantity"
                            type="number" 
                            defaultValue="1"
                            min="1"
                            max={quantity} // Assuming `quantity` is the max available
                            className="w-24 text-center"
                        />
                        <span className="text-lg text-muted-foreground">{unit}</span>
                    </div>
                </div>
            </div>
            
            <Button type="submit" size="lg" className="w-full">
              Request Purchase
            </Button>
          </form>
          <p className="text-xs text-center text-muted-foreground mt-2">By requesting, you agree to be contacted by the farmer.</p>
        </div>
      </div>
    </div>
  );
}
