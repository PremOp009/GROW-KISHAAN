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

export const crops: Crop[] = [
  {
    id: 'crop-1',
    farmerId: 'farmer-1',
    title: 'Fresh Organic Tomatoes',
    description: 'Juicy and ripe tomatoes grown using organic farming methods. Perfect for salads, sauces, and sandwiches.',
    imageUrl: 'https://picsum.photos/seed/crop1/600/400',
    imageHint: 'tomatoes',
    address: 'Ludhiana, Punjab',
    price: 50,
    quantity: '10 kg',
  },
  {
    id: 'crop-2',
    farmerId: 'farmer-1',
    title: 'Golden Wheat',
    description: 'High-quality wheat grains, perfect for making flour for chapatis and bread. Sourced from the fertile lands of Punjab.',
    imageUrl: 'https://picsum.photos/seed/crop2/600/400',
    imageHint: 'wheat field',
    address: 'Amritsar, Punjab',
    price: 30,
    quantity: '50 kg',
  },
  {
    id: 'crop-3',
    farmerId: 'farmer-1',
    title: 'Crisp Green Cabbage',
    description: 'Freshly harvested green cabbages. Great for coleslaw, stir-fries, and traditional Indian dishes.',
    imageUrl: 'https://picsum.photos/seed/crop3/600/400',
    imageHint: 'cabbage',
    address: 'Jalandhar, Punjab',
    price: 40,
    quantity: '20 pieces',
  },
  {
    id: 'crop-4',
    farmerId: 'farmer-1',
    title: 'Sweet Carrots',
    description: 'Sweet and crunchy carrots, rich in Vitamin A. Excellent for salads, juices, or as a healthy snack.',
    imageUrl: 'https://picsum.photos/seed/crop4/600/400',
    imageHint: 'carrots',
    address: 'Patiala, Punjab',
    price: 60,
    quantity: '15 kg',
  },
];

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
