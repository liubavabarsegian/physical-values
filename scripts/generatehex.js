let data = {
  row1: {
    hex1: {
      color: "yellow",
      name: "",
      MLT: "L<sup>2</sup>T",

    },
    hex2: {
      color: "yellow",
      name: "Объем, V",
      MLT: "L<sup>3</sup>",
      
    },
    hex3: {
      color: "yellow",
      name: "Поток объема, Vv",
      MLT: "L<sup>4</sup>T<sup>-1</sup>",
      
    },
    hex4: {
      color: "gray",
      name: "Момент инерции, I = mr<sup>2</sup>",
      MLT: "ML<sup>2</sup>",
      
    },
  },
  row2: {
    hex5: {
      color: "yellow",
      name: "",
      MLT: "LT",
      
    },
    hex6: {
      color: "yellow",
      name: "Площадь, S",
      MLT: "L<sup>2</sup>",
      
    },
    hex7: {
      color: "yellow",
      name: "Изменение объема, V/t",
      MLT: "L<sup>3</sup>T<sup>-1</sup>",
      
    },
    hex8: {
      color: "yellow",
      name: "?",
      MLT: "ML",
      
    },
    hex9: {
      color: "gray",
      name: "Момент импульса,L = mvr = nh",
      MLT: "ML<sup>2</sup>T<sup>-1</sup>",
      
    },
  },
  row3: {
    hex10: {
      color: "yellow",
      name: "Время, <var>t</var>",
      MLT: "T",
      
    },
    hex11: {
      color: "yellow",
      name: "Длина, <var>l</var>",
      MLT: "L",
      
    },
    hex12: {
      color: "yellow",
      name: "Вязкость кинематич.",
      MLT: "L<sup>2</sup>T<sup>-1</sup>",
      
    },
    hex13: {
      color: "gray",
      name: "Масса, m",
      MLT: "M",
      
    },
    hex14: {
      color: "gray",
      name: "Импульс, P = mv",
      MLT: "MLT<sup>-1</sup>",
      
    },
    hex15: {
      color: "gray",
      name: "Энергия, W",
      MLT: "ML<sup>2</sup>T<sup>-2</sup>",
      
    }
  },
  row4: {
    hex16: {
      color: "yellow",
      name: "(Скорость)<sup>-1</sup>, <var>t/l</var>",
      MLT: "L<sup>-1</sup>T",
      
    },
    hex17: {
      color: "yellow",
      name: "Безразмерная константа",
      MLT: "L<sup>0</sup>T<sup>0</sup>",
      
    },
    hex18: {
      color: "yellow",
      name: "Скорость, v",
      MLT: "LT<sup>-1</sup>",
      
    },
    hex19: {
      color: "yellow",
      name: "Гравитацион. потенциал, V<sup>2</sup>",
      MLT: "LT<sup>-1</sup>",
      
    },
    hex20: {
      color: "gray",
      name: "Ток массы, m/t",
      MLT: "MT<sup>-1</sup>",
      
    },
    hex21: {
      color: "gray",
      name: "Сила, F",
      MLT: "MLT<sup>-2</sup>",
      
    },
    hex22: {
      color: "gray",
      name: "Мощность, N",
      MLT: "ML<sup>2</sup>T<sup>-3</sup>",
      
    }
  },
  row5: {
    hex23: {
      color: "yellow",
      name: "Кривизна пространства,",
      MLT: "L<sup>-1</sup>",
      
    },
    hex24: {
      color: "yellow",
      name: "ГРадиент скорости",
      MLT: "T<sup>-1</sup>",
      
    },
    hex25: {
      color: "yellow",
      name: "Ускорение, a",
      MLT: "LT<sup>-2</sup>",
      
    },
    hex26: {
      color: "gray",
      name: "Вязкость динамическая",
      MLT: "MLT<sup>-1</sup>T<sup>-1</sup>",
      
    },
    hex27: {
      color: "gray",
      name: "Натяжение, f = <var>F/l</var>",
      MLT: "MT<sup>-2</sup>",
      
    },
    hex28: {
      color: "gray",
      name: "Изменение силы F/t",
      MLT: "MLT<sup>-3</sup>",
      
    }
  },

  row6: {
    hex29: {
      color: "yellow",
      name: "Градиент углов. скорости (вихрь)",
      MLT: "L<sup>-1</sup>T<sup>-1</sup>",
      
    },
    hex30: {
      color: "gray",
      name: "Объемная плотность массы p<sub>m</sub>",
      MLT: "ML<sup>-3</sup>",
      
    },
    hex31: {
      color: "gray",
      name: "Объемн. плотн. импульса p<sub>m</sub>v",
      MLT: "ML<sup>-2</sup>T<sup>-1</sup>",
      
    },
    hex32: {
      color: "gray",
      name: "Давление, p = F/S",
      MLT: "ML<sup>-1</sup>T<sup>-2</sup>",
      
    },
    hex33: {
      color: "gray",
      name: "Вектор Умова, s",
      MLT: "MT<sup>-3</sup>",
      
    }
  },

  row7: {
    hex34: {
      color: "gray",
      name: "Градиент объемной плотности массы",
      MLT: "ML<sup>-4</sup>",
      
    },
    hex35: {
      color: "gray",
      name: "Изменение объемной плотности массы",
      MLT: "ML<sup>-3</sup>T<sup>-1</sup>",
      
    },
    hex36: {
      color: "gray",
      name: "Градиент давление",
      MLT: "ML<sup>-2</sup>T<sup>-2</sup>",
      
    },
    hex37: {
      color: "gray",
      name: "Изменение давления",
      MLT: "ML<sup>-1</sup>T<sup>-3</sup>",
      
    }
  }
}

createTable("newf",data)

function createTable(id,tableData) {
  Ntable = document.getElementById(id)
  for (let row in tableData) {
    Ntable.appendChild(createRow(tableData[row]))
  }
}

function createRow(rowData) {
  newRow = document.createElement("div")
  newRow.classList.add("row")
  for (let hex in rowData) {
    newRow.appendChild(createHexagon(rowData[hex],hex))
  }
  return newRow
}

function createHexagon(hexData,name) {
  newHex = document.createElement("div")
  newHex.setAttribute("data-level",hexData.color)
  newHex.setAttribute("id",name)
  newHex.classList.add("one-hexagon","menu")
  leftTriangle = document.createElement("div")
  leftTriangle.classList.add("triangleLeft",`hexagon-${hexData.color}`)
  rightTriangle = document.createElement("div")
  rightTriangle.classList.add("triangleRight",`hexagon-${hexData.color}`)
  hexText = document.createElement("div")
  hexText.classList.add("inside",hexData.color)
  label = document.createElement("p")
  label.innerHTML = hexData.name
  mlt2 = document.createElement("p")
  mlt2.innerHTML = hexData.MLT
  hexText.appendChild(label)
  hexText.appendChild(mlt2)
  newHex.appendChild(leftTriangle)
  newHex.appendChild(hexText)
  newHex.appendChild(rightTriangle)
  return newHex
}
