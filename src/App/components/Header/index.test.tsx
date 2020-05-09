import { configure } from "enzyme";
import enzymeAdapterPlusnew, { mount } from "@plusnew/enzyme-adapter";
import plusnew from "@plusnew/core";
import Header from ".";
import { StaticProvider } from "@plusnew/router";

configure({ adapter: new enzymeAdapterPlusnew() });

describe("<Header />", () => {
  it("should contain <Header /", () => {
    const wrapper = mount(
      <StaticProvider url="/" onchange={() => null}>
        <Header />
      </StaticProvider>
    );

    expect(wrapper.find("nav").exists()).toBe(true);

    wrapper.unmount();
  });
});
