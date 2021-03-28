const form = document.querySelector('#form')
let result = document.getElementById('result')

form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault()  


  const gender = getSelectValue('gender')
  const age = getInputNumberValue('age')
  const weight = getInputNumberValue('weight')
  const height = getInputNumberValue('height')
  const activityLevel = getSelectValue('activity_level')
  
  if(age == '' || weight == '' || height == '' ) {
    result.innerHTML = ``
    result.innerHTML = `Não foi possível mostrar os resultados. 
      Por favor, não deixe nada em branco. 
    `
  }else{
    
    if(gender === 'valueInvalid' || activityLevel === 'valueInvalid') {
      result.innerHTML = ''
      result.innerHTML = `Por favor, selecione o seu sexo 
        e seu nível de atividade física.`
    }else{

      result.innerHTML = ``

      const basalMetabolicRate = Math.round( // const taxaMetabolicaBasal
        gender === 'female'
        ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
        : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
      )

      const maintenance = Math.round((basalMetabolicRate * Number(activityLevel)))
      const loseWeight = maintenance - 450
      const gainWeight = maintenance + 450
    
      
      const layout = `
        <h2>Aqui está o resultado:</h2>
    
        <div class="result-content">
          <ul>
            <li>
              Seu metabolismo basal é de <strong>${basalMetabolicRate.toFixed(2)}</strong>.
            </li>
            <li>
              Para manter o seu peso você precisa consumir em média <strong>${maintenance.toFixed(2)}</strong>.
            </li>
            <li>
              Para perder peso você precisa consumir em média <strong>${loseWeight.toFixed(2)}</strong>.
            </li>
            <li>
              Para ganhar peso você precisa consumir em média <strong>${gainWeight.toFixed(2)}</strong>.
            </li>
          </ul>
        </div>
      `
      
      result.innerHTML = layout 
    }
  }
}

function getSelectValue(id) {
  const select = document.getElementById(id)
  return select.options[select.selectedIndex].value
}

function getInputNumberValue(id) {
  return Number(document.getElementById(id).value)
}
