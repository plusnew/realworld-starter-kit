import { createRoute } from "@plusnew/router";
import plusnew, { component, Async } from "@plusnew/core";
import Loader from "shared/components/Loader";

export default createRoute(
  "/",
  {} as const,
  component(__dirname, () => (
    <Async
      pendingIndicator={<Loader />}
      constructor={() =>
        import(
          /* webpackChunkName: "site/homepage" */ "./components/HomepageContent"
        )
      }
    >
      {(module) => <module.default />}
    </Async>
  ))
);
