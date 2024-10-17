// Intersetion Observer

const IO = (item, options) => {
 return new Promise((resolve) => {
  const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              resolve();
          }
      });
  }, options);
  observer.observe(item);
 });
};

const p = document.querySelectorAll("[data-animation='paragraph']");
const H = document.querySelectorAll("[data-animation='heading']");


  p.forEach((item) => {
        const line = Splitting({
            target: item,
            by: "lines",
        });
        line.forEach((splitResult) => {
            const wrappedLines = splitResult.words
                .map(
                    (wordsArr) => `
                       <span class="word_wrap">
                             ${wordsArr.outerHTML}
                        </span>`
                )
                .join("");
            splitResult.el.innerHTML = wrappedLines;
        });

        gsap.set(item.querySelectorAll(".word"), {
            yPercent: 100,
            opacity: 0,
            rotateX: 50,
            transformStyle: "preserve-3d",
        });
        IO(item, { threshold: 0.8 }).then(() => {
            const elem = item.querySelectorAll(".word");
            gsap.to(elem, {
                yPercent: 0,
                opacity: 1,
                rotateX: 0,
                stagger: elem.length > 100 ? 0.02 : 0.03,
                duration: elem.length > 100 ? 0.65 : 0.75,
                ease: "easeOut",
                // ease: "back.out(1.7)" 
            });
        });
    });

     H.forEach((item) => {
        Splitting({
            target: item,
            by: "chars",
        });
        gsap.set(item.querySelectorAll(".char"), {
            opacity: 0,
            yPercent: 100,
            transformStyle: "preserve-3d",
        });
        IO(item, {
            threshold: 1,
        }).then(() => {
            const elem = item.querySelectorAll(".char");
            gsap.to(elem, {
                opacity: 1,
                yPercent: 0,
                stagger: elem.length > 100 ? 0.02 : 0.03,
                duration: elem.length > 100 ? 0.5 : 0.6,
                // ease: "easeOut",
                ease: "back.out(1.7)" 
            });
        });
    });