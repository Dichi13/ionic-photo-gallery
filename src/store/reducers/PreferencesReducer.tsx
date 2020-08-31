export const preferences = {
  alignment: "front",
  volume: 0,
};

export const preferencesActionType = {
  setVolume: "PREFERENCES_SET_VOLUME",
  setAlignment: "PREFERENCES_SET_ALIGNMENT",
};

export function preferencesReducer(state: any, action: any) {
  switch(action.type) {
    case preferencesActionType.setVolume:
      return {...state, volume: action.value};
    case preferencesActionType.setAlignment:
      return {...state, alignment: action.value};
    default:
      return state;
  }
}