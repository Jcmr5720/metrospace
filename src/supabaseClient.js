import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bidklbjywxkxnotrtnps.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZGtsYmp5d3hreG5vdHJ0bnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MTgxMjAsImV4cCI6MjA2NjM5NDEyMH0.kDf2SnmRhvRhl_Hy6_ieFdf6L_qI5YJxt3RhrcKOUTc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
