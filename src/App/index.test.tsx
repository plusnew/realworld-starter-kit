import enzymeAdapterPlusnew, { mount } from 'enzyme-adapter-plusnew';
import { configure } from 'enzyme';
import plusnew from 'plusnew';
import App from '.';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('<App />', () => {
  it('should contain <Header /', () => {
    const wrapper = mount(<App />);

    expect(wrapper.containsMatchingElement(<Header />)).toBe(true);
  });

  it('should contain <Content /', () => {
    const wrapper = mount(<App />);

    expect(wrapper.containsMatchingElement(<Content />)).toBe(true);
  });

  it('should contain <Footer /', () => {
    const wrapper = mount(<App />);

    expect(wrapper.containsMatchingElement(<Footer />)).toBe(true);
  });
});
