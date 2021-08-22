import { shallow, ShallowWrapper } from "enzyme";
import Movies from "../components/Movies/Movies";
import SearchInput from "../components/SearchInput";
import Index from '../pages/index'

describe("With Enzyme", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Index/>).dive();
  })
  
  it("Rendering index components", () => {
    expect(wrapper.find(SearchInput)).toHaveLength(1);
    expect(wrapper.find(Movies)).toHaveLength(1);
  });
});