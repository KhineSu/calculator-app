import React from "react";
import "./App.css";

const NUM = [
  {
    numId: "one",
    value: "1",
  },
  {
    numId: "two",
    value: "2",
  },
  {
    numId: "three",
    value: "3",
  },
  {
    numId: "four",
    value: "4",
  },
  {
    numId: "five",
    value: "5",
  },
  {
    numId: "six",
    value: "6",
  },
  {
    numId: "seven",
    value: "7",
  },
  {
    numId: "eight",
    value: "8",
  },
  {
    numId: "nine",
    value: "9",
  },
  {
    numId: "zero",
    value: 0,
  },
];
const OPERTAIONS = [
  {
    opId: "add",
    value: "+",
  },
  {
    opId: "subtract",
    value: "-",
  },
  {
    opId: "multiply",
    value: "*",
  },
  {
    opId: "divide",
    value: "/",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opArray: [],
      display: "",
      solution: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.solve = this.solve.bind(this);
    this.checkDecimal = this.checkDecimal.bind(this);
  }
  handleClick(value) {
    const currentStr = this.state.display.toString();
    if (value == 0) {
      currentStr.endsWith("0")
        ? console.log("double zero not allowed")
        : this.setState((state) => {
            return { display: state.display + value };
          });
    } else {
      this.setState((state) => {
        return { display: state.display + value };
      });
    }
  }
  solve() {
    this.setState((state) => {
      const tempStr = eval(state.display.toString());
      // const tempStr = new Function("return " + state.display.toString())();
      console.log("to solve", tempStr);
      return {
        solution: tempStr,
      };
    });
  }
  clear() {
    this.setState({
      display: "",
      solution: "",
    });
  }
  checkDecimal() {
    const disStr = this.state.display.toString();
    if (
      disStr.endsWith(".") ||
      (disStr.includes(".") &&
        !disStr.includes("+") &&
        !disStr.includes("-") &&
        !disStr.includes("*") &&
        !disStr.includes("/"))
    ) {
      console.log("double decimal not allowed");
    } else {
      this.handleClick(".");
    }
  }
  render() {
    const numPad = NUM.map((num, index) => {
      return (
        <button
          id={num.numId}
          className="pad col-4"
          key={index}
          onClick={() => this.handleClick(num.value)}
          value={num.value}
        >
          {num.value}
        </button>
      );
    });
    const operationPad = OPERTAIONS.map((op, index) => {
      return (
        <button
          id={op.opId}
          className="pad col-3"
          key={index}
          value={op.value}
          onClick={() => this.handleClick(op.value)}
        >
          {op.value}
        </button>
      );
    });

    return (
      <div className="row text-center">
        <div className="col-2 mx-auto">
          {numPad}
          <br />
          {operationPad}
          <button
            id="decimal"
            className="pad col-4"
            value="."
            onClick={() => {
              this.checkDecimal();
            }}
          >
            .
          </button>
          <button id="clear" className="pad col-4" onClick={() => this.clear()}>
            AC
          </button>
          <button
            id="equals"
            className="pad col-4"
            onClick={() => this.solve()}
          >
            =
          </button>
        </div>
        <div className="col-1" id="display">
          {this.state.display == "" ? 0 : this.state.display}
        </div>
        <div className="col-1" id="solution">
          {this.state.solution}
        </div>
      </div>
    );
  }
}

export default App;
