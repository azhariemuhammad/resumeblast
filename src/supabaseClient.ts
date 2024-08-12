import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dtrcgdbnldzbujcqukju.supabase.co'
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0cmNnZGJubGR6YnVqY3F1a2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0NjI2ODQsImV4cCI6MjAzOTAzODY4NH0.eHFTUBUC63Ux7lCaXUIoiRzr730scdvD86CBsgO_Na0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
