const groups = [
  { sound: 'ah', example: 'as in father', vowels: [['ַ', 'Patach'], ['ָ', 'Kamatz'], ['ֲ', 'Hataf patach']] },
  { sound: 'eh', example: 'as in bed', vowels: [['ֶ', 'Segol'], ['ֵ', 'Tsere'], ['ֱ', 'Hataf segol']] },
  { sound: 'ee', example: 'as in see', vowels: [['ִ', 'Hiriq'], ['ִי', 'Hiriq with yod']] },
  { sound: 'oh', example: 'as in go', vowels: [['ֹ', 'Holam'], ['וֹ', 'Holam with vav'], ['ׇ', 'Kamatz katan'], ['ֳ', 'Hataf kamatz']] },
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
      const caption = document.createElement('span');
      caption.className = 'name';
      caption.textContent = name;
      item.append(mark, caption);
      vowels.append(item);
    }
    row.append(sound, vowels);
    return row;
  }));
}

render();
