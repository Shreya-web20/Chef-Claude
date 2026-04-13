function formatRecipe(meal){

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`- ${meal[`strIngredient${i}`]}`);
    }
  }

  const steps = meal.strInstructions
    .split(".")
    .filter(s => s.trim() !== "")
    .map(s => `- ${s.trim()}`)
    .join("\n");

  return `
🍽️ Based on the ingredients provided, you can try **${meal.strMeal}** recipe.

![recipe image](${meal.strMealThumb})

📍 Category: ${meal.strCategory}

🌍 Cuisine: ${meal.strArea}

## 🧾 Ingredients
${ingredients.join("\n")}

📝 Instructions:
${steps}

Enjoy Your Meal!
  `;
}


export async function getRecipeFromIngredients(ingredientsArr) {
  if (!ingredientsArr || ingredientsArr.length === 0) {
    return "No ingredients added bro 😅";
  }

  // 🔥 handle both cases (array or single string)
  let query = "";

  if (ingredientsArr.length === 1) {
    query = ingredientsArr[0].toLowerCase().split(" ").pop();
  } else {
    query = ingredientsArr[0]; // take first ingredient
  }

  console.log("FINAL QUERY:", query); // 👈 IMPORTANT

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const data = await response.json();

    if (!data.meals) {
      return `No recipe found for "${query}" 😅 Try pasta, chicken, egg`;
    }

    const mealId = data.meals[0].idMeal;

    const detailRes = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );

    const detailData = await detailRes.json();
    const meal = detailData.meals[0];
    return formatRecipe(meal);

  } catch (error) {
    return "Something went wrong 😢";
  }
}