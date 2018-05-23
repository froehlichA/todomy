module.exports = {
  head: {
    script: [
      {
        src: 'https://use.fontawesome.com/releases/v5.0.12/js/all.js',
        integrity:
          'sha384-Voup2lBiiyZYkRto2XWqbzxHXwzcm4A5RfdfG6466bu5LqjwwrjXCMBQBLMWh7qR',
        crossorigin: 'anonymous'
      }
    ]
  },
  plugins: ['~/plugins/global.js'],
  css: ['~/css/main.css']
};
