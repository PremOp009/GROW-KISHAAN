import Link from 'next/link';
import { mockDb } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, List, GitPullRequest } from 'lucide-react';

// In a real app, this would be from the session
const FAKE_FARMER_ID = 'farmer-1';

export default function DashboardPage() {
    const farmerListings = mockDb.crops.filter(c => c.farmerId === FAKE_FARMER_ID);
    const listingIds = farmerListings.map(c => c.id);
    const farmerRequests = mockDb.purchaseRequests.filter(r => listingIds.includes(r.cropId) && r.status === 'pending');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Farmer Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's an overview of your farm's activity.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                        <List className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{farmerListings.length}</div>
                        <p className="text-xs text-muted-foreground">Active crops on the marketplace</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                        <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{farmerRequests.length}</div>
                        <p className="text-xs text-muted-foreground">New purchase requests to review</p>
                    </CardContent>
                </Card>

                <Card className="flex flex-col items-center justify-center bg-transparent border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <Button asChild>
                            <Link href="/dashboard/listings/new">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add New Listing
                            </Link>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">List a new crop for sale</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
