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

async function fileToDataUri(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    return `data:${file.type};base64,${base64}`;
}

export async function addCropListing(formData: FormData) {
  const imageHint = formData.get('imageHint') as string || 'farm produce';
  const photoFile = formData.get('photo') as File;

  let imageUrl = `https://picsum.photos/seed/${imageHint.replace(' ', '')}${Date.now()}/600/400`;
  // Check if a file was actually uploaded and it has content
  if (photoFile && photoFile.size > 0) {
      imageUrl = await fileToDataUri(photoFile);
  }

  const newCrop: Crop = {
    id: `crop-${Date.now()}`,
    farmerId: FAKE_FARMER_ID,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    address: formData.get('address') as string,
    price: Number(formData.get('price')),
    quantity: formData.get('quantity') as string,
    imageUrl: imageUrl,
    imageHint: imageHint,
  };

  // Correctly add the new crop to the database
  mockDb.crops.unshift(newCrop);

  // Revalidate paths to ensure the UI updates
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
