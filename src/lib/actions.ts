'use server'

import { improveCropListing, type ImproveCropListingInput } from '@/ai/flows/improve-crop-listing';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { mockDb } from './data';
import type { PurchaseRequest } from './types';

// In a real app, you'd get this from the session
const FAKE_CUSTOMER_ID = 'customer-1';
const FAKE_FARMER_ID = 'farmer-1';

export async function requestPurchase(cropId: string) {
  const newRequest: PurchaseRequest = {
    id: `req-${Date.now()}`,
    cropId,
    customerId: FAKE_CUSTOMER_ID,
    status: 'pending',
    requestedAt: new Date(),
  };

  mockDb.purchaseRequests.unshift(newRequest);
  
  revalidatePath('/purchases');
  redirect('/purchases?status=success');
}

export async function addCropListing(formData: FormData) {
  const newCrop = {
    id: `crop-${Date.now()}`,
    farmerId: FAKE_FARMER_ID,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    address: formData.get('address') as string,
    price: Number(formData.get('price')),
    quantity: formData.get('quantity') as string,
    imageUrl: 'https://picsum.photos/seed/new' + Date.now() + '/600/400', // Placeholder for uploaded image
    imageHint: 'farm produce',
  };

  mockDb.crops.unshift(newCrop);

  revalidatePath('/');
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function getAIListingSuggestions(input: ImproveCropListingInput) {
    try {
        const suggestions = await improveCropListing(input);
        return suggestions;
    } catch (error) {
        console.error("Error getting AI suggestions:", error);
        throw new Error("Failed to get AI suggestions.");
    }
}

export async function updateRequestStatus(requestId: string, status: 'accepted' | 'declined') {
    const request = mockDb.purchaseRequests.find(r => r.id === requestId);
    if (request) {
        request.status = status;
        revalidatePath('/dashboard/requests');
    }
}
