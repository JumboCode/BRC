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
            <p onClick = {this.onClick}>{this.props.letter}</p>
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

const LetterSelectBarStyle = {
    display: 'flex',
    justifyContent: 'center'
}


class LetterSelectBar extends Component{
    constructor(props){
        super(props);
        this.onLetterClicked = this.onLetterClicked.bind(this)
        this.state = {};
    }

    // Generate a list of the alphabet starting from 
    // startChar and ending at endChar inclusive
    genAlphabet(startChar, endChar){
        var i = startChar.charCodeAt(0)
        var j = endChar.charCodeAt(0)
        var alphabet = []

        for(i; i <= j; i++){
            alphabet.push(String.fromCharCode(i))
        }
        return alphabet
    }

    onLetterClicked(letter){
        this.props.onLetterClicked(letter)
    }

    render() {
        let sections = []
        let filters = this.props.letters;
        for (let i = 0; i < filters.length; i++){
            let character = filters[i]
            sections.push(<Letter key = {i} letter={character} onLetterClicked = {this.onLetterClicked}></Letter>)
        }

        return(
            <div style={LetterSelectBarStyle} className = "LetterSelectBar">
                {sections}
            </div>
        )
    }
}

LetterSelectBar.propTypes = {
    letters: React.PropTypes.array.isRequired,
    letterClicked: React.PropTypes.function.isRequired
};

LetterSelectBar.defaultProps = {
    letter: "A",
    onLetterClicked: (letter) => {console.log("Returning letter " + letter)}
}


export default LetterSelectBar;