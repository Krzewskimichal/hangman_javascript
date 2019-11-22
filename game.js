// random word from words array
function random_word(){
	var words = new Array("flower", "hand", "bow", "duck", "desk", "home", "water",
	"mouse", "sun", "star", "pickle", "orange", "jacket", "harvest", "dog", "cat", "sword", "rain")

	
	var word = words[Math.floor((Math.random() * words.length) + 1)];
	word = word.toUpperCase();
	return word;
}

// add method to replace char in string by position
String.prototype.replaceAt=function(index, replacement) {
	return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

//variable not_win changes value for 0 when player wins 
var win = 0;

// counter for pictures, if 9, player lose
var picture_counter = 0;

function start_game() {
	
	win = 0;
	picture_counter = 0;

	word = random_word();
	
	//set picture
	document.getElementById("hangman_picture").src = "pictures/hangman0.jpg";

	//hash word
	var i;
	var hidden_word = "";
	for (i of word){
		if (i == " ")
		{
			hidden_word = hidden_word + " ";
		}
		else
		{
			hidden_word = hidden_word + "#";
		}
	}
	if(document.getElementById("start")!=null)document.getElementById("start").style.display = "none";
	document.getElementById("secret_word").innerHTML = hidden_word;

	
	//get letters from ASCII code
	var keyboard = new Array(26);
	var a = "A";
	a = a.charCodeAt(0);

	for(var i=0;i<26;i++)
	{
		keyboard[i] = String.fromCharCode(a);
		a++;
	}
	
	//add keyboard
	var keyboard_divs = "";
	for(var i=0;i<26;i++)
	{
		keyboard_divs += "<div class='letter' id="+keyboard[i]+" onclick=check_letter("+keyboard[i]+")>" + keyboard[i] + "</div>";
		if((i+1)%5==0) keyboard_divs += "<div style='clear:both'></div>";
	}
	document.getElementById("keyboard_container").innerHTML = keyboard_divs;
}

//check if word contains letter
function check_letter() {
	
	//leter name is .id
	var letter = arguments[0];
	
	//change color for blue or red
	for(var i=0;i<word.length;i++)
	{	
		if(word.charAt(i)==letter.id)
		{
			document.getElementById(letter.id).style.borderColor = "green";
			document.getElementById(letter.id).style.color = "green";
			document.getElementById(letter.id).style.cursor = "default";
			
			document.getElementById(letter.id).onclick = "";
			var secret_word = document.getElementById("secret_word").innerHTML;

			for(var j=0;j<secret_word.length;j++)
			{	
				if(word.charAt(j)==letter.id)
				{
					var res = secret_word.replaceAt(j, letter.id);
					document.getElementById("secret_word").innerHTML = res;
				}
			}

			//check if win == 0 player wins
			win++;

			if(win==word.length){
				win_function();
				return;
			}
			return;
		}
		else
		{
			document.getElementById(letter.id).style.borderColor = "red";
			document.getElementById(letter.id).style.color = "red";
			document.getElementById(letter.id).style.cursor = "default";

			document.getElementById(letter.id).onclick = "";
		}
	}

	// change hangman pictures
	picture_counter++;
	document.getElementById("hangman_picture").src = "pictures/hangman"+picture_counter+".jpg";
	
	if(picture_counter==9)
	{	
		document.getElementById("keyboard_container").innerHTML = "<h1>GAME OVER</h1><p onclick="+"start_game()"+">Again?<p>";
		picture_counter = 0;
	}
}

//win function
function win_function(){
	document.getElementById("keyboard_container").innerHTML = "<h1>YOU WIN!</h1><p onclick="+"start_game()"+">Again?<p>";
}
