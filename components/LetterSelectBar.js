import { Component } from "react"


class Letter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    
    onClick = () => {
        // Call some function passed in by the parent
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
    display: 'flex'
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
        console.log("Returned letter")
        console.log(letter)
        this.props.onLetterClicked(letter)
    }


    render(){
        var alphabet = (this.genAlphabet("A", "Z"))
        var sections = []
        for (var i = 0; i < alphabet.length; i++){
            var character = alphabet[i]
            sections.push(<Letter key = {i} letter = {character} onLetterClicked = {this.onLetterClicked}></Letter>)
            if (i != alphabet.length - 1){
                sections.push(<p key = {i}> | </p>)
            }
        }

        return(
            <div style = {LetterSelectBarStyle} className = "LetterSelectBar">
                      {sections}
            </div>
        )
    }
}

LetterSelectBar.propTypes = {
    letter: React.PropTypes.string.isRequired,
    letterClicked: React.PropTypes.function.isRequired
};

LetterSelectBar.defaultProps = {
    letter: "A",
    onLetterClicked: (letter) => {console.log("Returning letter to page " + letter)}
}


export default LetterSelectBar;