export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          stock_count: number
          image_url: string | null
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          stock_count?: number
          image_url?: string | null
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          stock_count?: number
          image_url?: string | null
          active?: boolean
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          duration_min: number
          image_url: string | null
          active: boolean
          created_at: string
        }
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type Service = Database['public']['Tables']['services']['Row']

export interface CartItem extends Product {
  quantity: number
}
