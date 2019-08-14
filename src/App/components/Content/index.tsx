import plusnew, { component } from '@plusnew/core';
import Homepage from './components/Homepage';
import { NotFound, Invalid } from '@plusnew/router';
import NotFoundContent from './components/NotFoundContent';
import InvalidContent from './components/InvalidContent';

export default component(
  __dirname,
  () =>
    <>
      <Homepage.Component />

      <NotFound>
        <NotFoundContent />
      </NotFound>

      <Invalid>
        <InvalidContent />
      </Invalid>
    </>,
);
