import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [color, setColor] = useState('');
    const [animationClass, setAnimationClass] = useState();

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    
    useEffect(() => {
      generateNewQuote();
    }, []);

    let twitterShareLink = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '" ' + author);

    let tumblrShareLink = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(author)+'&content=' + encodeURIComponent(quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';

    const generateNewQuote = () => {
      const app = document.getElementsByClassName('App')[0];
      fetch('https://api.quotable.io/random')
      .then((data) => data.json())
      .then((json) => {
        console.log(json);
        setQuote(json.content);
        setAuthor(json.author);
        setColor((prevColor) => {
          const randomColor = getRandomColor();
          app.animate({
            backgroundColor: randomColor,
            color: randomColor
          }, 1000);
          document.getElementById('new-quote').animate({
            backgroundColor: randomColor
          }, 1000);
          document.getElementById('twitter-share').animate({
            backgroundColor: randomColor
          }, 1000);
          document.getElementById('tumblr-share').animate({
            backgroundColor: randomColor
          }, 1000)         
          return randomColor;
        });

        const text = document.getElementById('text');
        const author = document.getElementById('author');
        text.classList.remove('text-focus-in');
        author.classList.remove('text-focus-in');
        void text.offsetWidth;
        text.classList.add('text-focus-in');
        void author.offsetWidth;
        author.classList.add('text-focus-in');
      });
    }

    return (
      <div style={{backgroundColor: color}}className="App">
        <div className='container'>
          <div id="quote-box">
            <p style={{color: color}} id="text" className="text-focus-in">
              <i style={{marginRight: '12px'}} className="fa fa-quote-left"></i>
              {quote}
            </p> 
            <p style={{color: color}} id="author" className="text-focus-in">- {author}</p>
            <div className='buttons'>
              <button id='twitter-share' style={{backgroundColor: color, width: '45px', padding: 0}}>
                <a href={twitterShareLink}>
                  <i style={{marginLeft: 'auto', marginRight: 'auto'}} className="fa fa-twitter"></i>
                </a>
              </button>
              <button id='tumblr-share' style={{backgroundColor: color, width: '45px', padding: 0}}>
                <a href={tumblrShareLink}>
                  <i style={{marginLeft: 'auto', marginRight: 'auto'}} className="fa fa-tumblr"></i>
                </a>
              </button>
              <button style={{backgroundColor: color}} id="new-quote" onClick={() => generateNewQuote()}>New quote</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default App
;