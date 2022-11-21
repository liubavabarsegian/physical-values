  ///////////////////////////////////////////////////////////////////
 ////////////////// Ч  Е  Р  Н  О  В  И  К /////////////////////////
///////////////////////////////////////////////////////////////////


class hexagon {
    constructor(name, level, coordinateX, coordinateY) {
        this.name = name;
		this.level = level;
		this.x = coordinateX;
		this.y = coordinateY;
    }
	// constructor() {}
	setName(name) {
		this.name = name;
	}
	setLevel(level) {
		this.level = level;
	}
	setX(coordinateX) {
		this.x = coordinateX;
	}
	setY(coordinateY) {
		this.y = coordinateY;
	}
    getName() {
        return this.name;
    }
	getLevel() {
		return this.level;
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
}

//colours for hover
yellowLight = "rgb(223, 223, 145)";
yellowDark = "rgb(196, 196, 95)";
grayLight = "rgb(184, 189, 194)";
grayDark = "rgb(146, 148, 150)";
redLight = "rgb(232, 119, 119)";
redDark = "rgb(171, 59, 59)";

hexagonElements = document.querySelectorAll(".one-hexagon");
clickedHexagons = [];
clickedTwice = false;


//function for color changing

function changeColor(hex, darkColor, lightColor) {
		var inside = hex.querySelector(".inside");
		var leftTriangle = hex.querySelector(".hexagon_triangle_left");
		var rightTriangle = hex.querySelector(".hexagon_triangle_right");

		if (inside.style.background == darkColor) {
			inside.style.background = lightColor;
			leftTriangle.style.borderRightColor = lightColor;
			leftTriangle.borderLeftWidth =  0;
			leftTriangle.borderTopColor = "transparent";
			leftTriangle.borderBottomColor = "transparent";

			rightTriangle.style.borderLeftColor = lightColor;
			rightTriangle.borderRightWidth =  0;
			rightTriangle.borderTopColor = "transparent";
			rightTriangle.borderBottomColor = "transparent";
		} else {
			clickedTwice = true;
			inside.style.background = darkColor;

			leftTriangle.style.borderRightColor = darkColor;
			leftTriangle.borderLeftWidth =  0;
			leftTriangle.borderTopColor = "transparent";
			leftTriangle.borderBottomColor = "transparent";

			rightTriangle.style.borderLeftColor = darkColor;
			rightTriangle.borderRightWidth =  0;
			rightTriangle.borderTopColor = "transparent";
			rightTriangle.borderBottomColor = "transparent";
		}
}




var contextMenuClassName = "context-menu";
  var contextMenuItemClassName = "context-menu__item";
  var contextMenuLinkClassName = "context-menu__link";
  var contextMenuActive = "context-menu--active";

  var taskItemClassName = "menu";
  var taskItemInContext;

  var clickCoords;
  var clickCoordsX;
  var clickCoordsY;

  var menu = document.querySelector("#context-menu");
  var menuItems = menu.querySelectorAll(".context-menu__item");
  var menuState = 0;
  var menuWidth;
  var menuHeight;
  var menuPosition;
  var menuPositionX;
  var menuPositionY;

  var windowWidth;
  var windowHeight;


function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;
    
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }


function toggleMenuOn() {
  if ( menuState !== 1 ) {
    menuState = 1;
    menu.classList.add( contextMenuActive );
  }
}

/**
 * Turns the custom context menu off.
 */
function toggleMenuOff() {
  if ( menuState !== 0 ) {
    menuState = 0;
    menu.classList.remove( contextMenuActive );
  }
}

/**
 * Positions the menu properly.
 * 
 * @param {Object} e The event
 */
function positionMenu(e) {
  clickCoords = getPosition(e);
  clickCoordsX = clickCoords.x;
  clickCoordsY = clickCoords.y;

  menuWidth = menu.offsetWidth + 4;
  menuHeight = menu.offsetHeight + 4;

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  if ( (windowWidth - clickCoordsX) < menuWidth ) {
    menu.style.left = windowWidth - menuWidth + "px";
  } else {
    menu.style.left = clickCoordsX + "px";
  }

  if ( (windowHeight - clickCoordsY) < menuHeight ) {
    menu.style.top = windowHeight - menuHeight + "px";
  } else {
    menu.style.top = clickCoordsY + "px";
  }
}


function clickInsideElement( e, className ) {
    var el = e.srcElement || e.target;
    
    if ( el.classList.contains(className) ) {
      return el;
    } else {
      while ( el = el.parentNode ) {
        if ( el.classList && el.classList.contains(className) ) {
          return el;
        }
      }
    }

    return false;
  }


function clickListener(elem) {
  console.log('clickListener_down')
  document.addEventListener( "click", function(e) {
    var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );
    if ( clickeElIsLink ) {
      e.preventDefault();
      menuItemListener( elem, clickeElIsLink );
    } else {
      var button = e.which || e.button;
      if ( button === 1 ) {
        toggleMenuOff();
      }
    }
  });
}


mas_coordinates = []

for (hex of hexagonElements) {
  // let position = hex.getBoundingClientRect();
  newHex = new hexagon("name", hex.dataset.level, hex.offsetLeft, hex.offsetTop)
  mas_coordinates.push(newHex);
  // console.log(newHex.x, newHex.y)

	hex.addEventListener("click", function(e) {
	// 	//change color

    console.log(this.offsetLeft)
    console.log('click')

		if (this.dataset.level == "yellow") {
			changeColor(this, yellowDark, yellowLight);
		}
		if (this.dataset.level == "gray") {
			changeColor(this, grayDark, grayLight);
		}
		//remember all the data of the clicked element
		if (!clickedTwice) {
			// rememberHexagon(this);
		}
		clickedTwice = false;	 


    var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

    // alert(clickeElIsLink)
    if ( clickeElIsLink ) {
      console.log('if - yes')
      e.preventDefault();
      menuItemListener( clickeElIsLink );
    } 
    else {
      console.log('if - no')
      var button = e.which || e.button;
      if ( button === 1 ) {
        toggleMenuOff();
      }
    }


	})


  hex.addEventListener("contextmenu", function(e) { 

    console.log(this.offsetLeft, this.offsetTop) 

    taskItemInContext = clickInsideElement( e, taskItemClassName );
    if ( taskItemInContext ) {
      e.preventDefault();
      toggleMenuOn();
      positionMenu(e);
      console.log('contextmenu-1')
    } 
    else {
      taskItemInContext = null;
      toggleMenuOff();
      console.log('contextmenu-2')
    }
    // init(e)

})
}




// console.log(hexagonElements[2].offsetLeft, hexagonElements[0].offsetTop)
console.log(mas_coordinates)
