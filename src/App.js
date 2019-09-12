// im so sorry this code is literally spaghetti but I promise i can write readible code LOL
import React from 'react';
import './App.css';

const INITIAL_STATE = {
  showEquationList: [],
  activeSquareId: null, //integer
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      n: 1,
      input: 1, //integer
    };

    this.equations = [];

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  onChange(e) {
    this.setState({
      input: parseInt(e.target.value),
    });
  }

  onClick() {
    this.setState(state => ({
      ...INITIAL_STATE,
      n: state.input,
    })); //reset state pretty much
  }

  handleSquareClick(id) {
    this.setState(state => {
      const showEquationList = state.showEquationList;

      // if square has not been clicked before, add it to the show list
      if(!showEquationList.includes(id)) {
        showEquationList.push(id);
      }

      return {
        activeSquareId: id,
        showEquationList,
      }
    });
  }

  render() {
    let { n, showEquationList } = this.state;

    let table = [];
    let numItems = 0;
    this.equations = [];

    for(let i=0; i<=n; i++) {
      if(i===0) {
        // first row

        let items=[];
        items.push(<div class="heading">x</div>);
        for(let j=1; j<=n; j++) {
          items.push(<div class="heading">{j}</div>);
        }
        table.push(<div class="row">
          {items}
        </div>);
      } else {
        // remaining rows
        let items = [];
        items.push(<div class="heading">{i}</div>)
        for(let j=1; j<=n; j++) {
          items.push(<Square id={numItems} show={numItems===this.state.activeSquareId} value={i*j} handleSquareClick={this.handleSquareClick} />);
          numItems++;
          this.equations.push(`${i} x ${j} = ${i*j}`);
        }
        table.push(<div class="row">
          {items}
        </div>)
      }
    }

    // create history component
    let history = [];
    for(let i=0; i<numItems; i++) {
      if(showEquationList.includes(i)) {
        history.push(<p>{this.equations[i]}</p>);
      };
    }

    return (
      <div className="App">
        <input onChange={this.onChange} placeholder="number of rows" id="n" type="number" />
        <input onClick={this.onClick} type="button" value="GO" />

        <div class="container">
          <div class="table-container">
            {table}
          </div>

          <div class="history">
            <h1>History</h1>
            {history}
          </div>
        </div>
      </div>
    );
  }
}

let Square = ({id, value, show, handleSquareClick}) => {
  return (
    <div onClick={()=>handleSquareClick(id)} className={`item ${show ? 'show' : ''}`}><span>{value}</span></div>
  );
};

export default App;
