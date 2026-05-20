import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jeyfllyturocpxqodiwi.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpleWZsbHl0dXJvY3B4cW9kaXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjUxMzQsImV4cCI6MjA4OTg0MTEzNH0.H56t23V08LA1AqvM7QOXnJccXti6c1tHfDaq_mYfCYc'

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key is missing. Check your environment variables.')
}

// Verify Connection
console.log("Supabase Client initialized with URL:", supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseKey)
