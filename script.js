// nav toggle functionality
const sideBar  = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.times');
const body = document.querySelector('body')

var tl = gsap.timeline();

function showSidebar() {
  body.classList.toggle('stop-scrolling');

  // sideBar.classList.toggle('show-sidebar');
  tl.to(".sidebar", { duration: 0.25, x: 0 }) 
  .to(".sidebar_blue", { duration: 0.25, x: 0 })
  .to(".sidebar_green", { duration: 0.25, x: 0 });

  // stagger sidebar contents
  tl.to(".sidebar .links .link_item", {
   opacity: 1,    
   delay: 1,
   y: 0,          
   stagger: 0.2,  
   duration: 0.5, 
   ease: "power2.out"
 });
}

function closeSidebar() {
  // sideBar.classList.remove('show-sidebar');
   // stagger sidebar contents
  tl.to(".sidebar .links .link_item", {
   opacity: 0,    
   delay: 1,
   y: 20,          
   stagger: {
    each: 0.2,   
    from: "end"  
  },
   duration: 0.5, 
   ease: "power2.out"
 }, "-=0.5");

   tl.to(".sidebar_green", {duration: 0.25, x: "-100%" })
  .to(".sidebar_blue", { duration: 0.25, x: "-100%" })
  .to(".sidebar", {duration: 0.25, x: "-100%" });
  body.classList.toggle('stop-scrolling');
}

toggleBtn.addEventListener('click', showSidebar);
closeBtn.addEventListener('click', closeSidebar);