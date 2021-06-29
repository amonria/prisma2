import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProjectUpdateInput = {
  description?: Date | null;
  name?: string | null;
  owner?: UserWhereUniqueInput;
  startDate?: Date | null;
};
