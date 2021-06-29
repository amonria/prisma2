import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { LocationWhereUniqueInput } from "../location/LocationWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProjectWhereInput = {
  description?: DateTimeNullableFilter;
  dueDate?: DateTimeNullableFilter;
  id?: StringFilter;
  location?: LocationWhereUniqueInput;
  name?: StringNullableFilter;
  owner?: UserWhereUniqueInput;
  startDate?: DateTimeNullableFilter;
};
