import { configure } from 'enzyme';
import enzymeAdapterPlusnew, { mount } from 'enzyme-adapter-plusnew';
import plusnew from 'plusnew';
import Footer from '.';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('<Footer />', () => {
  it('should contain <Header /', () => {
    const wrapper = mount(<Footer />);

    expect(wrapper.find('footer').exists()).toBe(true);
  });
});
