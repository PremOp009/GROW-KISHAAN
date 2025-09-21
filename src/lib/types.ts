export type Farmer = {
  id: string;
  name: string;
  phone: string;
  address: string;
};

export type Crop = {
  id: string;
  farmerId: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  address: string;
  price: number;
  quantity: string;
};

export type PurchaseRequest = {
  id: string;
  cropId: string;
  customerId: string;
  status: 'pending' | 'accepted' | 'declined';
  requestedAt: Date;
  quantity?: string;
  customerName?: string;
  cropTitle?: string;
};

export type Customer = {
    id: string;
    name: string;
};
