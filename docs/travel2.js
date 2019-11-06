console.log('travelon app start');
Destination = function(code,name,price){
    this.code = code;
    this.name = name;
    this.price = price;  
}

let count_id=0;
Order = function(name,zeut,destination,pasengers,price){
    this.id = ++count_id;
    this.name = name;
    this.zeut = zeut;
    this.destination = destination;
    this.pasengers = pasengers;
    this.price = price;
    this.total_price = this.price*pasengers;
}



let destinations = [
    new Destination(11, "London",   350 ),
    new Destination(11, "London",   350 ) ,
    new Destination(33, "Israel",   900 ),
    new Destination(08, "America",  1200) ,
    new Destination(07, "Australya",1650) ,
    new Destination(62, "Kyev",     200 ),
    new Destination(01, "Varsha",   190 ),
    new Destination(15, "Frankfort",450 ),
    new Destination(07, "Levov",    220 ),
    new Destination(20, "Vilnius",  320 ),
    new Destination(31, "Turkay",   150 )
]

let destHTML = document.querySelector('.destination tbody')
let dest_templet = "<tr><td>{{code}}</td><td>{{name}}</td><td>${{price}}</td></tr>"
let dest_to_update = "";
console.log('travelon app rendering(destinations,dest_templet)',rendering(destinations,dest_templet));
destinations.forEach(element => {
    dest_to_update += rendering(element,dest_templet);    
});
destHTML.innerHTML =dest_to_update; 

console.log('travelon app end');


let orderHTML = document.querySelector('.list-orders tbody');
orderHTML.innerHTML = ""
let template_order = `<tr><td>{{id}}</td><td>{{name}}</td><td>{{zeut}}</td>
<td>{{travel_name}}</td><td>{{pasengers}}</td><td>{{total_price}}</td></tr>`;
let update_order = "";

let orders = [];
let ordernung = [];
add_order('avraham', '012', 3, 62, destinations);
add_order('moshe', '666', 2, 20, destinations);
add_order('chaim', '123', 10, 11, destinations);
add_order('pinchas', '033', 1, 1, destinations);
add_order('דניאל', '828', 3, 31, destinations);
add_order('Rubi', '207832692', 3, 7, destinations);
add_order('a', '207832692', 3, 7, destinations);
add_order('a', '207832692', 10, 11, destinations);
add_order('רובינשטיין', '207832692', יחל, 7, destinations);









function send() {
    console.log('function send start');
    try {
        let user_name = document.getElementById('name').value;
        let user_zeut = document.getElementById('zeut').value;
        let user_travel_id = document.getElementById('travel_id').value * 1;
        let user_passengers = document.getElementById('passengers').value;
        add_order(user_name, user_zeut, user_passengers, user_travel_id, destinations);
        document.getElementById('name').value = "";
        document.getElementById('zeut').value = "";
        document.getElementById('travel_id').value = "";
        document.getElementById('passengers').value = "";
    } catch (error) {
        console.error('function send error:', error);
    }

    console.log('function send end');
}



function add_order(name, zeut, pasengers, travel_id, destinations) {

    console.log('function add_order start parameters:', name, zeut, pasengers, travel_id);

    try {
        
        let travel = destinations.find(dItem => dItem.code == travel_id)

        let order_data = new Order(uperCaseFirst(name),zeut,travel.code,pasengers,travel.price);

        orderHTML.innerHTML += rendering(order_data,template_order);
        ordernung.push(order_data)
    } catch (error) {
        console.error('function add_order error', error);
    }
    console.log('function add_order end');

}

function find() {
    console.log('function find start');
    try {
        let findHTML = document.querySelector('.select tbody');
        let template_find = `<tr><td>{{zeut}}</td><td>{{name}}</td>
        <td>{{destination}}</td><td>{{pasengers}}</td><td>'$'{{total-price}}</td></tr>`
        Finder = function(zeut,name,destination,pasengers,price){
        this.zeut=zeut;
        this.name=name;
        this.destination=destination;
        this.pasengers=pasengers;
        this.price=price;
        this.total_price=price*pasengers;
    }
        let update_find = "";
        let user_find = document.getElementById('select_name').value;
        let sum_price = 0;
        let sumHtml = document.getElementById('sum_price_name');
        sumHtml.innerHTML = "";
        ordernung.forEach(oI => {
            if (oI.name == uperCaseFirst(user_find)) {
                console.log('oI:',oI);
            let find_data = new Finder(oI.zeut,oI.name,oI.destination,oI.pasengers,oI.price);
                update_find += rendering(find_data,template_find); 
                sum_price += oI.total_price;
            }
        });
        findHTML.innerHTML = update_find;
        sumHtml.innerHTML = '<h2>$' + sum_price + '</h2>';


    } catch (error) {
        console.error('function find error:', error)
    }
    console.log('function find end');

}
function find_destination() {
    console.log('function find_destination start');
    try {
        let findHTML = document.querySelector('.table_select_destination tbody');
        let template_find = `<tr><td>{{ZEUT}}</td><td>{{NAME}}</td>
        <td>{{ID-TRAVEL}}</td><td>{{DESTINATION}}</td><td>{{PASSENGERS}}</td><td>'$'{{TOTAL-PRICE}}</td></tr>`

        let update_find = "";
        let user_find = document.getElementById('select_destination').value;
        let sum_price = 0;
        let sumHtml = document.getElementById('sum_price_Destination');
        ordernung.forEach(ordItem => {

            if (ordItem.destination == user_find) {

                update_find += template_find
                    .replace('{{ZEUT', ordItem.zeut)
                    .replace('{{NAME', ordItem.name)
                    .replace('{{ID-TRAVEL', ordItem.id_travel)
                    .replace('{{DESTINATION', ordItem.destination)
                    .replace('{{PASSENGERS', ordItem.pasengers)
                    .replace('{{TOTAL-PRICE', ordItem.total_price)
                console.log("update_find=", update_find)
                sum_price += ordItem.total_price;
            }
        });

        findHTML.innerHTML = update_find;
        sumHtml.innerHTML = '<h2>$' + sum_price + '</h2>';


    } catch (error) {
        console.error('function find_destination error:', error)
    }
    console.log('function find_destination end');

}
function uperCaseFirst(str) {
    console.log('function uperCaseFirst start. string:', str);
    console.log('change to:', str.replace(str.charAt(0), str.charAt(0).toUpperCase()));
    return str.replace(str.charAt(0), str.charAt(0).toUpperCase())

}
function rendering(data, template) {
    console.log('function rendering start. parameters(data, template):', data, template);
    try {
        let array = template.split('{{');
        console.log("template.split('{{'):",array);
        for (let i = 1; i < array.length; i++) {
            let pragment = array[i].split('}}');
            console.log("pragment:",pragment); 
            console.log("data['code']:",data["code"]); 
            console.log("pragment[1]:",pragment[1]);   
            array[i] = data[pragment[0]] + pragment[1];
            console.log('array[i] = data[pragment[0] + pragment[1]]:', data[pragment[0] + pragment[1]])
        }
        console.log('function rendering end. return:', array.join(''));
        return array.join('');
    } catch (error) {
        console.error('the error is:',error);
    }

}



