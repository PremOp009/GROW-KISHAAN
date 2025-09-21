import { mockDb } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateRequestStatus } from "@/lib/actions";
import { Check, X } from "lucide-react";

// In a real app, this would come from the user's session
const FAKE_FARMER_ID = 'farmer-1';

export default function RequestsPage() {
    const farmerCropIds = mockDb.crops.filter(c => c.farmerId === FAKE_FARMER_ID).map(c => c.id);
    const requests = mockDb.purchaseRequests
        .filter(r => farmerCropIds.includes(r.cropId))
        .map(r => {
            const crop = mockDb.crops.find(c => c.id === r.cropId);
            const unit = crop?.quantity.split(' ')[1] || '';
            return {
                ...r,
                cropTitle: crop?.title,
                customerName: mockDb.customers.find(c => c.id === r.customerId)?.name,
                unit: unit
            }
        })
        .sort((a, b) => b.requestedAt.getTime() - a.requestedAt.getTime());

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Purchase Requests</CardTitle>
                <CardDescription>Review and respond to requests from customers.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Crop</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24">No requests found.</TableCell>
                            </TableRow>
                        )}
                        {requests.map(request => (
                            <TableRow key={request.id}>
                                <TableCell className="font-medium">{request.cropTitle}</TableCell>
                                <TableCell>{request.customerName}</TableCell>
                                <TableCell>{request.quantity ? `${request.quantity} ${request.unit}` : 'N/A'}</TableCell>
                                <TableCell>{request.requestedAt.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant={request.status === 'accepted' ? 'default' : request.status === 'pending' ? 'secondary' : 'destructive'} className="capitalize">
                                        {request.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {request.status === 'pending' && (
                                        <div className="flex gap-2 justify-end">
                                            <form action={async () => { 'use server'; await updateRequestStatus(request.id, 'accepted'); }}>
                                                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-100">
                                                    <Check className="h-4 w-4"/>
                                                    <span className="sr-only">Accept</span>
                                                </Button>
                                            </form>
                                            <form action={async () => { 'use server'; await updateRequestStatus(request.id, 'declined'); }}>
                                                <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-100">
                                                    <X className="h-4 w-4"/>
                                                    <span className="sr-only">Decline</span>
                                                </Button>
                                            </form>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
