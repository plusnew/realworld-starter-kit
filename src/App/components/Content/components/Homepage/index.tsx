import { createRoute } from '@plusnew/router';
import plusnew, { component, Props, Async } from '@plusnew/core';
import Loader from 'shared/components/Loader';

type props = {
  parameter: {},
  props: {},
};

const Component =  component(
  __dirname,
  (_Props: Props<props>) =>
    <Async
      pendingIndicator={<Loader />}
    >{
      () =>
        // tslint:disable-next-line: space-in-parens
        import(/* webpackChunkName: "site/homepage" */ './components/HomepageContent')
          .then(module => <module.default />)
    }</Async>,
);

export default createRoute(
  '',
  {},
  Component,
);
