import { createRoute, serializer } from "@plusnew/router";
import plusnew, { component, Async } from "@plusnew/core";
import Loader from "shared/components/Loader";

export default createRoute(
  "/",
  {
    offset: [serializer.number(), serializer.undefined()],
    limit: [serializer.number(), serializer.undefined()],
    tag: [serializer.string(), serializer.undefined()],
  } as const,
  component(__dirname, (Props) => (
    <Async
      pendingIndicator={<Loader />}
      constructor={() =>
        import(
          /* webpackChunkName: "site/homepage" */ "./components/HomepageContent"
        )
      }
    >
      {(module) => (
        <Props>
          {(props) => <module.default parameter={props.parameter} />}
        </Props>
      )}
    </Async>
  ))
);
