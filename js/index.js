let allMonsters = []

document.addEventListener("DOMContentLoaded", () => {
    console.log('The DOM has loaded')

fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(monsterData => {
        monsterData.forEach(monster => {        
        allMonsters.push(monster)           
    })
    allMonsters.slice(0, 50).forEach(monster => {
    renderMonsters(monster)
    })
    document.querySelector('#forward').addEventListener('click', (e) => allMonsters.slice(51, 101).forEach(monster => {renderMonsters(monster)}))
    })

    
let monsterForm = document.querySelector("#monster-form")
   monsterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(monsterForm.children[0].value)
    const monsterObject = {
        "name": monsterForm.children[0].value,
        "age":  monsterForm.children[1].value,
        "description": monsterForm.children[2].value
    }
fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
         "Content-Type": "application/json",
         Accept: "application/json"
        },
        body:JSON.stringify(monsterObject)
    })
        .then(res => res.json())
        .then(monster => console.log(monster))
   } )
    
function renderMonsters(monster) {
    let monsterInfo = document.createElement('ul')
        
    let monsterDetails = document.createElement('li')
        monsterDetails.innerHTML = `
        <h2>${monster.name}</h2>
        <h2>${monster.age}</h2>
        <h2>${monster.description}</h2>
        `
    monsterInfo.append(monsterDetails)
    
document.getElementById('monster-container').append(monsterInfo)
}

})

