
let content = document.querySelector('.mahery')
content.innerHTML = 0
let button = document.querySelector('.add')

button.addEventListener('click', addone)
const addone = () => {
    console.log('there is a click')
    // content.innerHTML = content.innerHTML + 1
}