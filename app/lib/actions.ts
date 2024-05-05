'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const FormSchema2 = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image_url: z.string(),
});

const CreateReservation = FormSchema.omit({ id: true, date: true });
const UpdateReservation = FormSchema.omit({ id: true, date: true });
const CreateCustomer = FormSchema2.omit({ id: true })
const UpdateCustomer = FormSchema2.omit({ id: true })

export async function createCustomer(formData: FormData) {
  
  const img = formData.get('image') ;
  console.log(img);

  let fileName = '';
  if (img instanceof File) {
    fileName =  '/customers/'+ img.name; 
    console.log(fileName);
  };

  const { name, email, image_url } = CreateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: fileName,
  });

  await sql`
    INSERT INTO customers (name, email, image_url)
    VALUES (${name}, ${email}, ${image_url})
  `;

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
  // Test it out:
  //console.log(rawFormData);
}

export async function updateCustomer(id: string, formData: FormData) {
  const img = formData.get('image') ;
  console.log(img);

  let fileName = '';
  if (img instanceof File) {
    fileName =  '/customers/'+ img.name; 
    console.log(fileName);
  };
  
  const { name, email, image_url } = UpdateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: fileName,
  });
  
  await sql`
    UPDATE customers
    SET name = ${name}, email = ${email}, image_url = ${image_url}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}




export async function createReservation(formData: FormData) {
  const { customerId, amount, status } = CreateReservation.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO reservations (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');
  // Test it out:
  //console.log(rawFormData);
}



export async function updateReservation(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateReservation.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE reservations
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/reservations');
  redirect('/dashboard/reservations');
}

export async function deleteReservation(id: string) {
  await sql`DELETE FROM reservations WHERE id = ${id}`;
  revalidatePath('/dashboard/reservations');
}


export async function deleteCustomer(id: string) {
  await sql`DELETE FROM customers WHERE id = ${id}`;
  revalidatePath('/dashboard/customers');
}