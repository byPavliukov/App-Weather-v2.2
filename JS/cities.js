const cities = {
    '703448': "Kyiv",
    '702550': "Lviv",
    '698740': "Odessa",
    '706483': "Kharkiv",
    '709717': "Donetsk",
    '709930': "Dnipro",
    '693805': "Simferopol",
    '686967': "Zhytomyr",
    '687700': "Zaporizhia",
    '690548': "Uzhgorod",
    '689558': "Vinnytsia",
    '691650': "Ternopil",
    '692194': "Sumy",
    '695594': "Rivne",
    '696643': "Poltava",
    '700568': "Mykolaiv",
    '702658': "Luhansk",
    '705812': "Kropyvnytskyi",
    '706369': "Khmelnytskyi",
    '706448': "Kherson",
    '707471': "Ivano-Frankivsk",
    '710719': "Chernivtsi",
    '710735': "Chernihiv",
    '710791': "Cherkasy"
}

let selCity = document.createElement('select');
selCity.classList.add('city');
selCity.classList.add('fw-600');
selCity.id = 'city';
document.querySelector('.select-city').append(selCity);
let optCity;

// Loop for filling select with values
for (let key in cities) {
    optCity = document.createElement('option');
    optCity.value = key;
    optCity.textContent = cities[key];
    selCity.append(optCity);
    if (optCity.textContent == 'Kyiv') optCity.setAttribute('selected',"");
}
