const languageScreen = document.getElementById("languageScreen")
const whatsappNumber = "992000000000"

function setLanguage(lang){
  document.documentElement.lang = lang
  document.querySelectorAll("[data-ru]").forEach(el=>{
    el.innerHTML = el.dataset[lang]
  })
  localStorage.setItem("aurumLanguage", lang)
  languageScreen.classList.add("hide")
}

function openLanguage(){
  languageScreen.classList.remove("hide")
}

const savedLanguage = localStorage.getItem("aurumLanguage")
if(savedLanguage){
  setLanguage(savedLanguage)
}

const revealElements = document.querySelectorAll(".reveal")
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("active")
    }
  })
},{threshold:.15})

revealElements.forEach(el=>observer.observe(el))

function sendBooking(event){
  event.preventDefault()

  const lang = localStorage.getItem("aurumLanguage") || "ru"
  const name = document.getElementById("name").value.trim()
  const date = document.getElementById("date").value
  const time = document.getElementById("time").value
  const guests = document.getElementById("guests").value

  const textRu = `Здравствуйте! Хочу забронировать столик в Aurum Coffee.%0A%0AИмя: ${name}%0AДата: ${date}%0AВремя: ${time}%0AГостей: ${guests}`
  const textEn = `Hello! I want to book a table at Aurum Coffee.%0A%0AName: ${name}%0ADate: ${date}%0ATime: ${time}%0AGuests: ${guests}`

  const message = lang === "en" ? textEn : textRu
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
}
