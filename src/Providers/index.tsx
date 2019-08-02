import plusnew, { component, Props } from 'plusnew';
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
