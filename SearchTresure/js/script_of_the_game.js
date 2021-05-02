function getRandomNumber (size) {
    return Math.floor(Math.random()*size);
};

    function getDistance (event, target) {
        var diffX = event.offsetX - target.x; 
        var diffY = event.offsetY - target.y;
        return Math.sqrt((diffX * diffX) + (diffY * diffY));
    };
            
            function getDistanceHit (distance) {
                if (distance < 20) {
                    return "Обожжешься!";
                } else if (distance < 40) {
                    return "Очень горячо."
                } else if (distance < 60) {
                    return "Горячо."
                } else if (distance < 80) {
                    return "Очень тепло."
                } else if (distance < 120) {
                    return "Тепло."
                } else if (distance < 160) {
                    return "Прохладно."
                } else if (distance < 240) {
                    return "Холодно!"
                } else if (distance < 360) {
                    return "Очень холодно!"
                } else if (distance < 480) {
                    return "Холодно, как в тундре!"
                } else {
                    return "Замерзаешь на смерть."
                }
            };

var clicks = 50;
var width = 600;
var height = 600;
var target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
};

$("#map").click(function(event){
clicks--

var distance = getDistance(event, target);
var distanceHit = getDistanceHit(distance);

$("#distance").text("Подсказка: " + distanceHit);
$("#clicks").text("Кол-во оставшихся кликов: " + clicks)

if (clicks === 20) {
alert("Да ты наконец-то найдёшь это клад или нет?")
} else if (clicks === 10) {
alert("Осталось 10 кликов! Смотри на подсказки!")
} else if (clicks === 0) {
alert("Извини, но ты проиграл (-а), неужели так трудно найти такой клад?")
window.location.reload()
}
if (distance < 10) {
alert("Клад найден! Ты нашёл клад и у тебя осталось " + clicks + " попыток.");
window.location.reload()
};
});