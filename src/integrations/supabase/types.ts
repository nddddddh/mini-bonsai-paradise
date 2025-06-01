export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_id: number
          address: string | null
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          password_hash: string
          phone: string | null
          role: number
          updated_at: string | null
          username: string
        }
        Insert: {
          account_id?: number
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          password_hash: string
          phone?: string | null
          role?: number
          updated_at?: string | null
          username: string
        }
        Update: {
          account_id?: number
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          password_hash?: string
          phone?: string | null
          role?: number
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      care_guides: {
        Row: {
          category: string
          content: string
          created_at: string | null
          excerpt: string
          featured: boolean | null
          id: number
          image_url: string
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          excerpt: string
          featured?: boolean | null
          id?: number
          image_url: string
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          featured?: boolean | null
          id?: number
          image_url?: string
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cart: {
        Row: {
          account_id: number
          cart_id: number
          created_at: string | null
        }
        Insert: {
          account_id: number
          cart_id?: number
          created_at?: string | null
        }
        Update: {
          account_id?: number
          cart_id?: number
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account_id"]
          },
        ]
      }
      cart_items: {
        Row: {
          cart_id: number
          cart_item_id: number
          product_id: number
          quantity: number
        }
        Insert: {
          cart_id: number
          cart_item_id?: number
          product_id: number
          quantity: number
        }
        Update: {
          cart_id?: number
          cart_item_id?: number
          product_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["cart_id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_sales"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      order_details: {
        Row: {
          order_detail_id: number
          order_id: number
          price: number
          product_id: number
          quantity: number
        }
        Insert: {
          order_detail_id?: number
          order_id: number
          price: number
          product_id: number
          quantity: number
        }
        Update: {
          order_detail_id?: number
          order_id?: number
          price?: number
          product_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_details_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "order_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_sales"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "order_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      orders: {
        Row: {
          account_id: number
          order_date: string | null
          order_id: number
          status: string
          total_amount: number
        }
        Insert: {
          account_id: number
          order_date?: string | null
          order_id?: number
          status?: string
          total_amount: number
        }
        Update: {
          account_id?: number
          order_date?: string | null
          order_id?: number
          status?: string
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account_id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          description: string | null
          image_path: string | null
          name: string
          price: number
          product_id: number
          stock_quantity: number
        }
        Insert: {
          category: string
          description?: string | null
          image_path?: string | null
          name: string
          price: number
          product_id?: number
          stock_quantity?: number
        }
        Update: {
          category?: string
          description?: string | null
          image_path?: string | null
          name?: string
          price?: number
          product_id?: number
          stock_quantity?: number
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          account_id: number
          created_at: string | null
          id: number
          product_id: number
        }
        Insert: {
          account_id: number
          created_at?: string | null
          id?: number
          product_id: number
        }
        Update: {
          account_id?: number
          created_at?: string | null
          id?: number
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_sales"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
        ]
      }
    }
    Views: {
      product_sales: {
        Row: {
          category: string | null
          name: string | null
          product_id: number | null
          total_revenue: number | null
          total_sold: number | null
        }
        Relationships: []
      }
      revenue_stats: {
        Row: {
          avg_order_value: number | null
          daily_revenue: number | null
          order_date: string | null
          total_orders: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
