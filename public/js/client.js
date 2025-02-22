//fetch api, then means when the data is fetched or the iutput is obtained then execute this

console.log('Client side javascript file is loaded!')



document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const seachedLocation = document.querySelector('input').value
   
    const loc = document.querySelector('#loc')
    const forecast = document.querySelector('#forecast')
    
    loc.textContent = "loading..."

    fetch('/weather?address=' + seachedLocation).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                loc.textContent = data.error
                //console.log(data.error)
            } else {
                loc.textContent = data.location
                forecast.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
})

//changed