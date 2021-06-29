import { Location as TLocation } from "../api/location/Location";

export const LOCATION_TITLE_FIELD = "id";

export const LocationTitle = (record: TLocation) => {
  return record.id;
};
