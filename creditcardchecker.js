// Sample valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// Sample invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

//Function to turn string input to numbered array. Can be used to create any number of arrays containing credit cards
const numberCC = (str) => {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= 0 && str[i] < 10) {
      arr.push(parseInt(str[i]));
    } else {
      console.log("Please input 0 - 9 digits");
      break;
    }
  }
  return arr;
};

// console.log(numberCC('1234567812345678'))

// Below function validates the credit cards using Luhn algorithm and returns true or false.

const validateCred = (arr) => {
  let evens = 0;
  let odds = 0;
  //Iterating from last digit to the first (every other)
  for (let i = arr.length - 1; i >= 0; i -= 2) {
    evens = evens + arr[i];
    // console.log(evens)
  }
  // console.log('Even: ' + evens)
  //Iterating from second last digit to the first (every other)
  for (let j = arr.length - 2; j >= 0; j -= 2) {
    let double = arr[j] * 2;
    // console.log(double)
    if (double > 9) {
      odds += double - 9;
    } else {
      odds += double;
    }
  }
  // console.log('Odds: ' + odds)
  // Adds the sum of all numbers (including Luhn's algo)
  let total = evens + odds;
  // console.log('total: ' + total)
  if (total % 10 === 0) {
    return true;
  } else {
    return false;
  }
};
// console.log(validateCred(invalid1))

// Invalid cards function checks array of arrays with credit numbers by calling validateCred function and returning an array of invalid cards
const findInvalidCards = (nestedArr) => {
  let invalidCards = [];
  for (let i = 0; i < nestedArr.length; i++) {
    if (validateCred(nestedArr[i]) === false) {
      invalidCards.push(nestedArr[i]);
    }
  }
  return invalidCards;
};
let invalidNestedArr = findInvalidCards(batch);
// console.log(invalidNestedArr)

//Looping through array of invalid cards array and returning names of credit card companies associated with the delivery of faulty cards
const idInvalidCardCompanies = (invalidNestedArr) => {
  let companies = [];
  for (let i = 0; i < invalidNestedArr.length; i++) {
    if (invalidNestedArr[i][0] === 3) {
      {
        //if 'Amex doesn't exist in the array companies ONLY then push 'Amex' into the array to avoid duplicacy
        if (companies.indexOf("Amex") === -1) {
          companies.push("Amex");
        }
      }
    } else if (invalidNestedArr[i][0] === 4) {
      {
        if (companies.indexOf("Visa") === -1) {
          companies.push("Visa");
        }
      }
    } else if (invalidNestedArr[i][0] === 5) {
      {
        if (companies.indexOf("Mastercard") === -1) {
          companies.push("Mastercard");
        }
      }
    } else if (invalidNestedArr[i][0] === 6) {
      {
        if (companies.indexOf("Discover") === -1) {
          companies.push("Discover");
        }
      }
    } else {
      console.log("Company not found");
    }
  }
  return companies;
};

// All the results are showing correctly as they should

console.log(idInvalidCardCompanies([invalid1])); // Should print['Visa']
console.log(idInvalidCardCompanies([invalid2])); // Should print ['Mastercard']
console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards
