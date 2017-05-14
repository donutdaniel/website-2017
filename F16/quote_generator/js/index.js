var convertedText="";
var arrayQuotes = ["I feel like I'm too busy writing history to read it.","I still think I am the greatest.","Keep your nose out the sky, keep your heart to god, and keep your face to the raising sun.","George Bush doesn't care about black people.","I am God's vessel. But my greatest pain in life is that I will never be able to see myself perform live.","I think I do myself a disservice by comparing myself to Steve Jobs and Walt Disney and human beings that we've seen before. It should be more like Willy Wonka... and welcome to my chocolate factory.","Nobody can tell me where I can and can't go.","I really appreciate the moments that I was able to win rap album of the year or whatever.","I liberate minds with my music. That's more important than liberating a few people from apartheid or whatever.","I don't even listen to rap. My apartment is too nice to listen to rap in.","I am Warhol. I am the No. 1 most impactful artist of our generation. I am Shakespeare in the flesh.","I would never want a book's autograph. I am a proud non-reader of books.","I don't know what's better gettin' laid or gettin' paid.","I have decided in 2020 to run for president.","I will go down as the voice of this generation, of this decade, I will be the loudest voice."];

$(document).ready(function() {
  $("#tweet").on("click", tweetQuote);
  $("#generate").on("click", generateQuote);
});

function tweetQuote(){
  convertedText = "\""+$("#quote")[0].innerText+"\"";
      console.log(convertedText);
      $("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + convertedText + " Kanye West");
}


function generateQuote(){
  var maxNum=arrayQuotes.length;
  var randomQuote=arrayQuotes[Math.floor(Math.random()*maxNum)];
  $("#quote").html(randomQuote);
  changeColor();
  changeColorHex();
}

function changeColor(){
	var rRand=Math.floor(Math.random()*256);
	var gRand=Math.floor(Math.random()*256);
	var bRand=Math.floor(Math.random()*256);
	var nColor="rgb("+rRand+","+gRand+","+bRand+")";
	$("body").css("background-color",nColor);
  $("#quote").css("color",nColor);
  $("#author").css("color",nColor);
  $("#generate").css("color",nColor);
}

$("document").ready(function(){
  generateQuote();
});