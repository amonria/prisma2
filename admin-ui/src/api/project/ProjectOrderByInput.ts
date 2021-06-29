import { SortOrder } from "../../util/SortOrder";

export type ProjectOrderByInput = {
  createdAt?: SortOrder;
  description?: SortOrder;
  dueDate?: SortOrder;
  id?: SortOrder;
  locationId?: SortOrder;
  name?: SortOrder;
  ownerId?: SortOrder;
  startDate?: SortOrder;
  updatedAt?: SortOrder;
};
