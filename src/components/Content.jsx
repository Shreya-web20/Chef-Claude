import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import {getRecipeFromIngredients} from "../ai"


export default function Content() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    const[loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if(recipe !== "" && recipeSection.current !== null){
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

     async function getRecipe(){
            setLoading(true)
            const recipeMarkdown = await getRecipeFromIngredients(ingredients)
            setRecipe(recipeMarkdown)
            setLoading(false)
    }

    function addIngredients(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }


    return(
        <main>
            <form action={addIngredients} className="add-ingr-form">
                <input
                    type="text"
                    label="add ingredients"
                    placeholder="e.g. oregano"
                    name="ingredient"
                />
                <button>+ Add ingredients</button>
            </form>

            {ingredients.length === 0 && (
            <div className="empty-state">
                <h2>👩‍🍳 Welcome to Chef Claude</h2>
                <p>Add ingredients to get delicious recipes instantly!</p>
                <p>👉 Try adding <b>chicken</b>, <b>pasta</b>, or <b>eggs</b></p>
            </div>
        )}


            {ingredients.length > 0 && 
            <IngredientsList 
            ref = {recipeSection}
            ingredients={ingredients}
            getRecipe={getRecipe} />}

            {loading && (
                <p className="loading-text">Wait a moment, cooking your recipe...</p>
            )}


            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}