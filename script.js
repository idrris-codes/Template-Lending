const languageScreen = document.getElementById("languageScreen")

function setLanguage(lang){
  document.documentElement.lang = lang
  document.querySelectorAll("[data-ru]").forEach(el=>{
    el.innerHTML = el.dataset[lang]
  })
  localStorage.setItem("kfcLandingLanguage", lang)
  languageScreen.classList.add("hide")
}

function openLanguage(){
  languageScreen.classList.remove("hide")
}

const savedLanguage = localStorage.getItem("kfcLandingLanguage")
if(savedLanguage){
  setLanguage(savedLanguage)
}

const reveals = document.querySelectorAll(".reveal")
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("active")
    }
  })
},{threshold:.14})
reveals.forEach(el=>observer.observe(el))

document.addEventListener("mousemove", e=>{
  if(window.innerWidth < 900) return
  const x = (e.clientX / window.innerWidth - .5) * 18
  const y = (e.clientY / window.innerHeight - .5) * 18
  const visual = document.querySelector(".bucket-img")
  if(visual){
    visual.style.transform = `translate(${x * .35}px, ${y * .25}px) rotate(${3 + x * .08}deg)`
  }
})

document.querySelectorAll(".food-card").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    if(window.innerWidth < 900) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    const rotateX = ((y - midY) / midY) * -4
    const rotateY = ((x - midX) / midX) * 4
    card.style.transform = `translateY(-14px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  })

  card.addEventListener("mouseleave", ()=>{
    card.style.transform = ""
  })
})
