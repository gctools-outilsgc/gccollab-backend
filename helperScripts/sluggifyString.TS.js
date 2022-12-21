var sluggify = function (input) {
    var wordArray = input.split(" ");
    var characterCount = wordArray.join("-").length;
    var slug;
    if (characterCount < 100) {
        slug = wordArray.join("_");
    }
    else {
        while (characterCount > 100) {
            wordArray.pop();
            characterCount = wordArray.join("_").length;
            slug = wordArray.join("_");
        }
    }
    return slug;
};
console.log(sluggify("erhere erheur erkhjer ergerg 45tfd 5fdgfdg 45fdsfb 45rfbf 45tgdfgfs 5tjgdsg 6756utgdsf 345tgherhg 4yrehdrh 5trthfegh e4rtrth rtrthr rthr 54 yrthgrether"));
