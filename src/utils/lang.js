const lang = {
  English: {
    gptPlaceholder: 'What would you like to watch today?',
    gptSearchText: 'Search',
  },
  Hindi: {
    gptPlaceholder: 'आज आप क्या देखना चाहेंगे',
    gptSearchText: 'खोज',
  },
  Spanish: {
    gptPlaceholder: '¿Qué te gustaría ver hoy?',
    gptSearchText: 'Buscar',
  },
};

export default lang;
export const supported_languages = [
  { identifier: 'en', value: 'English' },
  { identifier: 'hi', value: 'Hindi' },
  { identifier: 'sp', value: 'Spanish' },
];
