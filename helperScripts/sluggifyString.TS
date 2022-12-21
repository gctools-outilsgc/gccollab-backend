export const sluggify = (input) => {
  let wordArray = input.split(" ");
  let characterCount = wordArray.join("-").length;
  let slug;
  if (characterCount < 100) {
    slug = wordArray.join("_");
  } else {
    while (characterCount > 100) {
      wordArray.pop();

      characterCount = wordArray.join("_").length;

      slug = wordArray.join("_");
    }
  }

  return slug;
};
