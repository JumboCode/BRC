// A resource within some accordian
class ResourceInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url :"url",
            linkName : "link",
            summary : "link info",
        }
    }

    render(){
        return(
            <div>
                <a href={this.props.url}>{this.props.linkName}</a>
                <p>{this.props.summary}</p>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

export default ResourceInfo;