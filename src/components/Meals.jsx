import { useEffect, useState } from "react";
import MealItem from "./MealItem.jsx";

// Recordatorio. No puedo hacer async una funcion componente. React no me lo permite.
export default function Meals() {
  const [loadedMealsState, setLoadedMealsState] = useState([]);

  // Sin el useEffect, se crea un bucle infinito por el uso de useState. Porque luego de la funcion asincrona, la llamo.
  // Entonces, ahora con el useEffect, solo se ejecutara una vez. No le inclui dependencias porque la funcion interna no incluye
  // estados ni props externas...
  useEffect(() => {
    async function fetchMeals() {
      // Cuando hago fetch para un GET, el GET esta por defecto, no es necesario especificarlo con method.
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        // ...
      }
      // Aqui tambien uso el await porque el response produce una promesa, como el fetch.
      // Lo almaceno en una constante "meals", como lo haria con resData, porque finalmente son las comidas las que estoy extrayendo del back.
      const meals = await response.json(); // Debo usar .json en el objeto response porque en ese formato el back me envia la data.
      setLoadedMealsState(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMealsState.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
