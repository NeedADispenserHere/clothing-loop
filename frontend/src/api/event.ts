import axios from "./axios";
import { UID } from "./types";

export function eventGet(uid: UID) {
  return axios.get<Event>("/v2/event", {
    params: { uid },
  });
}

interface EventGetAllParams {
  latitude: number;
  longitude: number;
  radius: number;
}
type EventCreateBody = Omit<Event, "uid">;

export function eventGetAll(params?: EventGetAllParams) {
  return axios.get<Event[]>("/v2/event/all", { params });
}

export function eventCreate(event: EventCreateBody) {
  return axios.post<never>("/v2/event", event);
}

export type EventUpdateBody = Partial<Event> & { uid: UID };

export function eventUpdate(event: EventUpdateBody) {
  return axios.patch<never>("/v2/event", event);
}

export function eventDelete(uid: UID) {
  return axios.delete<never>("/v2/event", { params: { uid } });
}

export function eventICalURL(uid: UID): string {
  return axios.defaults.baseURL + "/v2/event/ical/" + uid;
}
