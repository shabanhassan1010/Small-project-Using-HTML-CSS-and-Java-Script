const quoteText = document.querySelector('.quote'); 
const authorName = document.querySelector('.author .name  ')
const quoteBtn = document.querySelector('button');

soundBtn = document.querySelector('.sound');
copyBtn = document.querySelector('.copy');
twitterBtn = document.querySelector('.twitter');


// Random Quote Function
function randomQuote() 
{
    quoteBtn.classList.add("loading...")
    quoteBtn.innerText = 'Leoding Quote....'
    fetch("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en").then(res => res.json()).then(result => 
        {
         console.log(result);
         quoteText.innerHTML = result.content;
         authorName.innerHTML = result.content;
         quoteBtn.innerText = 'New Quote';
         quoteBtn.classList.remove("loading ...")
        })
}
quoteBtn.addEventListener('click', randomQuote);


soundBtn.addEventListener('click' , ()=>{
    // SpeechSynthesisUtterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance( `${quoteText.innerText} by ${authorName.innerHTML}` );
    speechSynthesis.speak(utterance); //speak method of  speechSynthesis
})


copyBtn.addEventListener('click' , ()=>{
    // copying the quote text on copyBtn click
    // writeText() property weites the specified text string to the system clipboard
    navigator.clipboard.writeText(quoteText.innerText)
})


twitterBtn.addEventListener('click' , ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl , "_blank"); // opening a new twitter tab with passing quote in the url
})