const card_1 = document.getElementById('card-1');
const card_2 = document.getElementById('card-2');
const card_3 = document.getElementById('card-3');
const card_4 = document.getElementById('card-4');
const card_5 = document.getElementById('card-5');
const card_6 = document.getElementById('card-6');

const cards = [card_1, card_2, card_3, card_4, card_5, card_6];
const cards_placed = [];

card_1.onmousedown = function(event) {
    drag_and_drop(event, card_1, cards)
};
card_2.onmousedown = function(event) {
    drag_and_drop(event, card_2, cards)
};
card_3.onmousedown = function(event) {
    drag_and_drop(event, card_3, cards)
};
card_4.onmousedown = function(event) {
    drag_and_drop(event, card_4, cards)
};
card_5.onmousedown = function(event) {
    drag_and_drop(event, card_5, cards)
};
card_6.onmousedown = function(event) {
    drag_and_drop(event, card_6, cards)
};

function drag_and_drop(event, card_object, cards) {
    if (cards_placed.indexOf(card_object) > -1) {
        cards_placed.splice(cards_placed.indexOf(card_object), 1);
    }

    reorder_cards();
    
    let shiftX = event.clientX - card_object.getBoundingClientRect().left;
    let shiftY = event.clientY - card_object.getBoundingClientRect().top;
    let elemBelow = null;

    card_object.style.position = 'absolute';
    card_object.style.zIndex = 1000;
    document.body.append(card_object);
  
    onMouseMove(event)
  
    // moves the card at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        card_object.style.left = pageX - shiftX + 'px';
        card_object.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        cards[0].hidden = true;
        cards[1].hidden = true;
        cards[2].hidden = true;
        cards[3].hidden = true;
        cards[4].hidden = true;
        cards[5].hidden = true;

        elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        
        cards[0].hidden = false;
        cards[1].hidden = false;
        cards[2].hidden = false;
        cards[3].hidden = false;
        cards[4].hidden = false;
        cards[5].hidden = false;
    }
  
    // move the card on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the card, remove unneeded handlers
    card_object.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        card_object.onmouseup = null;
        MoveToPlaceholder(elemBelow);
    };

    function MoveToPlaceholder(element) {
        if (!element) return;

        let droppableBelow = element.closest('#placeholder');

        if(droppableBelow) {
            card_object.style.width = "14em"
            cards_placed.push(card_object);
            reorder_cards()
        }
        else{
            card_object.style.width = "11em"
            
        }

        if(cards_placed.length > 0) {
            document.getElementById('placeholder').style.opacity = '0%'
        }
        else {
            document.getElementById('placeholder').style.opacity = '100%'
        }
        
    };

    function reorder_cards() {
        if (cards_placed.length == 0) {return};
        placeholder = document.getElementById('placeholder')
        const placeholder_pos = getComputedStyle(placeholder)

        cards_placed.forEach(card => {
            let cards_places_offset = (cards_placed.indexOf(card) + 0) * 35;
            let xShift = parseFloat(placeholder_pos.left) + 8 + cards_places_offset;
            let yShift = parseFloat(placeholder_pos.top) + 8;

            card.style.left = xShift.toString() + "px";
            card.style.top = yShift.toString() + "px";
        });
    };
  
    card_object.ondragstart = function() {
        return false;
    };
};