const checkboxList = document.querySelectorAll('.custom-checkbox')
const inputfields = document.querySelectorAll('.textvalue')
const errorlabel = document.querySelector('.errorbox')
const progressvalue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.lighttext')

const allQuotes = [
    'Raise the bar by completing 3 goals everyday!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all your goals for the day, time to chill!',
  ]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
    name: '',
    completed: false,
  },
    second: {
    name: '',
    completed: false,
  },
    third: {
    name: '',
    completed: false,
  },
}

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressvalue.style.width = `${(completedGoalsCount / inputfields.length) * 100}%`
progressvalue.firstElementChild.innerText = `${completedGoalsCount}/${inputfields.length} completed`
progressLabel.innerText = allQuotes[completedGoalsCount]

checkboxList.forEach((checkbox)=>{

    checkbox.addEventListener('click',(e) => {
        const inputfieldvalue = [...inputfields].every((field)=>{ return field.value})
        
        if(inputfieldvalue){
            checkbox.parentElement.classList.toggle('completed');
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressvalue.style.width = `${(completedGoalsCount / inputfields.length) * 100}%`
            progressvalue.firstElementChild.innerText = `${completedGoalsCount}/${inputfields.length} completed`
            progressLabel.innerText = allQuotes[completedGoalsCount]

            localStorage.setItem('allGoals', JSON.stringify(allGoals));

        }
        else{

            errorlabel.classList.add('addlabel')
            
        }
        
        
    })

})


inputfields.forEach((input)=>{

   
    input.value = allGoals[input.id].name

    if (allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
      }
   
    input.addEventListener('focus',(e)=>{
        
        errorlabel.classList.remove('addlabel');
       
    })

    input.addEventListener('input', (e) => {
        if (allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
          }

        allGoals[input.id].name = input.value
            
          
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    })
    
   

})



