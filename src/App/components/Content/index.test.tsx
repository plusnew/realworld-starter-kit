import { StaticProvider } from '@plusnew/router';
import { configure } from 'enzyme';
import enzymeAdapterPlusnew, { mount } from 'enzyme-adapter-plusnew';
import plusnew from 'plusnew';
import Content from '.';
import HomePage from './components/Homepage';
// import Article from './components/Article';
// import Settings from './components/Settings';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('<Content />', () => {
  it('should contain <HomePage /', () => {
    const wrapper = mount(
      <StaticProvider url="" onchange={() => null}>
        <Content />
      </StaticProvider>,
    );

    expect(wrapper.containsMatchingElement(<HomePage.Component />)).toBe(true);

    wrapper.unmount();
  });
});
