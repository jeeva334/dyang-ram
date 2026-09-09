/* =========================================
   GSAP SETUP
========================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================
   ELEMENTS
========================================= */

const laptop =
    document.querySelector("#movingLaptop");

const aboutTarget =
    document.querySelector("#laptopTarget");

const servicesTarget =
    document.querySelector("#servicesLaptopTarget");


/* =========================================
   RESIZE TIMER
========================================= */

let resizeTimer;


/* =========================================
   WAIT FOR PAGE
========================================= */

window.addEventListener("load", () => {

    ScrollTrigger.refresh();

    createLaptopAnimation();

});


/* =========================================
   LAPTOP ANIMATION
========================================= */

function createLaptopAnimation() {

    /*
    =========================================
    SAFETY CHECK
    =========================================
    */

    if (
        !laptop ||
        !aboutTarget ||
        !servicesTarget
    ) {
        console.error(
            "Laptop or target element not found."
        );

        return;
    }


    /*
    =========================================
    RESET LAPTOP
    =========================================
    */

    gsap.set(laptop, {

        x: 0,

        y: 0,

        scale: 1,

        rotation: -3

    });


    /*
    =========================================
    GET LAPTOP POSITION
    =========================================
    */

    const laptopRect =
        laptop.getBoundingClientRect();


    const laptopCenterX =
        laptopRect.left +
        laptopRect.width / 2;


    const laptopCenterY =
        laptopRect.top +
        laptopRect.height / 2;


    /*
    =========================================
    GET ABOUT TARGET
    =========================================
    */

    const aboutRect =
        aboutTarget.getBoundingClientRect();


    const aboutCenterX =
        aboutRect.left +
        aboutRect.width / 2;


    const aboutCenterY =
        aboutRect.top +
        aboutRect.height / 2;


    /*
    =========================================
    ABOUT MOVEMENT
    =========================================
    */

    const aboutX =
        aboutCenterX -
        laptopCenterX;


    const aboutY =
        aboutCenterY -
        laptopCenterY;


    /*
    =========================================
    ABOUT SCALE
    =========================================
    */

    const aboutScale =
        (aboutRect.width * 0.82) /
        laptopRect.width;


    /*
    =========================================
    GET SERVICES TARGET
    =========================================
    */

    const servicesRect =
        servicesTarget.getBoundingClientRect();


    const servicesCenterX =
        servicesRect.left +
        servicesRect.width / 2;


    const servicesCenterY =
        servicesRect.top +
        servicesRect.height / 2;


    /*
    =========================================
    SERVICES MOVEMENT
    =========================================

    Calculate movement from the
    ORIGINAL laptop position.
    */

    const servicesX =
        servicesCenterX -
        laptopCenterX;


    const servicesY =
        servicesCenterY -
        laptopCenterY;


    /*
    =========================================
    SERVICES SCALE
    =========================================
    */

    const servicesScale =
        (servicesRect.width * 1) /
        laptopRect.width;


    /*
    =========================================
    MAIN TIMELINE
    =========================================
    */

    const timeline =
        gsap.timeline({

            scrollTrigger: {

                trigger: ".about",

                start: "top bottom",

                endTrigger: ".services",

                end: "top 20%",

                scrub: 1.5,

                markers: false,

                invalidateOnRefresh: true

            }

        });


    /*
    =========================================
    HERO → ABOUT
    =========================================
    */

    timeline.to(laptop, {

        x: aboutX,

        y: aboutY,

        scale: aboutScale,

        rotation: 0,

        duration: 1,

        ease: "none"

    });


    /*
    =========================================
    ABOUT → SERVICES
    =========================================
    */

    timeline.to(laptop, {

        x: servicesX,

        y: servicesY,

        scale: servicesScale,

        rotation: 0,

        duration: 1,

        ease: "none"

    });


    /*
    =========================================
    LAPTOP GLOW
    =========================================
    */

    timeline.to(
        laptop,
        {

            filter:
                "drop-shadow(0 25px 50px rgba(0,120,255,0.30))",

            duration: 0.3,

            ease: "none"

        },
        "<"
    );


    /*
    =========================================
    ABOUT CONTENT REVEAL
    =========================================
    */

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


    /*
    =========================================
    ABOUT CARDS
    =========================================
    */

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


    /*
    =========================================
    SERVICES CONTENT
    =========================================
    */

    gsap.from(
        ".services-content > *",
        {

            x: -70,

            opacity: 0,

            stagger: 0.12,

            duration: 0.8,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".services",

                start: "top 70%",

                toggleActions:
                    "play none none reverse"

            }

        }
    );


    /*
    =========================================
    SERVICES CARDS
    =========================================
    */

    gsap.from(
        ".service-card",
        {

            y: 70,

            opacity: 0,

            scale: 0.9,

            stagger: 0.12,

            duration: 0.8,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".services",

                start: "top 65%",

                toggleActions:
                    "play none none reverse"

            }

        }
    );


    /*
    =========================================
    AI CARD HIGHLIGHT
    =========================================
    */

    gsap.to(
        "#aiCard",
        {

            borderColor:
                "rgba(20,150,255,0.95)",

            boxShadow:
                "0 0 45px rgba(0,130,255,0.35)",

            scrollTrigger: {

                trigger: ".services",

                start: "top 60%",

                end: "top 25%",

                scrub: true

            }

        }
    );

}


/* =========================================
   RESIZE HANDLING
========================================= */

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);


    resizeTimer = setTimeout(() => {

        /*
        Remove old ScrollTriggers
        */

        ScrollTrigger.getAll().forEach(
            trigger => trigger.kill()
        );


        /*
        Rebuild animation
        */

        createLaptopAnimation();


        /*
        Refresh positions
        */

        ScrollTrigger.refresh();

    }, 300);

});