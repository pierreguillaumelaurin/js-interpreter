//parser

function tokenize(input) {
	//return array separating javascript's most important keywords
	return input.replace(/\(/g, ' ( ')
		     .replace(/\)/g, ' ) ')
		     .replace(/\{/g, ' { ')
		     .replace(/\}/g, ' } ')
		     .replace(/\;/g, ' ; ')
		     .replace(/var/g, ' var ')
		     .replace(/function/g, ' function ')
		     .trim()
		     .split(/\s+/);
};

function categorize(input) {
	//if input is not integer
	var keywords  = ['typeof','var','while'];
  if (!isNaN(parseFloat(input))) {
  	return { type:'numeric', value: parseFloat(input)};
  }
  else if (input === "(" 
  	       || input === ")" 
  	       || input === ";") {
  	return { type: 'punctuator', value: input};
  }
  else if (keywords.indexOf(input) > -1) {
  	return { type: 'keyword', value: input};
  }
  else if ((input[0] === '"' && input.slice(-1) === '"') 
  	      || ( input[0] === "'" && input.slice(-1) === "'") ) {
  	return { type: 'string', value: input.slice(1,-1)}
  }
};

function makeParseTree(input, list) {
	//produces a nested array of objects with the value structure of our js 
	//keyword ; identifier ; punctuator ; numeric
	if (list === undefined) {
		return makeParseTree(input, []);
	} else {
		var token = input.shift();
		if (token === undefined) {
			return list.pop();
		} else if (token === "{") {
			list.push(makeParseTree(input, []));
			return makeParseTree(input, list);
		} else if ( token === "}") {
			  return list;
			}
			else {
				return makeParseTree(input, list.concat(categorize(token)));
			}
	  }
  };

function pparse(input) {
	return makeParseTree(tokenize(input));
};

allo = pparse('function(a){function(b){allo;} return 2+2*a;};');
console.log(makeParseTree(tokenize('function(a){function(b){allo;} return 2+2*a;};')));

function returnElements(a) {
	for (var i = 0; i <= a.length; i++) {
		for (var y = 0; y <= i.length; y++) {
		  return y;
	  }
	}
}

console.log(allo);
document.getElementById("pparse").innerHTML = allo.type;

//interpreter

