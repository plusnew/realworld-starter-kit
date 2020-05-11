import plusnew, { Async, component } from "@plusnew/core";
import { serializer } from "@plusnew/router";
import homepageRoute from "App/components/Content/components/Homepage";
import Loader from "shared/components/Loader";

export default homepageRoute.createChildRoute(
  "article",
  {
    slug: [serializer.string()],
  } as const,
  component(__dirname, (Props) => (
    <Async
      pendingIndicator={<Loader />}
      constructor={() =>
        import(
          /* webpackChunkName: "site/article" */ "./components/ArticleContent"
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
