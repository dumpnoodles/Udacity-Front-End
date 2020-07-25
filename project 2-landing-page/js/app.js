/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

// Get the header tag
const header = document.getElementsByClassName('page__header')[0];

// Get the ul tag
const ul = document.getElementById('navbar__list');

// Get the number of sections
const sections = document.getElementsByTagName('section');
const sectionLength = sections.length;

// Get the classes of first section
const section1 = document.getElementById('section1').classList;

// Get footer element offsetTop
const footerPosition = document.getElementsByClassName('page__footer')[0].offsetTop;

// Set a variable to store all section's offsetTop
let sectionPositionList = [];

// Get li elements' collection
let menuLinks = [];

// set the  timer variable
let timer = null;

// set the  currentScrollTop variable
let currentScrollTop = 0;

// Get the arrowUp class
const arrowUp = document.getElementsByClassName('top')[0]


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// change the style of li element and section element
const changeElementStyle = () => {
  // When scrolling to a corresponding position of section,
  // change all the li element style
  for(let i = 0; i < sectionPositionList.length-1; i++) {
    // If the current position between sections
    if(currentScrollTop >= sectionPositionList[i] && currentScrollTop <= sectionPositionList[i+1]) {

      // change the li element'style about corresponding position of section
      menuLinks[i].style.background = "#333";
      menuLinks[i].style.color = "#fff";
      // Set sections as active
      // ignore the first section'style
      if(i > 0) {
        // change the corresponding section's style,
        // the first section'style has already been default
        sections[i].classList.add('your-active-class');
        // if scroll to bottom
        // starting from the second section
        // restore the previous li element's style,
        menuLinks[i-1].style.background = "#fff";
        menuLinks[i-1].style.color = "#333";
        // remove the previous section's style,
        sections[i-1].classList.remove('your-active-class');
      }
      // if scroll to top
      if(i < sectionPositionList.length-2) {
        // restore the next li element's style,
        menuLinks[i+1].style.background = "#fff";
        menuLinks[i+1].style.color = "#333";
        // remove the previous section's style,
        sections[i+1].classList.remove('your-active-class');
      }
    }

    // If the current position above all of the sections' position
    if(currentScrollTop < sectionPositionList[0]) {
      // restore the default li element's style,
      menuLinks[0].style.background = "#fff";
      menuLinks[0].style.color = "#333";
      // Add class 'active' to section when near top of viewport
      // restore the default first section's style,
      sections[0].classList.add('your-active-class');
    }
  }
}

// Identify if user stop scrolling
const isScrollEnd = () => {

  // Get the current position after 500ms
  const unScrollTop = document.documentElement.scrollTop;

  // if the current position equals to the position before 500ms
  if(unScrollTop === currentScrollTop) {
    header.style.visibility = "visible"; // show the navBar

    clearTimeout(timer); // clear timer

    timer = null; // make sure the timer is released
  }
}

// Show the arrowUp
const showArrow = function () {

  // if user scroll to the the last one and next to last section
  if(currentScrollTop >= sections[sectionLength - 2].offsetTop && currentScrollTop <= lastOffset) {
    arrowUp.style.visibility = "visible"; // show the arrowUp
  }

  // if user don't scroll to the the last one and next to last section
  if(currentScrollTop <= sections[sectionLength - 2].offsetTop ) {
    arrowUp.style.visibility = "hidden"; // hidden the arrow
  }
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
for (let i = 0; i < sectionLength; i++) {
  const li = document.createElement('li'); // Create li element

  // Get the title of sections content
  const sectionName = sections[i].getAttribute('data-nav');

  li.innerHTML = sectionName; // Set li elements' content

  li.className = 'menu__link'; // Set li elements' className

  // Build menu
  ul.appendChild(li);

  // Get the position of each section block in the document
  const sectionPosition = sections[i].offsetTop;

  // Set all section's offsetTop in list
  sectionPositionList.push(sectionPosition);

  // Get li elements' collection
  menuLinks = document.getElementsByClassName('menu__link');

  // Get the height of the navigation bar
  const navBarHeight = document.getElementsByClassName('page__header')[0].offsetHeight;

  // Add click listeners to all of the li elments in navigation bar,
  // if click, scroll to anchor ID
  menuLinks[i].addEventListener('click', function() {

    // If one of the li element is clicked,
    // scroll to the corresponding section
    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth"
    });

    // Add the style to the corresponding section
    sections[i].classList.add('your-active-class');
  })

  // Add mouseover listeners to all of the li elments in navigation bar
  // Add the style to the corresponding li element
  menuLinks[i].addEventListener('mouseover', function() {
    menuLinks[i].style.background = "#333";
    menuLinks[i].style.color = "#fff";
  })

  // Add mouseout listeners to all of the li elments in navigation bar
  // Add the style to the corresponding li element
  menuLinks[i].addEventListener('mouseout', function() {
    menuLinks[i].style.background = "#fff";
    menuLinks[i].style.color = "#333";
  })

}

// Get the height of the latt section
const lastOffsetHeight = sections[sectionLength-1].offsetHeight;

// Get the position of latt section in the document
const lastffsetTop = sections[sectionLength-1].offsetTop;

// Add the the latt section'height and position
const lastOffset = lastOffsetHeight + lastffsetTop;

// Add it the list
sectionPositionList.push(lastOffset);


/**
 * End Main Functions
 * Begin Events
 *
*/

// scroll event's listener
document.onscroll = () => {
  if(timer === null) {
    timer = setTimeout(isScrollEnd, 500); // set a timer
  }
  // get the current position
  currentScrollTop = document.documentElement.scrollTop;
  showArrow(); // invoke the to show arrowUp
  header.style.visibility="hidden"; // if srolling,hidden the navBar
  changeElementStyle(); // invoke changeElementStyle to change style
}

// Add a click event listener to arrowUp
arrowUp.addEventListener('click', () => {
  // if clicked, scroll smoothly to the top
  window.scroll({
    top: 0,
    behavior: "smooth"
  });
})
















