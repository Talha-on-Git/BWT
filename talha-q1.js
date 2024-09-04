const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

let apiData = []; 

async function getApiData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        apiData = data.quotes;
        defaultRandomQuote(); 
    } catch (error) {
        console.log('Error fetching data', error);
    }
}

function defaultRandomQuote() {
   
    const randomQuote = Math.floor(Math.random() * apiData.length);
    const item = apiData[randomQuote];

    const text = document.getElementById('text');
    const author = document.getElementById('author');
    text.innerHTML = `<p>${item.quote}</p>`;
    author.innerHTML = `<p> ${item.author}</p>`;
}

document.getElementById('new-quote').addEventListener('click', (event) => {
    event.preventDefault();
    defaultRandomQuote();
});

function copyQuote() {
    const copyTextToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard:', text);
        }).catch((error) => {
            console.log('Failed to copy text: ', error);
        });
    };

    document.getElementById('copy-quote').addEventListener('click', () => {
        
        const quoteText = document.getElementById('text').innerText;
        const authorText = document.getElementById('author').innerText;
        
        const textToCopy = `${quoteText} ${authorText}`;
        copyTextToClipboard(textToCopy);
    });
}

copyQuote();

getApiData();

