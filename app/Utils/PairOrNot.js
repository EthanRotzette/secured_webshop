//converti une lettre en nombre pour après déterminé si c'est pair ou impair puis retourne une booléenne true = pair et false = impair
function PairOrNot(word) {
    const letter = word[0]

    //console.log(letter)

    const number = parseInt(letter, 36) - 9; // trouvé sur https://tzi.fr/js/convertir-lettres-en-nombres/

    //console.log(number)

    if(number % 2){
        return true
    }
    else{
        return false
    }
}

module.exports = PairOrNot