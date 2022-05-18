const encodeBtn = document.getElementById('encode-btn');
const encodedResult = document.getElementById('encoded-result');




const base64Table = {};
for (let i=0; i<26; i++) {
  base64Table[i] = String.fromCharCode(65 + i);
};

for (let i=0; i<26; i++) {
  base64Table[i+26] = String.fromCharCode(97 + i);
}

for (let i=0; i<10; i++) {
  base64Table[i+52] = (i).toString();
}
base64Table[62] = "+";
base64Table[63] = "/";



function deciToBin(decimalNumber) {
  let binaryNumber = [];
  let n = 7
  while (decimalNumber >= 0 && n >= 0) {
    if (decimalNumber >= 2**n) {
      decimalNumber -= 2**n;
      binaryNumber.push("1");
    } else {
      binaryNumber.push("0");
    }
    n -= 1
  };
  return binaryNumber.join('');
};


function reverseString(str) {
  return str.split("").reverse().join("");
}
function binToDeci(binaryString) {
  let binStr = reverseString(binaryString);
  let decimalNumber = 0;

  for (let i=0; i<binStr.length; i++) {
    if (binStr[i] === "1") {
      let binVal = 1 * 2**i;
      decimalNumber += binVal; 
    }
    else {
      continue;
    }
  };
  return decimalNumber;
};


function encoder64Base(string) {
  let str24Bit = ""
  for (let i=0; i<string.length; i++) {
    const ascii = string.charCodeAt(i);
    const dtb = deciToBin(ascii);
    str24Bit += dtb
  }

  let sextets = [];
  while (str24Bit.length != 0) {
    let slice6Bit = str24Bit.slice(0,6).padEnd(6,'0');
    let str6Bit = sextets.push(slice6Bit);
    str24Bit = str24Bit.substring(6)
  };

  let sextetsDeci = [];
  for (let i=0; i<sextets.length; i++) {
    sextetsDeci.push(binToDeci(sextets[i]));
  }

  let str64Base = "";
  for (let i=0; i<sextetsDeci.length; i++) {
    if (sextetsDeci[i] in base64Table) {
      str64Base += base64Table[sextetsDeci[i]];
    }
  }
  return str64Base;

};


encodeBtn.addEventListener('click', function() {
  let toEncodeValue = document.getElementById('string-to-encode').value;
  // console.log(encoder64Base(toEncodeValue));
  encodedResult.innerHTML = encoder64Base(toEncodeValue);
});