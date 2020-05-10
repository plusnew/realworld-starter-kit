import plusnew from "@plusnew/core";
import enzymeAdapterPlusnew, { mount } from "@plusnew/enzyme-adapter";
import { BrowserProvider } from "@plusnew/router";
import { configure } from "enzyme";
import session from "shared/contexts/session";
import Providers from ".";

configure({ adapter: new enzymeAdapterPlusnew() });

describe("<Providers />", () => {
  it("should contain <Header /", () => {
    const wrapper = mount(
      <Providers>
        <div />
      </Providers>
    );

    expect(wrapper.find(BrowserProvider).exists()).toBe(true);
    expect(wrapper.find(session.Provider).exists()).toBe(true);
    expect(wrapper.find(BrowserProvider).find("div").exists()).toBe(true);

    wrapper.unmount();
  });
});
