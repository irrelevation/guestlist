type EventName<T> = keyof T;
type EventData<T> = T[EventName<T>];
interface EventObject<T> {
  eventName: EventName<T>;
  data: EventData<T>;
}

type FilterFunction<T> = (data: EventData<T>) => boolean;
interface Filter<T> {
  eventName: EventName<T>;
  filter: FilterFunction<T>;
}

type MapperFunction<T> = (data: EventData<T>) => EventData<T>;
interface Mapper<T> {
  eventName: EventName<T>;
  map: MapperFunction<T>;
}

export class EventProcessor<T> {
  private processedEvents: EventObject<T>[] = [];
  private filters: Filter<T>[] = [];
  private mappers: Mapper<T>[] = [];

  handleEvent(eventName: EventName<T>, data: EventData<T>): void {
    const event = { eventName, data };
    for (let filter of this.filters) {
      if (filter.eventName === eventName && filter.filter(data)) return;
    }

    for (let mapper of this.mappers) {
      event.data = mapper.map(event.data);
    }
    this.processedEvents.push(event);
  }

  addFilter(eventName: EventName<T>, filter: FilterFunction<T>): void {
    this.filters.push({ eventName, filter });
  }

  addMap(eventName: EventName<T>, map: MapperFunction<T>): void {
    this.mappers.push({ eventName, map });
  }

  getProcessedEvents() {
    return this.processedEvents;
  }
}

interface UserEventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<UserEventMap> {}

const userEventProcessor = new UserEventProcessor();

userEventProcessor.addFilter("login", ({ user }) => Boolean(user));

userEventProcessor.addMap("login", (data) => ({
  ...data,
  hasSession: Boolean(data.user && data.name),
}));

userEventProcessor.handleEvent("login", {
  user: null,
  name: "Lukas",
});
userEventProcessor.handleEvent("login", {
  user: "aeon",
  name: "Andi",
});
userEventProcessor.handleEvent("logout", {
  user: "Lukas",
});

console.log(userEventProcessor.getProcessedEvents());
