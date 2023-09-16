
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://project1-75ffe-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
    // appendItemToShoppingList(inputValue)
})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let shoppingListArray = Object.entries(snapshot.val())
        clearShoppingListEL()

        for(let i=0; i<shoppingListArray.length; i++){
            let currentList = shoppingListArray[i]
            let currentItemID = currentList[0]
            let currentItemValue = currentList[1]

            appendItemToShoppingList(currentList)
        }
    }
    else{
        shoppingListEl.innerHTML = `<h2 id="c">No items here... yet</h2>`
    }
})

function clearShoppingListEL(){
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemToShoppingList(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick",  function(){
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}
