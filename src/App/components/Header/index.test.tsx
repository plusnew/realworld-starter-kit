import { configure } from 'enzyme';
import enzymeAdapterPlusnew, { mount } from 'enzyme-adapter-plusnew';
import plusnew from 'plusnew';
import Header from '.';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('<Header />', () => {
  it('should contain <Header /', () => {
    const wrapper = mount(<Header />);

    expect(wrapper.find('nav').exists()).toBe(true);

    wrapper.unmount();
  });
});
