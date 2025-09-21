import type { Crop } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CropCardProps {
  crop: Crop;
}

export function CropCard({ crop }: CropCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={crop.imageUrl}
            alt={crop.title}
            fill
            className="object-cover"
            data-ai-hint={crop.imageHint}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-headline mb-2">{crop.title}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{crop.address}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted/50">
        <div className="font-bold text-lg text-primary">
          rupees {crop.price} <span className="text-sm font-normal text-muted-foreground">/ {crop.quantity.split(" ")[1]}</span>
        </div>
        <Button asChild>
          <Link href={`/crops/${crop.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
