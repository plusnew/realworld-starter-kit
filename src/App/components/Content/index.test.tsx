import { StaticProvider } from "@plusnew/router";
import { configure } from "enzyme";
import enzymeAdapterPlusnew, { mount } from "@plusnew/enzyme-adapter";
import plusnew from "@plusnew/core";
import Content from ".";
import HomePage from "./components/Homepage";
// import Article from './components/Article';
// import Settings from './components/Settings';

configure({ adapter: new enzymeAdapterPlusnew() });

describe("<Content />", () => {
  it("should contain <HomePage /", () => {
    const wrapper = mount(
      <StaticProvider url="" onchange={() => null}>
        <Content />
      </StaticProvider>
    );

    expect(wrapper.containsMatchingElement(<HomePage.Component />)).toBe(true);

    wrapper.unmount();
  });

  it("should containt error when route is not defined", () => {
    const wrapper = mount(
      <StaticProvider url="invalidRoute" onchange={() => null}>
        <Content />
      </StaticProvider>
    );

    expect(wrapper.contains(<div>This route does not exist</div>)).toBe(true);

    wrapper.unmount();
  });

  it("should containt error when route is weird", () => {
    const wrapper = mount(
      <StaticProvider url="/;invalid=parameter" onchange={() => null}>
        <Content />
      </StaticProvider>
    );

    expect(wrapper.contains(<div>This route has invalid parameters</div>)).toBe(
      true
    );

    wrapper.unmount();
  });
});
