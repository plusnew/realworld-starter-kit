import { configure } from "enzyme";
import enzymeAdapterPlusnew, { mount } from "@plusnew/enzyme-adapter";
import plusnew from "@plusnew/core";
import Footer from ".";

configure({ adapter: new enzymeAdapterPlusnew() });

describe("<Footer />", () => {
  it("should contain <Header /", () => {
    const wrapper = mount(<Footer />);

    expect(wrapper.find("footer").exists()).toBe(true);

    wrapper.unmount();
  });
});
