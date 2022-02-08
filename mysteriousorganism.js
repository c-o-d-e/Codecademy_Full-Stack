// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Template function that creates organisms objects with properties such as numbers, DNA array, some methods like mutate and compare.
function pAequorFactory(num, arr) {
  return {
    specimenNum: num,
    dna: arr,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },

    compareDNA(pAequor) {
      //Reduces down to one number after looping through current object's dna array with a second organism
      const similarity = this.dna.reduce(
        (previousValue, currentValue, currentIndex, array) => {
          if (array[currentIndex] === pAequor.dna[currentIndex]) {
            return previousValue + 1;
          } else {
            return previousValue;
          }
        },
        0
      );
      // console.log(similarity)
      const similarityPercentage = (similarity / this.dna.length) * 100;
      // console.log(similarityPercentage)
      const percentTo2Deci = similarityPercentage.toFixed(2);
      console.log(
        `Species Number: ${this.specimenNum} and Species Number: ${pAequor.specimenNum} have ${percentTo2Deci}% DNA similarity.`
      );
    },

    willLikelySurvive() {
      const similarity = this.dna.filter((el) => el === "C" || el === "G");
      //   console.log(similarity);
      const percent = (similarity.length / this.dna.length) * 100;
      //60% of the DNA base must have C and G strands.
      if (percent > 60) {
        return true;
      } else {
        return false;
      }
    },
  };
}

// const monster1 = pAequorFactory(1, mockUpStrand());
// const monster2 = pAequorFactory(2, mockUpStrand());

// console.log(monster1);
// console.log(monster2);

// console.log(monster1.compareDNA(monster2));
// console.log(monster1.willLikelySurvive());
// console.log(monster2.willLikelySurvive());

//Creates an array of 30 organisms object by calling the function pAequorFactory and the ones that are likely to survive
let organisms = [];
let counter = 1;

while (organisms.length < 30) {
  let species = pAequorFactory(counter, mockUpStrand());
  if (species.willLikelySurvive()) {
    organisms.push(species);
  }
  counter++;
}

console.log(organisms);
