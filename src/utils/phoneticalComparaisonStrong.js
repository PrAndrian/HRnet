/**
 * Calculates the Soundex code for a given string.
 *
 * @param {string} str - The input string for which to calculate the Soundex code.
 * @returns {string} The calculated Soundex code for the input string.
 */
function calculateSoundex(str) {
    const upperStr = str.toUpperCase();
    const firstLetter = upperStr.charAt(0);
    
    // Replace certain letters with their corresponding Soundex digits
    const soundexMap = {
        B: '1', F: '1', P: '1', V: '1',
        C: '2', G: '2', J: '2', K: '2', Q: '2', S: '2', X: '2', Z: '2',
        D: '3', T: '3',
        L: '4',
        M: '5', N: '5',
        R: '6'
    };

    // Initialize the Soundex code with the first letter of the string
    let soundexCode = firstLetter;

    for (let i = 1; i < upperStr.length; i++) {
        const char = upperStr.charAt(i);
        const soundexDigit = soundexMap[char];
        
        // Ignore characters that don't have a Soundex mapping
        if (soundexDigit) {
        // Ignore consecutive duplicate digits
        if (soundexDigit !== soundexCode.charAt(soundexCode.length - 1)) {
            soundexCode += soundexDigit;
        }
        }
    }

    // Pad with zeros to make it 4 characters long
    soundexCode = soundexCode.padEnd(4, '0');

    return soundexCode;
}

/**
 * Compares two strings for phonetic similarity using the Soundex algorithm.
 *
 * @param {string} str1 - The first string to compare.
 * @param {string} str2 - The second string to compare.
 * @returns {boolean} `true` if the strings are phonetically alike according to Soundex, `false` otherwise.
 */
export function areStringsPhoneticallyAlike(str1, str2) {
    const soundex1 = calculateSoundex(str1);
    const soundex2 = calculateSoundex(str2);

    // Compare the Soundex codes for phonetic similarity
    return soundex1 === soundex2;
}