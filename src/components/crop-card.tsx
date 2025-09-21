import type { Crop } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CropCardProps {
  crop: Crop;
}

export function CropCard({ crop }: CropCardProps) {
  const unit = crop.quantity.split(" ")[1] || '';
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
      <div className="relative aspect-video w-full">
        <Image
          src={crop.imageUrl}
          alt={crop.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={crop.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-headline">{crop.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground pt-1">
          <MapPin className="w-4 h-4 mr-1.5" />
          <span>{crop.address}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted/50">
        <div className="font-bold text-lg text-primary">
          rupees {crop.price} <span className="text-sm font-normal text-muted-foreground">/ {unit}</span>
        </div>
        <Button asChild>
          <Link href={`/crops/${crop.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
