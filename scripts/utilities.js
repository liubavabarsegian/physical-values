function getNGK(hex,number) {
  return hex[number][Object.keys(hex[number])[0]]
}

function findGK(hex,reqGK) { 
  return hex.find(gk => Object.keys(gk) == reqGK)
}

// ⁰,⁻¹,⁻²,⁻³,⁻⁴,⁻⁵,⁻⁶,⁻⁷,⁻⁸,⁻⁹ 

function replacePowNumbersBtoS(string) {
  return string.replace(/0/g,"⁰").replace(/1/g,"¹").replace(/2/g,"²").replace(/3/g,"³").replace(/4/g,"⁴").replace(/5/g,"⁵")
               .replace(/6/g,"⁶").replace(/7/g,"⁷").replace(/8/g,"⁸").replace(/9/g,"⁹").replace(/-/g,"⁻")
}

function replacePowNumbersStoB(string) {
  return string.replace(/⁰/g,"0").replace(/¹/g,"1").replace(/²/g,"2").replace(/³/g,"3").replace(/⁴/g,"4").replace(/⁵/g,"5")
               .replace(/⁶/g,"6").replace(/⁷/g,"7").replace(/⁸/g,"8").replace(/⁹/g,"9").replace(/⁻/g,"-")
}

function getMLT(hex) {
  mlti = ""
  if (hex.M == 1) {
    mlti += `M`
  } else if (hex.M != 0) {
    mlti += `M${hex.M}`
  }
  if (hex.L == 1) {
    mlti += `L`
  } else if (hex.L != 0) {
    mlti += `L${hex.L}`
  }  
  if (hex.T == 1) {
    mlti += `T`
  } else if (hex.T != 0) {
    mlti += `T${hex.T}`
  }  
  if (hex.I == 1) {
    mlti += `I`
  } else if (hex.I != 0) {
    mlti += `I${hex.I}`
  }
  return replacePowNumbersBtoS(mlti)
}

menu = document.querySelector(".context-menu__items");

function getHexData(hex) {
  return getNGK(data[hex.parentElement.id][hex.id],0)
}

function addHexEventListeners() {
  menuArea = document.querySelectorAll(".one-hexagon");

	for (hex of menuArea) {

		hex.addEventListener("contextmenu", function(event) {
			event.preventDefault();
			menu.style.top = `${event.clientY}px`;
					menu.style.left = `${event.clientX}px`;
			menu.classList.add("active");
		});
	
		hex.addEventListener("click", function() {
				if (!this.querySelector(".inside").classList.contains("active-hexagon")) {
				Activate(this)
				rememberHexagon(this);
				} 

	
	
				
		});
	}
}

function getMainHexFromSiblings(element) {
  while (!element.classList.contains("one-hexagon")) {
    element = element.parentElement
  }
  return element
}

function writeIntoObjFromInput(object,field,id) {
	input = document.getElementById(id)
  val = input.value
  if (input.getAttribute('type') != "number") {
  val = replacePowNumbersBtoS(val)
  }
	object[field] = val
}

function writeIntoInputFromObject(object,field,id) {
	input = document.getElementById(id)
  val = object[field]
  if (typeof val == "string") {
    val = replacePowNumbersStoB(val)
  }
	input.value = val
}

