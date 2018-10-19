// An individual resource along with associated data such as website,etc
const divStyle = {
    backgroundColor: '#F0F0F0',
    paddingLeft: '7px',
    paddingTop: '5px'
}

const ResourcesSpacing = {
    minHeight: '200px'
}

const linkStyle = {
    textDecoration: 'none',
    color: '#757575', 

}

// Accept some object info
// Accept some string name
class Resource extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    };

    static defaultProps ={
        info : {"Email": "mail", "Website": "web", "Location": "loc", "Meetup": ""},
        url: "url",
        name : "centerName",
        summary: "",
    };

    printResource(){
        console.log("Resource: " + this.props.name)
        console.log(this.props.info.Website)
    }

    render(){
        return(
            <div style = {divStyle}>
                <a href={this.props.info.Website} style = {linkStyle}>{this.props.name}</a>
                <p>{this.props.summary}</p>
                <div>{this.props.children}</div>
            </div>
        )
        }
}

// A collection of resources
// Accept an object "resources" {ResourceName: {Email: s@gmail.com, Website: bi.com, ...}, ResourceName2:{}, ...}
class Resources extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    static defaultProps = {
        list: []
    };

    printResources(){
        for (var key in this.props.resources){
            if(this.props.resources.hasOwnProperty(key)){
                var indivR = this.props.resources[key]
                console.log(key + "-->" + indivR)
                console.log(indivR)
            }
        }
    }

    render(){
        var newResources = []
        // Key should be the name of some center
        for (var key in this.props.resources){
            if(this.props.resources.hasOwnProperty(key)){
                var indivR = this.props.resources[key]  // indivR should be information on it
                newResources.push(<Resource name = {key} info = {indivR} />)
            }
        }

        return( 
            <div style = {ResourcesSpacing}>
                {newResources}
            </div>
        )
    }
        
}

export default Resources;