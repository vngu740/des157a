(function () {
    'use strict';

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.addEventListener('load', function () {
        const posts = document.querySelectorAll('section');
        let postTops = [];
        let pageTop;
        let counter = 1;
        let prevCounter = 1;
        let doneResizing;
        let exitDirection;
        let enterDirection;

        resetPagePosition();

        window.addEventListener('scroll', function () {
            pageTop = window.pageYOffset + 300;

            if (pageTop > postTops[counter]) {
                counter++;
                console.log(`scrolling down ${counter}`);
            } else if (counter > 1 && pageTop < postTops[counter - 1]) {
                counter--;
                console.log(`scrolling up ${counter}`);
            }

            if (counter != prevCounter) {
                document.querySelector('.japanimg img').className = 'sect' + counter;
                if (counter > prevCounter) {
                    exitDirection = 'animate exitup';
                    enterDirection = 'animate enterup';
                }
                else {
                    exitDirection = 'animate exitdown';
                    enterDirection = 'animate enterdown';
                }

                prevCounter = counter;
            }

        }); // end window scroll function

        window.addEventListener('resize', function () {
            clearTimeout(doneResizing);
            doneResizing = setTimeout(function () {

                resetPagePosition();

            }, 500);
        });

        function resetPagePosition() {
            postTops = [];
            posts.forEach(function (post) {
                postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
            });

            const pagePosition = window.pageYOffset + 300;
            counter = 0;

            postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });

        }

        //progress bar
        window.onscroll = function () { myFunction() };

        function myFunction() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.getElementById("myBar").style.width = scrolled + "%";
        }

    }); // end window load function

})();// END IIFE