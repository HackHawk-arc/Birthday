const birthdayGirl = 'Supriya';
const loader = document.getElementById("loader");
const beginBtn = document.getElementById("beginBtn");
const typingEl = document.getElementById("typing");
const heartButton = document.getElementById("heartButton");
const reveal = document.getElementById("reveal");
const heartLayer = document.getElementById("heartLayer");
const confetti = document.getElementById("confetti");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 850);
  setInterval(makeHeart, 650);
});

beginBtn.addEventListener("click", () => {
  document.querySelector(".intro").scrollIntoView({behavior:"smooth"});
  try {
    music.play();
    musicBtn.textContent = "♫";
  } catch(e) {}
});

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play().then(() => musicBtn.textContent = "♫").catch(() => {});
  } else {
    music.pause();
    musicBtn.textContent = "♪";
  }
});

const message = `Today is a reminder of how lucky I feel to have you in my life.

I hope this new year brings you the kind of happiness that stays. I hope you laugh until your stomach hurts, make memories you never want to forget, and find a hundred little reasons to be proud of yourself.

And whenever life gets a little messy, I hope you remember this: you are loved, you are important, and you are so much more wonderful than you sometimes realise.

Happy Birthday. ♡`;

let typed = false;
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !typed) {
    typed = true;
    typeText();
  }
}, {threshold:0.25});
observer.observe(document.querySelector(".letter-card"));

let i = 0;
function typeText() {
  if (i < message.length) {
    typingEl.innerHTML += message[i] === "\n" ? "<br>" : message[i];
    i++;
    setTimeout(typeText, 22);
  }
}

heartButton.addEventListener("click", () => {
  if (reveal.classList.contains("show")) return;
  heartButton.classList.add("pop");
  reveal.classList.add("show");
  launchConfetti(90);
  setTimeout(() => heartButton.classList.remove("pop"), 800);
  setTimeout(() => reveal.scrollIntoView({behavior:"smooth", block:"center"}), 350);
});

function makeHeart() {
  const h = document.createElement("span");
  h.className = "float-heart";
  h.textContent = ["♡","♥","❤","✦"][Math.floor(Math.random()*4)];
  h.style.left = Math.random()*100 + "vw";
  h.style.setProperty("--x", (Math.random()*160-80) + "px");
  h.style.animationDuration = (6 + Math.random()*5) + "s";
  h.style.fontSize = (12 + Math.random()*17) + "px";
  heartLayer.appendChild(h);
  setTimeout(() => h.remove(), 12000);
}

function launchConfetti(count) {
  for (let n=0; n<count; n++) {
    setTimeout(() => {
      const c = document.createElement("i");
      c.className = "conf";
      c.style.left = Math.random()*100 + "vw";
      c.style.background = ["#e9a1ad","#f2d2b8","#fff","#b96d7a","#d7a3ad"][Math.floor(Math.random()*5)];
      c.style.animationDuration = (2 + Math.random()*2.5) + "s";
      c.style.transform = `rotate(${Math.random()*360}deg)`;
      confetti.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }, n*12);
  }
}

document.querySelectorAll(".memory").forEach(card => {
  card.addEventListener("click", () => {
    card.style.transform = "scale(.98)";
    setTimeout(() => card.style.transform = "", 180);
  });
});
