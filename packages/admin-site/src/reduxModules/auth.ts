export interface State {
  loggedIn: boolean
}

const initialState: State = {
  loggedIn: false,
}

export const ActionTypes = {
  setLoggedIn: "auth/setLoggedIn",
}

export const actions = {
  setLoggedIn: (loggedIn: boolean) => ({
    type: ActionTypes.setLoggedIn as typeof ActionTypes.setLoggedIn,
    loggedIn,
  }),
}

type Action = ReturnType<typeof actions.setLoggedIn>

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.setLoggedIn: {
      return {
        ...state,
        loggedIn: action.loggedIn,
      }
    }
    default: {
      return state
    }
  }
}
