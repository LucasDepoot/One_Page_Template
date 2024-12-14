export default function addAnimateClass(){
    document.addEventListener("DOMContentLoaded",()=>{
        const targets = document.querySelectorAll(".elementToAnimate");
        //Observe quand un element entre a l'ecran
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {                    
                    entry.target.classList.add('animate'); 
                }
            });
            //Proportion de visibilite pour activation
          },{threshold:0.33}); 
          targets.forEach(target => observer.observe(target));
    })
}