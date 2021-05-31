export type actionType<T> = {
  type: string;
  data?: T;
};

interface hanlderType<T extends U, U> {
  [K: string]: (state: T, action: actionType<U>) => T;
}

export function createReducer<T extends U, U>(
  initialState: T,
  handlers: hanlderType<T, U>
) {
  return (state: T, action: actionType<U>): T => {
    if (typeof state === "undefined") {
      return initialState;
    }

    const handler = handlers[action.type];
    if (!handler) {
      return state;
    }

    return handler(state, action);
  };
}
