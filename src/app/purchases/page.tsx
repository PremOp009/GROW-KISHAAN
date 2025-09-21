import { mockDb } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Phone, XCircle } from "lucide-react";

// In a real app, this would come from the user's session
const FAKE_CUSTOMER_ID = 'customer-1';

export default function PurchasesPage() {
    const customerRequests = mockDb.purchaseRequests
        .filter(r => r.customerId === FAKE_CUSTOMER_ID)
        .map(request => {
            const crop = mockDb.crops.find(c => c.id === request.cropId);
            const farmer = crop ? mockDb.farmers.find(f => f.id === crop.farmerId) : undefined;
            return {
                ...request,
                cropTitle: crop?.title || 'Unknown Crop',
                farmer,
            };
        })
        .sort((a, b) => b.requestedAt.getTime() - a.requestedAt.getTime());

    const statusIcons = {
        pending: <Clock className="w-5 h-5 text-yellow-500" />,
        accepted: <CheckCircle2 className="w-5 h-5 text-green-500" />,
        declined: <XCircle className="w-5 h-5 text-red-500" />,
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-headline font-bold">My Purchase Requests</h1>
                <p className="text-muted-foreground mt-2 text-lg">Track the status of your requests to local farmers.</p>
            </div>
            
            {customerRequests.length > 0 ? (
                <div className="space-y-6">
                    {customerRequests.map(request => (
                        <Card key={request.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="font-headline">{request.cropTitle}</CardTitle>
                                        <CardDescription>
                                            Requested on {request.requestedAt.toLocaleDateString()}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={request.status === 'accepted' ? 'default' : request.status === 'pending' ? 'secondary' : 'destructive'} className="capitalize flex gap-2 items-center">
                                       {statusIcons[request.status]}
                                       {request.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            {request.status === 'accepted' && request.farmer && (
                                <CardContent>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-green-800">Your request was accepted!</h3>
                                        <p className="text-green-700 text-sm">Please contact the farmer to arrange pickup and payment.</p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <Phone className="w-5 h-5 text-green-600" />
                                            <span className="font-mono text-green-800">{request.farmer.phone}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                            {request.status === 'declined' && (
                                <CardContent>
                                    <p className="text-sm text-destructive">The farmer was unable to fulfill this request.</p>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="text-center py-12">
                    <CardHeader>
                        <CardTitle>No Purchase Requests Yet</CardTitle>
                        <CardDescription>Start browsing crops to make your first purchase request.</CardDescription>
                    </CardHeader>
                </Card>
            )}
        </div>
    );
}
