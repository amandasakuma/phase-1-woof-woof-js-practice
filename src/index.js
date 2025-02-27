document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(pups => {
            pups.forEach((dog) => renderPups(dog))
        })

    function renderPups(dog) {

        let container = document.querySelector('#dog-bar')

        const dogSpan = document.createElement("span")

        dogSpan.innerText = dog.name;

        // spanBar.setAttribute("pups-id", dog.id)


        container.append(dogSpan)

        //when i click on a dog span...        
        dogSpan.addEventListener('click', (e) => {
            const dogInfo = document.querySelector('#dog-info')
            const dogPic = document.createElement('img')
            const dogName = document.createElement('h2')
            const btn = document.createElement('button')

            dogPic.src = dog.image
            dogName.innerText = dog.name

            // checks db.json key 'isGoodDog' 
            if (dog.isGoodDog) {
                btn.innerText = 'Good Dog!'
            } else {
                btn.innerText = 'Bad Dog!'
            }

            //the '' clears out the dogInfo div
            dogInfo.innerText = ''
            //Appends the dog info after the div has been cleared out
            dogInfo.append(dogPic, dogName, btn);

            //new click event for the good/bad dog button changes the dog's status
            btn.addEventListener('click', (e) => {
                //we are looking at the dog's good/bad status...
                console.log(btn.innerText)
                //and if the button says 'good dog'...
                if (btn.innerText === 'Good Dog!') {
                    //we want it to change the dog object & button to 'bad dog'
                    btn.innerText = 'Bad Dog!'
                    dog.isGoodDog = false
                } else {
                    //otherwise, change dog object and button to 'good dog'
                    btn.innerText = 'Good Dog!'
                    dog.isGoodDog = true
                }
                //checking to see if good/bad status changes on click
                console.log(dog)

                patchPups(dog)

            })
        })
    } //end of render pups function

    //PATCH
    function patchPups(dog) {
        //because we are just changing a small portion of the data, we are sending a patch
        //url is now dynamic to refer to the id of the dog that is being click to good/bad
        fetch('http://localhost:3000/pups/' + dog.id, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            //above we changed the dog object to good or bad. 
            //below, we are updating our database with the latest good/bad status
            body: JSON.stringify({
                isGoodDog: dog.isGoodDog
            })
        })
            .then(r => r.json())
    }

})


