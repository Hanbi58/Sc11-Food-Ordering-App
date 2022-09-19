import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [dummyMeals, setDummyMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  useEffect(() => {
    getMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  async function getMeals() {
    const res = await fetch(
      "https://react-http-27f1b-default-rtdb.firebaseio.com/meals.json"
    );
    if (!res.ok) {
      throw new Error("Something Went Wrong!");
    }
    const data = await res.json();

    const mealData = [];
    for (let key in data) {
      mealData.push({ id: key, ...data[key] });
    }
    setDummyMeals(mealData);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <section className={classes.mealIsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError.length > 0) {
    return (
      <section className={classes.mealIsLoading}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = dummyMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
