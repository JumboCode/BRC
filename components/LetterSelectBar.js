import { Component } from "react"

class Letter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    onClick = () => {
        this.props.onLetterClicked(this.props.letter)
    }

    render(){
        return(
            <p style={this.props.styleLetter} onClick = {this.onClick}>{this.props.letter}</p>
        )
    }
}

class Clear extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    onClick = () => {
        this.props.onClearClicked()
    }

    render(){
        return(
            <p style={LetterStyle} onClick = {this.onClick}>Clear</p>
        )
    }
}

Letter.propTypes = {
    letter: React.PropTypes.string.isRequired,
    letterClicked: React.PropTypes.function.isRequired
};

Letter.defaultProps = {
    letter: "A",
    onLetterClicked: (letter) => {console.log("Clicked letter")}
}

Clear.propTypes = {
    clearClicked: React.PropTypes.function.isRequired
};

Clear.defaultProps = {
    onClearClicked: (clear) => { console.log("Selection cleared") }
};

const LetterSelectBarStyle = {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '20px',
    fontFamily: 'sans-serif'  // find out if a different font is needed
}

const LetterStyle = {
    paddingRight: '10px',
    color: '#707070',
    cursor: "pointer",
}

const ActiveLetter = {
    paddingRight: '10px',
    color: '#F293C1',
    textDecoration: 'underline',
    cursor: "pointer",
}


class LetterSelectBar extends Component{
    constructor(props){
        super(props);
        this.onLetterClicked = this.onLetterClicked.bind(this)
        this.onClearClicked = this.onClearClicked.bind(this)
        this.state = {};
    }

    onLetterClicked(letter){
        this.props.onLetterClicked(letter)
    }

    onClearClicked(){
        this.props.onClearClicked()
    }

    render() {
        let sections = []
        let filters = this.props.letters;
        for (let i = 0; i < filters.length; i++){
            let character = filters[i]
            var letterStyle = LetterStyle
            if (character === this.props.selected) {
                letterStyle = ActiveLetter
            }
            sections.push(<Letter key ={i} letter={character} styleLetter = {letterStyle} onLetterClicked = {this.onLetterClicked}></Letter>)
        }

        sections.push(<Clear key={-1} onClearClicked = {this.onClearClicked}></Clear>)

        return(
            <div style={LetterSelectBarStyle} className = "LetterSelectBar">
                {sections}
            </div>
        )
    }
}

LetterSelectBar.propTypes = {
    letters: React.PropTypes.array.isRequired,
    letterClicked: React.PropTypes.function.isRequired,
    clearClicked: React.PropTypes.function.isRequired
};

LetterSelectBar.defaultProps = {
    letter: "A",
    onLetterClicked: (letter) => {console.log("Returning letter " + letter)},
    onClearClicked: (clear) => { console.log("You clicked the clear button!")}
}


export default LetterSelectBar;
