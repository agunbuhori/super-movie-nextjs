import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Movies from "../components/Movies/Movies";
import SearchInput from "../components/SearchInput";
import { RootState } from "../store";

export default function App() {
  const movie = useSelector((state: RootState) => state.movie, shallowEqual);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <SearchInput/>
      <Movies/>
    </div>
  )
}