import { createRoute } from '@plusnew/router';
import plusnew, { component, Props } from 'plusnew';

type props = {
  parameter: {},
  props: {},
};

const Component =  component(
  __dirname,
  (_Props: Props<props>) =>
    <div />,
);

export default createRoute(
  [''],
  {},
  Component,
);
