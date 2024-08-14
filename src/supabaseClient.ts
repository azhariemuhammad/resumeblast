import { createClient } from '@supabase/supabase-js'
import { config } from './config'
console.log({ config })

const supabaseUrl = config.supabaseUrl
const supabaseAnonKey = config.supabaseAnonKey

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
