import ReactGA from "react-ga";
const trackingID: string = process.env.REACT_APP_GA_TRACKING_ID!;
ReactGA.initialize(trackingID);
export default ReactGA;