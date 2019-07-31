import plusnew, { component } from 'plusnew';
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
