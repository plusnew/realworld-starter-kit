import { context } from "@plusnew/core";
import type { User } from "shared/interfaces/swagger";

/**
 States
*/

// Is used for undetermined session state
type sessionUnknown = {
  isInitialised: false;
  isLoggedIn: false;
};

// Valid session
type sessionLoggedIn = {
  isInitialised: true;
  isLoggedIn: true;
  user: User;
};

// Session is not valid anymore
type sessionLoggedOut = {
  isInitialised: true;
  isLoggedIn: false;
};

export type sessionState = sessionUnknown | sessionLoggedIn | sessionLoggedOut;

/**
 Actions
*/
type sessionLogInAction = {
  type: "LOG_IN";
  payload: User;
};

type sessionLogOutAction = {
  type: "LOG_OUT";
};

export type sessionAction = sessionLogInAction | sessionLogOutAction;

export default context<sessionState, sessionAction>();
