function fahrCelsius ( F ){
 var celc = (5 * (F - 32))/9;
 return celc;
}

var F = 100;
var celc = fahrCelsius (F);

console.log(celc);
