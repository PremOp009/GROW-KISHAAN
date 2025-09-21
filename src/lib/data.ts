import type { Crop, Farmer, PurchaseRequest, Customer } from './types';

export const farmers: Farmer[] = [
  {
    id: 'farmer-1',
    name: 'Rajesh Kumar',
    phone: '+919876543210',
    address: '123, Green Valley, Punjab',
  },
];

export const customers: Customer[] = [
    {
        id: 'customer-1',
        name: 'Priya Sharma'
    }
]

export const crops: Crop[] = [];

export const purchaseRequests: PurchaseRequest[] = [
    {
        id: 'req-1',
        cropId: 'crop-1',
        customerId: 'customer-1',
        status: 'pending',
        requestedAt: new Date(),
    },
    {
        id: 'req-2',
        cropId: 'crop-2',
        customerId: 'customer-1',
        status: 'accepted',
        requestedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    }
];

// In a real app, this would be a database. For now, we'll mutate this array.
// This is not safe for concurrent use, but fine for this example.
export let mockDb = {
    farmers,
    customers,
    crops,
    purchaseRequests
}
