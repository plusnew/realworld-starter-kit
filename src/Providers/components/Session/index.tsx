import plusnew, { component, Props, store } from "@plusnew/core";
import sessionContext, {
  sessionState,
  sessionAction,
} from "shared/contexts/session";
import { getUser } from "shared/api/request";

type props = {
  children: any;
};

export default component(
  __dirname,
  (Props: Props<props>, componentInstance) => {
    const sessionStore = store<sessionState, sessionAction>(
      { isInitialised: false, isLoggedIn: false },
      (_previousState, action) => {
        if (action.type === "LOG_IN") {
          return {
            isInitialised: true,
            isLoggedIn: true,
            user: action.payload,
          };
        }
        if (action.type === "LOG_OUT") {
          return {
            isInitialised: true,
            isLoggedIn: false,
          };
        }
        throw new Error("No such action");
      }
    );

    componentInstance.registerLifecycleHook("componentDidMount", () => {
      getUser()
        .catch(() => {
          sessionStore.dispatch({
            type: "LOG_OUT",
          });
        })
        .then((result) => {
          if (result) {
            sessionStore.dispatch({
              type: "LOG_IN",
              payload: result.user,
            });
          }
        });
    });

    return (
      <sessionStore.Observer>
        {(sessionState) => (
          <sessionContext.Provider
            state={sessionState}
            dispatch={sessionStore.dispatch}
          >
            <Props>{(props) => props.children}</Props>
          </sessionContext.Provider>
        )}
      </sessionStore.Observer>
    );
  }
);
