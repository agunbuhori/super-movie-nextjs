import { shallow, ShallowWrapper } from "enzyme";
import MovieItem from "../components/Movies/MovieItem";
import Movies from "../components/Movies/Movies";
import SearchInput from "../components/SearchInput";
import { useFetch } from "../config/http";
import { MovieResponse } from "../interfaces/Movie";
import Index from '../pages/index'

describe("Rendering testing", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Index/>).dive();
  })
  
  it("Rendering index components", () => {
    expect(wrapper.find(SearchInput)).toHaveLength(1);
    expect(wrapper.find(Movies)).toHaveLength(1);
  });

  it("Fetching data", () => {
    useFetch('/', {params: {s: "Batman", page: 1}}, (response: MovieResponse) => {
      if (response.Response === 'True') {
        expect(response.Search.map((movie, index) => (
          <MovieItem {...movie} key={index} showImage={() => {}}/>
        ))).toMatchSnapshot();
      }
    });
  });
});
