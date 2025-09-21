import type { Crop } from "@/lib/types";
import Link from "next/link";
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
      <CardContent className="flex-grow p-4">
        
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted/50">
        <div className="font-bold text-lg text-primary">
          rupees {crop.price} <span className="text-sm font-normal text-muted-foreground">/ {unit}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
