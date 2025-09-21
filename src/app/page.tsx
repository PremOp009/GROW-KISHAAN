import Image from "next/image";
import Link from "next/link";
import { CropCard } from "@/components/crop-card";
import { Button } from "@/components/ui/button";
import { crops } from "@/lib/data";
import { placeHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = placeHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[50vh] md:h-[60vh] text-white">
        {heroImage && 
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        }
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
            Fresh From The Fields, To Your Home
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Discover the best local produce, straight from the farmers who grow it. Quality you can taste, prices you'll love.
          </p>
          <Button asChild size="lg">
            <Link href="#browse-crops">Start Browsing</Link>
          </Button>
        </div>
      </section>

      <section id="browse-crops" className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Available Near You</h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Explore fresh, locally-sourced crops from trusted farmers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {crops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8 mt-16">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} GROW KISHAAN. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
