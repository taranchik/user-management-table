export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UsersState {
  users: User[];
  filteredUsers: User[];
  filter: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
  status: "idle" | "loading" | "failed";
}

// Type definition for filter fields
export type FilterField = keyof UsersState["filter"];
