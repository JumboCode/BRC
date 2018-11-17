const divStyle = {
    backgroundColor: '#FFFFFF',
    paddingLeft: '7px',
    paddingBottom: '2px',
}

const linkStyle = {
    color: '#757575', 
    fontSize: '14px',
    cursor: 'pointer',
    paddingLeft: '7px'
}

// An individual resource along with associated data such as website,etc
// Accept some object info
// Accept some string name
class Resource extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.onClick = this.onClick.bind(this);
    };

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        info: React.PropTypes.object.isRequired,
        //region: React.PropTypes.string.isRequired,
    }

    static defaultProps ={
        info : {"Email": "mail", "Website": "web", "Location": "loc", "Meetup": "", "Region":"Unknown"},
        onResourceClicked: (region) => {console.log("Region: " + region)},
        url: "url",
        name : "centerName",
        summary: "",
        region: "United States of America"
    };

    onClick(){
        this.props.onResourceClicked(this.props.info.Region);
    }

    render(){
        return(
            <div onClick = {this.onClick} style = {divStyle}>
            {/*
                <a href={this.props.info.Website} style = {linkStyle}>{this.props.name}</a>
            */}
                <p style = {linkStyle}>{this.props.name}</p>
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
        //this.resourceClicked = this.resourceClicked.bind(this);
    }

    static propTypes = {
        resources: React.PropTypes.object.isRequired,
        region: React.PropTypes.string.isRequired
    }

    static defaultProps = {
        resources: {"ResourceName": {"Email": "mail", "Website": "web", "Location": "loc", "Meetup": ""}},
        region: "United States of America", // Should normally be a state. 
        onResourceClick: (data) => {console.log("Resources has region: " + data)}
    };

    render(){
        var newResources = []
        // Key should be the name of some center
        for (var resource in this.props.resources){
            if(this.props.resources.hasOwnProperty(resource)){
                var resourceInfo = this.props.resources[resource]
                resourceInfo.Region = this.props.region;
                
                newResources.push(<Resource name = {resource} info = {resourceInfo} onResourceClicked = {this.props.onResourceClick}/>)
            }
        }

        return( 
            <div>
                {newResources}
            </div>
        )
    }
        
}

export default Resources;