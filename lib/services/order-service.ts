import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/client'

export type Order = Database['public']['Tables']['orders']['Row']

export async function createOrder(
  userId: string,
  items: any[],
  totalPrice: number,
  customerEmail: string,
  customerName: string,
  customerPhone: string
) {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        items,
        total_price: totalPrice,
        status: 'pending',
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: customerPhone,
      },
    ])
    .select()

  if (error) throw error
  return data?.[0] as Order
}

export async function getOrdersByUser(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Order[]
}

export async function getOrderById(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error) throw error
  return data as Order
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()

  if (error) throw error
  return data?.[0] as Order
}

export async function getAllOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Order[]
}
