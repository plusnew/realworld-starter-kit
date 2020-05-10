import plusnew, { component, Props } from "@plusnew/core";
import { BrowserProvider } from "@plusnew/router";
import Session from "./components/Session";

type props = {
  children: any;
};

export default component(__dirname, (Props: Props<props>) => (
  <BrowserProvider>
    <Session>
      <Props>{(props) => props.children}</Props>
    </Session>
  </BrowserProvider>
));
