import plusnew, { component } from '@plusnew/core';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

export default component(
  'App',
  () =>
    <>
      <Header />
      <Content />
      <Footer />
    </>,
);
