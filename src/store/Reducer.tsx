import {preferencesReducer} from "./reducers/PreferencesReducer";
import {userReducer} from "./reducers/UserReducer";

interface State {
  preferences: any,
  user: any,
}

export function reducer({preferences, user}: State, action: any): State {
  return {
    preferences: preferencesReducer(preferences, action),
    user: userReducer(user, action)
  }
}