let BaseUrl = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_kwnK5tqeBjqeCV5g0GXYPQNUZACb2XKLtnTm7JGB"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;

        if(select.name ==="from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name ==="to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
    UpdateFlag(evt.target);
});
}

const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    console.log(amtval);
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
    const URL = `${BaseUrl}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    let rate = data.data[toCurr.value];
    console.log(rate);
    console.log(JSON.stringify(data, null, 2));
    let finalAmount = rate * amtval;
    msg.innerText = (`${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`)
}

const UpdateFlag = (element) =>{
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) =>{
    evt.preventDefault(); 
    updateExchangeRate();
    
});

window.addEventListener("load", () =>{
    updateExchangeRate();
});