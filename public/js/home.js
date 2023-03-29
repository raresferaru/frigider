const prevs = document.querySelectorAll('.prev');
const input = document.querySelectorAll('input[type=number]')

//tutorial
alert('Buna! In coltul dreapta-sus vei observa o miniharta care serveste pe post de preview. Poti modifica pozitia pozelor in frigider si marimea conform pozei. OBS: Mereu trebuie sa fie 6 poze in frigider(vrei sa fie plin). OBS: Manevrarea pozei functioneaza asa: top: 20 => 20 de pixeli fata de punctul superior al pozei; left: 60 => 60 de pixeli in stanga celui mai din stanga punct al pozei. Pe viitor pot aranja sa fie si mai putine poze in frigider(+-2 zile)');

input[12].addEventListener('keyup', () => {

    for (let prev of prevs) {
        prev.height = input[12].value;
        prev.width = input[12].value;
    }
})

input[12].addEventListener('click', () => {

    for (let prev of prevs) {
        prev.height = input[12].value;
        prev.width = input[12].value;
    }
})

let cnt = 0;
for (let prev of prevs) {
    //console.log(prev)
    cnt++;
    if (cnt <= 3) {
        input[cnt * 2 - 1].value = `${(cnt - 1) * 40 + 20}`;
        input[cnt * 2 - 2].value = '20';
        prev.style.top = '20px';
        prev.style.left = `${(cnt - 1) * 40 + 20}px`
    } else {
        input[cnt * 2 - 1].value = `${(cnt - 4) * 40 + 20}`;
        input[cnt * 2 - 2].value = '57';
        prev.style.top = '57px';
        prev.style.left = `${(cnt - 4) * 40 + 20}px`
    }

    prev.height = '30';
    prev.width = '30';
}


for (let i = 0; i <= 10; i += 2) {
    //console.log(prevs[i / 2])
    input[i].addEventListener('keyup', () => {
        prevs[i / 2].style.top = input[i].value + 'px';
    })
    input[i].addEventListener('click', () => {
        prevs[i / 2].style.top = input[i].value + 'px';
    })
}

for (let i = 1; i <= 11; i += 2) {
    input[i].addEventListener('click', () => {
        prevs[Math.floor(i / 2)].style.left = input[i].value + 'px';
    })
}