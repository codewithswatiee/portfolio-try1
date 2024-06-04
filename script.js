const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
var timeout;

function firstPageAnim(){
    var tl= gsap.timeline();

    tl.from("#nav", {
        y: -15, 
        duration: 1.5,
        opacity:0, 
        ease: Expo.easeInOut,
    })
    .to('.boundingelem', {
        y: 0,
        delay: -1,
        duration: 2,
        ease: Expo.easeInOut,
        stagger: .5
    })
    .from("#herofooter", {
        x: -20,
        delay: -3,
        duration: 1.5,
        opacity:0,
        stagger: .1
    })
}

function circleChange(){
    // default scale val
    // .8 => min, 1.2 => max
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);
        // clamp
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);
        
        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(() => {
            document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

var openMenuBtn = document.querySelector('#menuOpen');
var tl2 = gsap.timeline()
tl2.to('#menu', {
    right: 0,
    duration: .02,
})
.from('#menu a', {
    x: 100,
    stagger: .4,
    duration: .7,
    opacity: 0,
})
tl2.pause()

openMenuBtn.addEventListener('click', function(){
    gsap.to(openMenuBtn, {
        y: 10,
        opacity: 0,
    })
    tl2.play()
})

window.addEventListener('scroll', function() {
    tl2.reverse()
})


// function calls
circleMouseFollower(); 
firstPageAnim();
circleChange();

document.querySelectorAll('.elem').forEach(function (elem){
    var rotate = 0;
    var diffRot = 0;

    elem.addEventListener('mouseleave', function (dets) {
        gsap.to(elem.querySelector('img'), {
            opacity: 0,
            ease: Power3,
        });
    });
    elem.addEventListener('mousemove', function (dets) {
        diffRot = dets.clientX - rotate;
        rotate = dets.clientX;
        var diff = dets.clientY - elem.getBoundingClientRect().top
        gsap.to(elem.querySelector('img'), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate : gsap.utils.clamp(-20, 20, diffRot),
        });
    });
});


function JSClock(elem) {
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    let temp = String(hour % 12);
    if (temp === "0") {
        temp = "12";
    }
    temp += (minute < 10 ? ":0" : ":") + minute;
    temp += (second < 10 ? ":0" : ":") + second;
    temp += hour >= 12 ? " P.M." : " A.M.";

    elem.innerHTML = temp;
}
    
const timeElement = document.querySelector('#time');
setInterval(() => JSClock(timeElement), 1000);
    

