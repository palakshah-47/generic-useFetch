import { useFetch } from "../hooks/useFetch";
type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostsComponent() {
  console.log("inside posts");
  const { data, loading, error } = useFetch<{ posts: Post[] }>(
    "https://dummyjson.com/posts"
  );
  return (
    <div>
      <label>Posts</label>
      {data?.posts?.map((post: Post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
