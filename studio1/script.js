(function () {

    "use strict";
    console.log("Reading js");

    const myForm = document.querySelector('form');
    const madlibArticle = document.querySelector('#madlib');

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name1 = document.querySelector('#name1').value;
        const adj1 = document.querySelector('#adj1').value;
        const name2 = document.querySelector('#name2').value;
        const place1 = document.querySelector('#place1').value;
        const time1 = document.querySelector('#time1').value;
        const time2 = document.querySelector('#time2').value;
        const month1 = document.querySelector('#month1').value;
        const adj2 = document.querySelector('#adj2').value;
        const num1 = document.querySelector('#num1').value;
        const adj3 = document.querySelector('#adj3').value;

        let myText;

        if(name1 == ''){
            myText = "Please provide a person's name"
            document.querySelector('#name1').focus();
        }
        
        else if(adj1 == ''){
            myText = "Please provide an adjective"
            document.querySelector('#adj1').focus();
        }

        else if(name2 == ''){
            myText = "Please provide a silly name"
            document.querySelector('#name2').focus();
        }

        else if(place1 == ''){
            myText = "Please provide a place"
            document.querySelector('#place1').focus();
        }

        else if(time1 == ''){
            myText = "Please provide a time"
            document.querySelector('#time1').focus();
        }

        else if(time2 == ''){
            myText = "Please provide a time of day"
            document.querySelector('#time2').focus();
        }

        else if(month1 == ''){
            myText = "Please provide a month"
            document.querySelector('#month1').focus();
        }
        
        else if(adj2 == ''){
            myText = "Please provide an adjective"
            document.querySelector('#adj2').focus();
        }

        else if(num1 == ''){
            myText = "Please provide a number"
            document.querySelector('#num1').focus();
        }

        else if(adj3 == ''){
            myText = "Please provide an adjective"
            document.querySelector('#adj3').focus();
        }

        else {
            myText = `Wonka's Golden Ticket. Greetings to you, ${name1}, the finder of this ${adj1} ticket from Mr. ${name2}! Present this ticket at the ${place1} gates at ${time1} in the ${time2} of the first day of ${month1} and do not be ${adj2}. You may bring with you ${num1} of your own family... and only ${num1}... no one else... In your dreams you could not imagine ${adj3} SURPRISES that await you!`;
        }
    
        madlibArticle.innerHTML = myText;

        document.querySelector('#overlay').className = "showing";
        document.querySelector('.chocolate').className = "hidden";
    })

})();

