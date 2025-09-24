import type { Crop, Farmer, PurchaseRequest, Customer } from './types';

// This is a temporary in-memory "database" for demonstration purposes.
// In a real-world application, you would use a proper database like Firestore.

type MockDb = {
  farmers: Farmer[];
  customers: Customer[];
  crops: Crop[];
  purchaseRequests: PurchaseRequest[];
};

// We use a global variable to simulate a persistent data store.
// This is not suitable for production but works for this development context.
const globalForDb = globalThis as unknown as {
  mockDb: MockDb | undefined;
};

const initialDb: MockDb = {
  farmers: [
    {
      id: 'farmer-1',
      name: 'Rajesh Kumar',
      phone: '+919876543210',
      address: '123, Green Valley, Punjab',
    },
  ],
  customers: [
    {
      id: 'customer-1',
      name: 'Priya Sharma',
    },
  ],
  crops: [],
  purchaseRequests: [
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
    },
  ],
};

export const mockDb = globalForDb.mockDb ?? (globalForDb.mockDb = initialDb);
