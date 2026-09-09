/* =========================================
   GSAP SETUP
========================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================
   ELEMENTS
========================================= */

const laptop = document.querySelector("#movingLaptop");
const target = document.querySelector("#laptopTarget");


/* =========================================
   WAIT FOR IMAGE
========================================= */

window.addEventListener("load", () => {

    /*
        First refresh ScrollTrigger after
        all images have loaded.
    */

    ScrollTrigger.refresh();


    /*
        Create laptop animation
    */

    createLaptopAnimation();

});


/* =========================================
   LAPTOP SCROLL ANIMATION
========================================= */

function createLaptopAnimation() {


    /*
        Get the initial laptop position
    */

    const laptopRect =
        laptop.getBoundingClientRect();


    /*
        Get About target position
    */

    const targetRect =
        target.getBoundingClientRect();


    /*
        Calculate target center
    */

    const laptopCenterX =
        laptopRect.left +
        laptopRect.width / 2;


    const laptopCenterY =
        laptopRect.top +
        laptopRect.height / 2;


    const targetCenterX =
        targetRect.left +
        targetRect.width / 2;


    const targetCenterY =
        targetRect.top +
        targetRect.height / 2;


    /*
        Difference between
        laptop and target
    */

    const moveX =
        targetCenterX -
        laptopCenterX;


    const moveY =
        targetCenterY -
        laptopCenterY;


    /*
        Target scale

        Example:

        Laptop = 650px

        Target = 650px

        Scale = around 1

        We can modify this later.
    */

    const targetScale =
        targetRect.width /
        laptopRect.width;


    /* =========================================
       GSAP TIMELINE
    ========================================= */

    const timeline = gsap.timeline({

        scrollTrigger: {

            trigger: ".about",

            start: "top bottom",

            end: "top 20%",

            scrub: 1.5,

            /*
                Markers help during development.

                Change true → false
                after everything works.
            */

            markers: false

        }

    });


    /* =========================================
       LAPTOP MOVEMENT
    ========================================= */

    timeline.to(laptop, {

        x: moveX,

        y: moveY,

        scale: targetScale * 0.82,

        rotation: 0,

        duration: 1,

        ease: "none"

    });


    /*
        Optional small glow effect
    */

    timeline.to(
        laptop,
        {

            filter:
                "drop-shadow(0 25px 50px rgba(0,120,255,0.25))",

            duration: 0.3

        },
        "<"
    );


    /* =========================================
       ABOUT CONTENT REVEAL
    ========================================= */

    gsap.from(
        ".about-content > *",
        {

            y: 60,

            opacity: 0,

            stagger: 0.12,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".about",

                start: "top 70%",

                toggleActions:
                    "play none none reverse"

            }

        }
    );


    /* =========================================
       ABOUT CARDS REVEAL
    ========================================= */

    gsap.from(
        ".about-card",
        {

            x: 80,

            opacity: 0,

            stagger: 0.15,

            duration: 0.8,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".about",

                start: "top 65%",

                toggleActions:
                    "play none none reverse"

            }

        }
    );

}


/* =========================================
   RESIZE HANDLING
========================================= */

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        /*
            Kill existing ScrollTriggers
            and rebuild positions.
        */

        ScrollTrigger.getAll().forEach(
            trigger => trigger.kill()
        );


        /*
            Recreate animation
        */

        createLaptopAnimation();


        ScrollTrigger.refresh();

    }, 300);

});