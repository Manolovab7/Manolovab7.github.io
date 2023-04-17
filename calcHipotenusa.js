function valHipotenusa (cat1, cat2){
   // var hip;
   // Math.pow(hip,2) = math.pow(cat1) + math.pow(cat2);
    // return hip;
   const somaQuad = Math.pow(cat1,2) + Math.pow(cat2,2);
   const hip = Math.sqrt(somaQuad);
   return hip;
}
const cat1 = 7;
const cat2 = 8;

const hip = valHipotenusa(cat1, cat2);
console.log(`a hipotenusa é ${hip}`);