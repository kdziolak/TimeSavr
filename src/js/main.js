const bar = document.querySelector('.fa-bars');
const list = document.querySelector('.menu-list');

const scrollToY = (element, to, duration) => {
    let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    let animateScroll = function () {
        currentTime += increment;
        let val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

const getChild = e => {
    let feature = document.querySelector('.features');
    let testimonials = document.querySelector('.testimonials');
    let get_started = document.getElementsByTagName('footer')[0];
    let doubt = document.querySelector('.in-doubt');
    switch (e.target.parentNode.id) {
        case 'home-list-item':
            scrollToY(document.documentElement, 0, 1000);
            break;
        case 'testimonials-list-item':
            scrollToY(document.documentElement, testimonials.offsetTop, 1000);
            break;
        case 'features-list-item':
            scrollToY(document.documentElement, feature.offsetTop, 1000);
            break;
        case 'get-started-list-item':
            console.log(get_started.offsetTop)
            scrollToY(document.documentElement, get_started.offsetTop, 1000);
            break;
        case 'doubt-list-item':
            scrollToY(document.documentElement, doubt.offsetTop, 1000);
            break;
    }
}


const showMenu = () => {
    let menu = document.querySelector('.menu-list');
    if (menu.style.right !== '0%') {
        menu.style.right = 0 + '%';
    }
}

const menu = e => {
    let nav = document.querySelector('.menu-list');
    if (nav.style.right === '0%' && e.target !== nav && !(e.target.classList.contains('menu-list'))) {
        nav.style.right = '-70%';
    } else if (e.target.classList.contains('fa-bars')) {
        showMenu();
    }
}

list.addEventListener('click', getChild);
document.addEventListener('click', menu);

$(document).ready(function(){
          $('.slider').slick({
              centerMode: true,
              centerPadding: '60px',
              slidesToShow: 3,
              responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                  }
                }
              ]
          });
            $('.testimonials-slider').slick({
              centerMode: true,
              centerPadding: '60px',
              slidesToShow: 3,
              responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                  }
                }
              ]
          });
        });