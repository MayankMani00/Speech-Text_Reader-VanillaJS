const main = $('main');
const voiceSelect = $('#voices');
const textarea = $('#text');
const readBtn = $('#read');
const toggleBtn = $('#toggle');
const closeBtn = $('#close');

const data = [
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/drink.jpg',
		text  : 'I am thirsty'
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/food.jpg',
		text  : "I'm Hungry"
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/tired.jpg',
		text  : "I'm Tired"
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/hurt.jpg',
		text  : "I'm Hurt"
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/happy.jpg',
		text  : "I'm Happy"
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/angry.jpg',
		text  : "I'm Angry"
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/sad.jpg',
		text  : "I'm Sad"
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/scared.jpg',
		text  : "I'm Scared"
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/outside.jpg',
		text  : 'I Want To Go Outside'
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/home.jpg',
		text  : 'I Want To Go Home'
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/school.jpg',
		text  : 'I Want To Go To School'
	},
	{
		image :
			'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/master/speech-text-reader/img/uncompressed/grandma.jpg',
		text  : 'I Want To Go To Grandmas'
	}
];

const message = new SpeechSynthesisUtterance();

data.forEach(createBox);

//Creates speech boxes
function createBox(item) {
	const box = document.createElement('div');
	const { image, text } = item;

	box.classList.add('box');
	box.innerHTML = `<img src="${image}" alt="${text}"/>
    <p class="info">${text}</p>
    `;

	box.addEventListener('click', () => {
		setTextMessage(text);
		speakText();

		box.classList.add('active');
		setTimeout(() => {
			box.classList.remove('active');
		}, 800);
	});

	main[0].appendChild(box);
}

//Store voices
let voices = [];
function getVoices() {
	voices = speechSynthesis.getVoices();

	voices.forEach((voice) => {
		const option = document.createElement('option');
		option.value = voice.name;
		option.innerText = `${voice.name} ${voice.lang}`;

		voiceSelect[0].appendChild(option);
	});
}

//Set text
function setTextMessage(text) {
	message.text = text;
}

//Speak text
function speakText() {
	speechSynthesis.speak(message);
}

//Set voice
function setVoice(e) {
	message.voice = voices.find((voice) => voice.name === e.target.value);
}

//Voice changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

//toggle text box
toggleBtn.click(() => $('.text-box')[0].classList.toggle('show'));
closeBtn.click(() => $('.text-box')[0].classList.remove('show'));

//Select voice
voiceSelect[0].addEventListener('change', setVoice);

//Read text
readBtn.click(() => {
	setTextMessage(textarea[0].value);
	speakText();
});

getVoices();
