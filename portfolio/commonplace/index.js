  const quote = document.querySelector('.quote')
  const author = document.querySelector('.author')
  const colorPair = ['crimson']
  function randomQuote(){
    let rand = Math.floor(Math.random() * quotes.length)
    quote.innerText = quotes[rand].quote
    author.innerText = quotes[rand].author
    randomColor()
  }
  randomQuote()

  function randomColor() {
    let rand = Math.floor(Math.random() * colors.length)
    // const styles = getComputedStyle(document.documentElement)
    // const themeColor = styles.getPropertyValue('--theme')
    if(colorPair.length > 1) colorPair.shift()
    colorPair.push(colors[rand])
    document.documentElement.style.setProperty('--theme1', colorPair[0])
    document.documentElement.style.setProperty('--theme2', colorPair[1])
  }
  
  document.querySelector('.tweetThis').addEventListener('click', function() {
    let text = quote.innerText
    let by = author.innerText
   this.setAttribute("href", 
    `https://twitter.com/intent/tweet?text="${text}" -${by}`
   )
  })
   
 
                    
  
  
  