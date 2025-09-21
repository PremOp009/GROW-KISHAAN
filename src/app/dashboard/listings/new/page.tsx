import { ListingForm } from "@/components/dashboard/listing-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewListingPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Create a New Crop Listing</CardTitle>
                <CardDescription>
                    Fill out the details below to list your crop on the marketplace. Use our AI tool to improve your listing!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ListingForm />
            </CardContent>
        </Card>
    );
}
