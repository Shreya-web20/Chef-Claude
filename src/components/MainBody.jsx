export default function MainBody() {

    const ingredients = ["Chicken", "Tomatoes", "Oregano", "Jalapenos"]
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))


    function handleSubmit(event){
        event.preventDefault()
        console.log("Form submitted")
    }

    return(
        <main>
            <form onSubmit={handleSubmit} className="add-ingr-form">
                <input
                    type="text"
                    label="add ingredients"
                    placeholder="e.g. oregano"
                    name="ingredients"
                />
                <button>+ Add ingredients</button>
            </form>
            <ul>
                {ingredientsListItems}
            </ul>
        </main>
    )
}