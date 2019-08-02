import { StaticProvider } from '@plusnew/router';
import { configure } from 'enzyme';
import enzymeAdapterPlusnew, { mount, getAwaitAllHandle } from '@plusnew/enzyme-adapter';
import plusnew from 'plusnew';
import Homepage from '.';
import HomepageContent from './components/HomepageContent';
import Loader from 'shared/components/Loader';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('<Content />', () => {
  it('should contain <HomePage /', async () => {
    const awaitAllHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="" onchange={() => null}>
        <Homepage.Component />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitAllHandle.callback,
        },
      },
    );

    expect(wrapper.contains(<Loader />));

    expect(wrapper.containsMatchingElement(<Loader />)).toBe(true);
    expect(wrapper.containsMatchingElement(<HomepageContent />)).toBe(false);

    await awaitAllHandle.done();

    expect(wrapper.containsMatchingElement(<Loader />)).toBe(false);
    expect(wrapper.containsMatchingElement(<HomepageContent />)).toBe(true);

    wrapper.unmount();
  });
});
