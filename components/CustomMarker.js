


class CustomMarker extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            
        }
    }

    static propTypes = {
        hover: React.PropTypes.bool,
        content: React.PropTypes.string,
    };

    static defaultProps = {
        hover: false,
        content: "Nothing",
    };

    render() {
        const style = this.props.hover ? markerStyleHover : markerStyle;

        return (
            <div className = "hint" style = {style}>    
                <div>{this.props.text}</div>
                <div style = {{width: 80}} className = "hint__content"> 
                Info on this place I think
                </div>
            </div>
        )

    }





}