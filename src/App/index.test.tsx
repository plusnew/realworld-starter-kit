import { configure } from 'enzyme';
import enzymeAdapterPlusnew, { shallow } from 'enzyme-adapter-plusnew';
import plusnew from 'plusnew';
import App from '.';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('<App />', () => {
  it('should contain <Header /', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(<Header />)).toBe(true);
  });

  it('should contain <Content /', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(<Content />)).toBe(true);
  });

  it('should contain <Footer /', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(<Footer />)).toBe(true);
  });
});
