export interface Entry {
  name: string;
  category: "microsoft" | "applications" | "development";
  armVersion: boolean;
  link: string;
}

export type CategorizedData = Record<Entry["category"], Entry[]>;
