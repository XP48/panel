const heure = document.querySelector('.heure')
const date = document.querySelector('.date')

var ajd, heures, minutes, secondes, year, moisliste, mois, journumero, jourliste, journom;

ajd = new Date();
year = ajd.getFullYear()
moisliste = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
moisnumero = ajd.getMonth();
mois = moisliste[moisnumero];
journumero = ajd.getDate();
jourliste = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
journom = jourliste[ajd.getDay()];

twochiffres = function(element){
        if(element < 10) {
            return element = "0" + element;
        }
        else {
            return element;
        }
    }

var DisplayHeure = function() {

    var ajd, heures, minutes, secondes, year, moisliste, mois, journumero, jourliste, journom;

ajd = new Date();
year = ajd.getFullYear()
moisliste = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
moisnumero = ajd.getMonth();
mois = moisliste[moisnumero];
journumero = ajd.getDate();
jourliste = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
journom = jourliste[ajd.getDay()];

twochiffres = function(element){
        if(element < 10) {
            return element = "0" + element;
        }
        else {
            return element;
        }
    }
    
    heures = twochiffres(ajd.getHours());
    minutes = twochiffres(ajd.getMinutes());
    secondes = twochiffres(ajd.getSeconds());

    heure.textContent = heures + ":" + minutes + ":" + secondes;
    date.textContent = journom + " " + journumero + " " + mois + " " + year;

    setTimeout(DisplayHeure, 1000);
}
DisplayHeure();

const temps = document.querySelector('.temps')
const temperature = document.querySelector('.temperature')
const icone = document.querySelector('.logo-meteo')
const heureprev = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const imgH = document.querySelectorAll('.img-h');
const tokenMeteo = '13b834e00ac1db7eaa07e0aae352b895';
let resultatsAPI;

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, veuillez l'activer pour que la météo fonctionne !`)
    })
}

function AppelAPI(long, lat) {
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${tokenMeteo}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);

        resultatsAPI = data

        temperature.textContent = `${Math.round(resultatsAPI.current.temp)}°C`

        let heureActuelle = new Date().getHours();
        
        for(let i = 0; i < heureprev.length; i++) {

            let heureIncr = heureActuelle + i * 3;

            if(heureIncr >= 24) {
                heureprev[i].textContent = `${heureIncr - 24} h`;
            // } else if(heureIncr === 24) {
            //     heureprev[i].textContent == "00h"
            } else {
            heureprev[i].textContent = `${heureIncr} h`;
            }
        }

        for(let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].textContent = `${Math.round(resultatsAPI.hourly[j * 3].temp)}°C`;
            imgH[j].src = `./logo/${resultatsAPI.hourly[j * 3].weather[0].icon}.svg`;
        }

        icone.src = `./logo/${resultatsAPI.current.weather[0].icon}.svg`
    })
    
}

const titreG = document.querySelector('.titre-g')
const descriptionG = document.querySelector('.description-g')
const sourceG = document.querySelector('.source-g')
const illustrationG = document.querySelector('.illustration-g')

const titreD = document.querySelector('.titre-d')
const descriptionD = document.querySelector('.description-d')
const sourceD = document.querySelector('.source-d')
const illustrationD = document.querySelector('.illustration-d')

function NewsAPI() {
    // console.log(`${year}-${twochiffres(moisnumero+1)}-${twochiffres(journumero)}`)
    const tokenNewsG = 'd5b1dd1e98e2315e92b84bafa05e3a29';
    const tokenNewsD = 'ecd4866adf4e26556b6832a8a453a58f';
    fetch(`https://gnews.io/api/v4/top-headlines?token=${tokenNewsG}&lang=fr`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);

        var elem = 0
        function load() {
            if(elem !== 10){
                for(let pas = 0; pas < 1; pas++) {
                    if(!data.articles[elem].image){
                        elem++
                        pas--
                    }
                }
                for(let pas = 0; pas < 1; pas++) {
                    if(data.articles[elem].source.name.includes(".ma")){
                        elem ++
                    }
                }
                titreG.textContent = data.articles[elem].title
                descriptionG.textContent = data.articles[elem].description
                sourceG.textContent = "source : " + data.articles[elem].source.name
                illustrationG.src = `${data.articles[elem].image}`
                elem++
            }
            else {
            location.reload()
            }
        }
        // console.log(data.articles[elem+1].source.name.includes(".ma"))
        load()
        setInterval(load, 90000);
        

    })
    fetch(`https://gnews.io/api/v4/top-headlines?token=${tokenNewsD}&lang=en`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);

        var elem = 0
        function load() {
            if(elem !== 10){
                for(let pas = 0; pas < 1; pas++) {
                    if(!data.articles[elem].image){
                        elem++
                        pas--
                    }
                }
                for(let pas = 0; pas < 1; pas++) {
                    if(data.articles[elem].source.name.includes(".ma")){
                        elem ++
                    }
                }
                titreD.textContent = data.articles[elem].title
                descriptionD.textContent = data.articles[elem].description
                sourceD.textContent = "source : " + data.articles[elem].source.name
                illustrationD.src = `${data.articles[elem].image}`
                elem++
                
            }
            else {
            location.reload()
            }
        }
        load()
        setInterval(load, 90000); 

    })


}

NewsAPI()

