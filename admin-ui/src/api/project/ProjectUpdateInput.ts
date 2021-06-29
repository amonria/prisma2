import { LocationWhereUniqueInput } from "../location/LocationWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProjectUpdateInput = {
  description?: Date | null;
  dueDate?: Date | null;
  location?: LocationWhereUniqueInput | null;
  name?: string | null;
  owner?: UserWhereUniqueInput;
  startDate?: Date | null;
};
