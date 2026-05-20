const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jeyfllyturocpxqodiwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpleWZsbHl0dXJvY3B4cW9kaXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjUxMzQsImV4cCI6MjA4OTg0MTEzNH0.H56t23V08LA1AqvM7QOXnJccXti6c1tHfDaq_mYfCYc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Fetching products...");
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    console.log("Products count:", data ? data.length : 0);
    console.log("Products:", data);
  }

  console.log("Fetching profiles...");
  const { data: profiles, error: profilesError } = await supabase.from('profiles').select('*');
  if (profilesError) {
    console.error("Error fetching profiles:", profilesError);
  } else {
    console.log("Profiles count:", profiles ? profiles.length : 0);
    console.log("Profiles:", profiles);
  }
}

run();
