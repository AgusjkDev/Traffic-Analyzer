export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
    public: {
        Tables: {
            actions: {
                Row: {
                    action_type: string;
                    created_at: string;
                    device_id: string;
                    id: string;
                    pending: boolean;
                };
                Insert: {
                    action_type: string;
                    created_at?: string;
                    device_id: string;
                    id: string;
                    pending?: boolean;
                };
                Update: {
                    action_type?: string;
                    created_at?: string;
                    device_id?: string;
                    id?: string;
                    pending?: boolean;
                };
                Relationships: [
                    {
                        foreignKeyName: "actions_device_id_fkey";
                        columns: ["device_id"];
                        referencedRelation: "devices";
                        referencedColumns: ["id"];
                    }
                ];
            };
            devices: {
                Row: {
                    created_at: string;
                    id: string;
                    interval: number | null;
                    street_id: string | null;
                    street_number: number | null;
                    updated_at: string;
                    user_id: string | null;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    interval?: number | null;
                    street_id?: string | null;
                    street_number?: number | null;
                    updated_at?: string;
                    user_id?: string | null;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    interval?: number | null;
                    street_id?: string | null;
                    street_number?: number | null;
                    updated_at?: string;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "devices_street_id_fkey";
                        columns: ["street_id"];
                        referencedRelation: "streets";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "devices_user_id_fkey";
                        columns: ["user_id"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            streets: {
                Row: {
                    created_at: string;
                    id: string;
                    name: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    name: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    name?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "streets_user_id_fkey";
                        columns: ["user_id"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            traffic: {
                Row: {
                    created_at: string;
                    device_id: string;
                    id: string;
                    interval: number;
                    recognitions: number;
                    street_id: string;
                    street_number: number;
                };
                Insert: {
                    created_at?: string;
                    device_id: string;
                    id?: string;
                    interval: number;
                    recognitions: number;
                    street_id: string;
                    street_number: number;
                };
                Update: {
                    created_at?: string;
                    device_id?: string;
                    id?: string;
                    interval?: number;
                    recognitions?: number;
                    street_id?: string;
                    street_number?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "traffic_device_id_fkey";
                        columns: ["device_id"];
                        referencedRelation: "devices";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "traffic_street_id_fkey";
                        columns: ["street_id"];
                        referencedRelation: "streets";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            get_traffic_by_user: {
                Args: {
                    user_id: string;
                };
                Returns: {
                    id: string;
                    device_id: string;
                    street_id: string;
                    street_number: number;
                    interval: number;
                    recognitions: number;
                    created_at: string;
                    street_name: string;
                }[];
            };
            insert_device_and_return_id: {
                Args: Record<PropertyKey, never>;
                Returns: string;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
