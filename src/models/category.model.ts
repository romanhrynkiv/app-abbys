export interface CategoryNode {
  name: string;
  type: "service" | "category";
  mode?: "edit" | "create";
  root?: boolean;
  children: CategoryNode[];
}
