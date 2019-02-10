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
            <p style={this.props.styleLetter} onClick={this.onClick}>{this.props.letter}</p>
        )
    }
}

Letter.propTypes = {
    letter: React.PropTypes.string.isRequired,
    letterClicked: React.PropTypes.function.isRequired
};

Letter.defaultProps = {
    letter: "A",
}

const LetterSelectBarStyle = {
    display: 'flex',
    flexDirection: 'row wrap',
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
    paddingRight: '4px',
    paddingLeft: '4px',
    paddingTop: '1px',
    paddingBottom: '1px',
    marginRight: '10px',
    color: '#FFFFFF',
    backgroundColor: '#F293C1',
    cursor: "pointer",
}


class LetterSelectBar extends Component{
    constructor(props){
        super(props);
        this.onLetterClicked = this.onLetterClicked.bind(this)
        this.state = {};
    }

    onLetterClicked(letter){
        this.props.onLetterClicked(letter)
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
};

LetterSelectBar.defaultProps = {
    letter: "A",
}


export default LetterSelectBar;
