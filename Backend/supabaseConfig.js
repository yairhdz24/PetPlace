import { createClient } from '@supabase/supabase-js';

// Lee las variables de entorno desde el archivo .env
const SUPABASE_URL = "https://aymjigjsofmrbeqxlaew.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5bWppZ2pzb2ZtcmJlcXhsYWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0MzcxOTUsImV4cCI6MjAyNzAxMzE5NX0.E8SrQZQiRJgndQciMx-21o069IVIpm2l3We1AWlDTAM";

// Configura Supabase con las credenciales
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


export default supabase;
