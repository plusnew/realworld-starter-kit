import plusnew, { component } from "@plusnew/core";
import { Invalid, NotFound } from "@plusnew/router";
import articleeRoute from "./components/Article";
import homepageRoute from "./components/Homepage";
import InvalidContent from "./components/InvalidContent";
import NotFoundContent from "./components/NotFoundContent";

export default component(__dirname, () => (
  <>
    <homepageRoute.Component />
    <articleeRoute.Component />

    <NotFound>
      <NotFoundContent />
    </NotFound>

    <Invalid>
      <InvalidContent />
    </Invalid>
  </>
));
