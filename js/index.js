const form = document.querySelector('form')
const input = document.querySelector('#inp')
const output = document.querySelector('#output')

let imgDone, imgEdit, imgTrash

imgDone = `
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
<path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 
L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"/>
</svg>
`

imgEdit = `
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688
        C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625
        L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 
        L 5 17.828125 L 15.707031 7.1210938 z"/>
</svg>
`

imgTrash = `
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
<path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 
C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 
L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 
L 7.875 20 L 6.125 5 z"/>
</svg>
`


let tasks = []

const addToDo = () => {
    if (input.value == '' || input.value.trim().length == 0) {
        alert('Добавьте задачу!')
    } else {
        const todo = {
            id: tasks[tasks.length - 1] ?.id + 1 || 1,
            // id: tasks.length + 1,
            name: input.value,
            completed: false,
        }

        tasks.push(todo)
        input.value = ''
        addToLocalStorage()
        // const addToLocalStorage = () => {
        //     renderTodos()
        //     localStorage.setItem('tasks', JSON.stringify(tasks))
        // }
    }
}

const renderTodos = () => {
    output.innerHTML = ''

    tasks.forEach(el => {
        // console.log(el);
        const card = document.createElement('div')
        const title = document.createElement('h3')
        const btnsWrapper = document.createElement('div')
        const done = document.createElement('button')
        const edit = document.createElement('button')
        const trash = document.createElement('button')

        title.textContent = el.name
        done.innerHTML = imgDone
        edit.innerHTML = imgEdit
        trash.innerHTML = imgTrash

        form.addEventListener("submit", (e) => {   //Этот прослушиватель событий позволяет нам подключить 
            e.preventDefault();                    //функцию обратного вызова, которая срабатывает после отправки формы
        });

        done.addEventListener('click', () => {
            el.completed = !el.completed //true
            // console.log(el);
            addToLocalStorage()
        })

        if (el.completed) {
            card.classList.add('active')
        } else (
            card.classList.add('notactive')
        )

        edit.addEventListener('click', () => {
            const userAnswer = confirm('Вы уверены?')
            if (userAnswer) {
                const newTaskName = prompt('New Task')
                el.name = newTaskName
                addToLocalStorage()
            }
        })

        trash.addEventListener('click', () => {
            tasks = tasks.filter(item => item.id != el.id) //true
            addToLocalStorage()
        })

        btnsWrapper.append(done, edit, trash)
        card.append(title, btnsWrapper)
        output.append(card)
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    addToDo()
})

const addToLocalStorage = () => {
    renderTodos()
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('tasks'))
    if (data != null) {
        tasks = data
        renderTodos
    }
}

addFromLocalStorage()

