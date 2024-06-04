const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

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
        y: -10,
        delay: -1,
        duration: 1.5,
        opacity:0,
        stagger: .1
    })
}

function circleMouseFollower() {
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
    })
}



// function calls
circleMouseFollower(); 
firstPageAnim();