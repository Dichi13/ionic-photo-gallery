export const user = {
  authToken: "",
  name: "",
  age: 0,
  emailAddress: "",
};

export const userActionType = {
  logOut: "USER_LOGOUT",
  setAuthToken: "USER_AUTH_TOKEN",
  setUsername: "USER_SET_USERNAME",
  setName: "USER_SET_NAME",
  setAge: "USER_SET_AGE",
  setEmailAddress: "USER_SET_EMAIL_ADDRESS",
};

export function userReducer(state: any, action: any) {
  switch(action.type) {
    case userActionType.logOut:
      return {...state, authToken: ""};
    case userActionType.setAuthToken:
      return {...state, authToken: action.value};
    case userActionType.setName:
      return {...state, name: action.value};
    case userActionType.setAge:
      return {...state, age: action.value};
    case userActionType.setEmailAddress:
      return {...state, emailAddress: action.value};
    default:
      return state;
  }
}