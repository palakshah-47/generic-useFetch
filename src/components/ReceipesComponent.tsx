import { useFetch } from "../hooks/useFetch";
type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
};

export default function ReciepesComponent() {
  const { data, loading, error, refetch } = useFetch<{ recipes: Recipe[] }>(
    "https://dummyjson.com/recipes"
  );

  console.log("inside reciepes");
  return (
    <div>
      <label>Receipes</label>
      {data?.recipes.map((reciepe: Recipe) => (
        <div key={reciepe.id}>{reciepe.name}</div>
      ))}
    </div>
  );
}
