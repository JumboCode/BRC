const divStyle = {
    backgroundColor: '#F0F0F0',
    paddingLeft: '7px',
    paddingTop: '2px',
    paddingBottom: '2px',
}

const ResourcesSpacing = {
    minHeight: '40px',
}

const linkStyle = {
    textDecoration: 'none',
    color: '#757575', 

}

// An individual resource along with associated data such as website,etc
// Accept some object info
// Accept some string name
class Resource extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    };

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        info: React.PropTypes.object.isRequired
    }

    static defaultProps ={
        info : {"Email": "mail", "Website": "web", "Location": "loc", "Meetup": ""},
        url: "url",
        name : "centerName",
        summary: "",
    };

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

    static propTypes = {
        resources: React.PropTypes.object.isRequired
    }

    static defaultProps = {
        resources: {"ResourceName": {"Email": "mail", "Website": "web", "Location": "loc", "Meetup": ""}}
    };

    render(){
        var newResources = []
        // Key should be the name of some center
        for (var resource in this.props.resources){
            if(this.props.resources.hasOwnProperty(resource)){
                var resourceInfo = this.props.resources[resource] 
                newResources.push(<Resource name = {resource} info = {resourceInfo} />)
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