const DNA_BASES = ['A', 'T', 'C', 'G'];

// Returns a random DNA base
const returnRandBase = (dnaBases) => {
  return dnaBases[Math.floor(Math.random() * dnaBases.length)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase(DNA_BASES));
  }
  return newStrand;
};

function pAequorFactory(idNr, arrDNA15) {
  return {
    specimenNum: idNr,
    arrDNA15: arrDNA15,
    mutate: function() {
      let randomIndex = Math.floor(Math.random()*this.arrDNA15.length);
      let oldBase = this.arrDNA15[randomIndex];
      let dnaBases = DNA_BASES.filter(element => oldBase !== element );
      this.arrDNA15[randomIndex] = returnRandBase(dnaBases);
      return this.arrDNA15;
      // console.log("old: ", oldBase);
      // console.log("new: ", this.arrDNA15[randomIndex])
      // console.log("\n");
    },
    compareDNA: function(pAequor) {
      let counter = 0;
      this.arrDNA15.map((element, index) => {
        if(pAequor.arrDNA15[index] === element)
          counter++;
      });
      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${Math.round(counter/15 * 100)}% DNA in common.`);
    },
    willLikleySurvive() {
      let counter = 0;
      this.arrDNA15.map(element => {
        if(element === 'C' || element === 'G')
          counter++;
      });
      if(counter/15 > 0.6) {
        return true;
      } else {
        return false; 
      }
    }
  }
    
}

let id = 1;

let arrSurviver = [];

while(arrSurviver.length<=30) {
    let pAequor = pAequorFactory(id, mockUpStrand());
    if(pAequor.willLikleySurvive()) {
      arrSurviver.push(pAequor);
    }
    id++;
    if(id>1000000) {
      console.log('to long:', arrSurviver.length);
      break;
    }
}
console.log("Surviver: ", arrSurviver);



