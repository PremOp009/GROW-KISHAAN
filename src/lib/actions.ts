'use server'

import { improveCropListing, type ImproveCropListingInput } from '@/ai/flows/improve-crop-listing';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { mockDb } from './data';
import type { PurchaseRequest, Crop } from './types';

// In a real app, you'd get this from the session
const FAKE_CUSTOMER_ID = 'customer-1';
const FAKE_FARMER_ID = 'farmer-1';

export async function getCrops(): Promise<Crop[]> {
  // In a real app, this would fetch from a database.
  // We'll add a short delay to simulate network latency.
  await new Promise(resolve => setTimeout(resolve, 50)); 
  return mockDb.crops;
}


export async function requestPurchase(cropId: string, formData: FormData) {
  const quantity = formData.get('quantity');
  console.log(`Requested quantity: ${quantity} for crop ${cropId}`);
  
  const newRequest: PurchaseRequest = {
    id: `req-${Date.now()}`,
    cropId,
    customerId: FAKE_CUSTOMER_ID,
    status: 'pending',
    requestedAt: new Date(),
    quantity: quantity ? String(quantity) : undefined,
  };

  mockDb.purchaseRequests.unshift(newRequest);
  
  revalidatePath('/purchases');
  redirect('/purchases?status=success');
}

export async function addCropListing(formData: FormData) {
  const imageHint = formData.get('imageHint') as string || 'farm produce';
  const newCrop = {
    id: `crop-${Date.now()}`,
    farmerId: FAKE_FARMER_ID,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    address: formData.get('address') as string,
    price: Number(formData.get('price')),
    quantity: formData.get('quantity') as string,
    imageUrl: `https://picsum.photos/seed/${imageHint.replace(' ', '')}${Date.now()}/600/400`, // Placeholder for uploaded image
    imageHint: imageHint,
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
