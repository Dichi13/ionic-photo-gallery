export default function hasLoggedIn(stateObject: any): boolean {
  return stateObject.user.authToken !== "";
}