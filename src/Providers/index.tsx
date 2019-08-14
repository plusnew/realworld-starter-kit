import plusnew, { component, Props } from '@plusnew/core';
import { BrowserProvider } from '@plusnew/router';

type props = {
  children: any;
};

export default component(
  __dirname,
  (Props: Props<props>) =>
    <BrowserProvider>
      <Props>{props => props.children}</Props>
    </BrowserProvider>,
);
