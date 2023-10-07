function computePhoneticCode(str, language = 'english') {
  // Step 1: Remove leading spaces and convert to uppercase
  str = str.trim().toUpperCase();
  
  // Step 2: Keep the first letter
  const firstLetter = str.charAt(0);

  // Step 3: Remove specified vowels and letters
  const vowels = language === 'french' ? 'AEIOUY' : 'AEHIOUWY';
  let code = firstLetter;
  for (let i = 1; i < str.length; i++) {
    const char = str.charAt(i);
    if (!vowels.includes(char)) {
      code += char;
    }
  }

  // Step 4: Assign numeric values
  const letterToValue = language === 'french' ? {
    'B': 1, 'P': 1,
    'C': 2, 'K': 2, 'Q': 2,
    'D': 3, 'T': 3,
    'L': 4,
    'M': 5, 'N': 5,
    'R': 6,
    'G': 7, 'J': 7,
    'X': 8, 'Z': 8, 'S': 8,
    'F': 9, 'V': 9
  } : {
    'B': 1, 'F': 1, 'P': 1, 'V': 1,
    'C': 2, 'G': 2, 'J': 2, 'K': 2, 'Q': 2, 'S': 2, 'X': 2, 'Z': 2,
    'D': 3, 'T': 3,
    'L': 4,
    'M': 5, 'N': 5,
    'R': 6
  };

  let phoneticCode = '';
  for (let i = 0; i < code.length; i++) {
    const char = code.charAt(i);
    if (i === 0 || char !== code.charAt(i - 1)) {
      phoneticCode += letterToValue[char];
    }
  }

  // Step 5: Return the first 4 characters padded with zeros
  while (phoneticCode.length < 4) {
    phoneticCode += '0';
  }
  
  return phoneticCode;
}

/**
 * Compares two strings for phonetic similarity using the Soundex algorithm.
 *
 * @param {string} str1 - The first string to compare.
 * @param {string} str2 - The second string to compare.
 * @returns {boolean} `true` if the strings are phonetically alike according to Soundex, `false` otherwise.
 */
export function areStringsPhoneticallyAlike(str1, str2) {
    const soundex1 = computePhoneticCode(str1);
    const soundex2 = computePhoneticCode(str2);

    // Compare the Soundex codes for phonetic similarity
    return soundex1 === soundex2;
}
