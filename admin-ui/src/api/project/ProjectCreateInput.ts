import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProjectCreateInput = {
  description?: Date | null;
  name?: string | null;
  owner: UserWhereUniqueInput;
  startDate?: Date | null;
};
