import { Component } from "react"


class Letter extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    onClick(){
        // Call some function passed in by the parent
        this.props.letterClicked()
    }

    render(){
        return(
            <p onClick = {this.onClick()}>{this.props.letter}</p>
        )
    }

}

Letter.propTypes = {
    letter: React.PropTypes.string.isRequired,
    letterClicked: React.PropTypes.function.isRequired
};

Letter.defaultProps = {
    letter: "A",
    letterClicked: () => {console.log("Clicked letter")}

}


const LetterSelectBarStyle = {
    display: 'flex'
}


class LetterSelectBar extends Component{
    constructor(props){
        super(props);
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




    render(){
        var alphabet = (this.genAlphabet("A", "Z"))
        console.log(alphabet)

        var sections = []
        for (var i = 0; i < alphabet.length; i++){
            var character = alphabet[i]
            sections.push(<Letter letter = {character}></Letter>)
            if (i != alphabet.length - 1){
                sections.push(<p> | </p>)
            }
        }

        

        return(
            <div style = {LetterSelectBarStyle} className = "LetterSelectBar">
                      {sections}
            </div>
        )
    }
}

export default LetterSelectBar;