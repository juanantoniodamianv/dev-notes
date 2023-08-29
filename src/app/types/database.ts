export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "favorites_post_id_fkey";
            columns: ["post_id"];
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorites_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      posts: {
        Row: {
          content: string;
          created_at: string;
          favorites_count: number | null;
          id: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          favorites_count?: number | null;
          id?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          favorites_count?: number | null;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          avatar_url: string;
          created_at: string;
          id: string;
          name: string;
          user_name: string;
        };
        Insert: {
          avatar_url: string;
          created_at?: string;
          id: string;
          name: string;
          user_name: string;
        };
        Update: {
          avatar_url?: string;
          created_at?: string;
          id?: string;
          name?: string;
          user_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
