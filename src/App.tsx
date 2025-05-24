import "./styles.css";
import PostsComponent from "./components/PostsComponent";
import ReceipesComponent from "./components/ReceipesComponent";

export default function App() {
  return (
    <div className="App">
      <ReceipesComponent />
      <PostsComponent />
    </div>
  );
}
