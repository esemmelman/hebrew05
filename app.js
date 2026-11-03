const groups = [
  { sound: 'ah', example: 'as in father', vowels: [['ַ', 'Patach'], ['ָ', 'Kamatz'], ['ֲ', 'Hataf patach']] },
  { sound: 'eh', example: 'as in bed', vowels: [['ֶ', 'Segol'], ['ֱ', 'Hataf segol']] },
  { sound: 'ai', example: 'as in say', vowels: [['ֵ', 'Tsere']] },
  { sound: 'ee', example: 'as in see', vowels: [['ִ', 'Hiriq']] },
  { sound: 'oh', example: 'as in go', vowels: [['ֹ', 'Holam'], ['וֹ', 'Holam with vav'], ['ֳ', 'Hataf kamatz']] },
  { sound: 'oo', example: 'as in food', vowels: [['ֻ', 'Kubutz'], ['וּ', 'Shuruk']] }
];
const container = document.querySelector('#groups');
function render() {

  container.replaceChildren(...groups.map(group => {
    const row = document.createElement('div');
    row.className = 'group';
    const sound = document.createElement('header');
    sound.className = 'sound';
    sound.innerHTML = `<h2>${group.sound}</h2><p>${group.example}</p>`;
    const vowels = document.createElement('div');
    vowels.className = 'vowels';
    for (const [sign, name] of group.vowels) {
      const item = document.createElement('div');
      item.className = 'vowel';
      const mark = document.createElement('span');
      mark.className = 'mark';
      mark.lang = 'he';
      mark.textContent = /^[\u05D0-\u05EA]/u.test(sign) ? sign : '◌' + sign;
      mark.setAttribute('aria-label', name);
      item.append(mark);
      vowels.append(item);
    }
    row.append(sound, vowels);
    return row;
  }));
}

render();

const practiceVowels = groups.flatMap(group => group.vowels.map(([sign, name]) => ({ sign, name, sound: group.sound })));
const pageList = document.querySelector('#page-list');
const firstPage = document.querySelector('#first-page');
const secondPage = document.querySelector('#second-page');
const practiceCard = document.querySelector('#practice-card');
const practiceContent = document.querySelector('#practice-content');
let currentVowel = -1;
let revealed = false;

function nextVowel() {
  // Pick from the other vowels so Next always changes the displayed sign.
  const choices = practiceVowels.map((_, index) => index).filter(index => index !== currentVowel);
  currentVowel = choices[Math.floor(Math.random() * choices.length)];
  revealed = false;
  const vowel = practiceVowels[currentVowel];
  practiceContent.textContent = /^[\u05D0-\u05EA]/u.test(vowel.sign) ? vowel.sign : '◌' + vowel.sign;
  practiceContent.lang = 'he';
  practiceCard.classList.remove('revealed');
  practiceCard.setAttribute('aria-label', `${vowel.name}: click to reveal English sound`);
}

pageList.addEventListener('change', () => {
  const practice = pageList.value === 'second';
  firstPage.hidden = practice;
  secondPage.hidden = !practice;
  if (practice) nextVowel();
});

practiceCard.addEventListener('click', () => {
  if (revealed) return;
  revealed = true;
  const vowel = practiceVowels[currentVowel];
  practiceContent.textContent = vowel.sound;
  practiceContent.lang = 'en';
  practiceCard.classList.add('revealed');
  practiceCard.setAttribute('aria-label', `English sound: ${vowel.sound}`);
});

document.querySelector('#next-vowel').addEventListener('click', nextVowel);
