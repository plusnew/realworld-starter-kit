import { configure } from "enzyme";
import enzymeAdapterPlusnew, { mount } from "@plusnew/enzyme-adapter";
import plusnew from "@plusnew/core";
import Header from ".";

configure({ adapter: new enzymeAdapterPlusnew() });

describe("<Header />", () => {
  it("should contain <Header /", () => {
    const wrapper = mount(<Header />);

    expect(wrapper.find("nav").exists()).toBe(true);

    wrapper.unmount();
  });
});
