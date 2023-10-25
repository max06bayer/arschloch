apply_button = document.getElementById('apply')

apply_button.onclick = function(event) {

    const card_numbers = [];
    cards_placed.forEach(card => {
        let card_number = card.getAttribute("data-card")
        card_numbers.push(card_number)
    });

    check_1 = card_numbers.every((val, i, arr) => val === arr[0])
    console.log(check_1)

};