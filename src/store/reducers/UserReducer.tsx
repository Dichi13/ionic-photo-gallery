export const user = {
  name: "",
  age: 0,
  emailAddress: "",
};

export const userActionType = {
  setName: "USER_SET_NAME",
  setAge: "USER_SET_AGE",
  setEmailAddress: "USER_SET_EMAIL_ADDRESS",
};

export function userReducer(state: any, action: any) {
  switch(action.type) {
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