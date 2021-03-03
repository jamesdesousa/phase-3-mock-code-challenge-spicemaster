const spiceBlend = document.querySelector('#spice-blend-detail')
const spiceImage = document.querySelector('.detail-image')
const spiceTitle = document.querySelector('.title')
const ingredientsUl = document.querySelector('.ingredients-list')
const titleForm = document.querySelector('#update-form')
const ingredientForm = document.querySelector('#ingredient-form')


function getPumpkinSpice() {
    fetch('http://localhost:3000/spiceblends/1')
        .then(response => response.json())
        .then(pumpkinSpice => {
            renderSpice(pumpkinSpice)
        })
    }


function renderSpice(spice) {
    spiceImage.src = spice.image 
    spiceImage.dataset.id = spice.id 
    spiceTitle.innerText = spice.title
    titleForm.dataset.id = spice.id
    ingredientForm.dataset.id = spice.id
    console.log(spice)
    
     spice.ingredients.forEach( (ingredient) => {
        const li = document.createElement('li')
        li.innerText = ingredient.name 
        ingredientsUl.append(li)
    })

//form event - add dataset
titleForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/spiceblends/1', {
        method: 'PATCH', // or 'PUT'
        headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
         },
            body: JSON.stringify({
                title: e.target[0].value,
            }),
        })
        .then(response => response.json())
        .then(newTitle => {
            spiceTitle.innerText = newTitle.title;
        })
        .catch((error) => {
        console.error('Error:', error);
        })
    })
}

function ingredientFormSubmit() { 
    ingredientForm.addEventListener('submit', (e) => {    
        e.preventDefault()
        fetch('http://localhost:3000/spiceblends/1', {
            method: 'PATCH', // or 'PUT'
            headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json'
             },
                body: JSON.stringify({
                    ingredients: e.target[0].value,
                }),
            })
            .then(response => response.json())
            .then(newIngredient => {
                const li = document.createElement('li')
                li.innerText = newIngredient.ingredients 
                ingredientsUl.append(li)
                

            })
            .catch((error) => {
            console.error('Error:', error);
            })
            e.target.reset()
        })
}



ingredientFormSubmit()
getPumpkinSpice()