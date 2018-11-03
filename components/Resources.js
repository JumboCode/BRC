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
        this.onClick = this.onClick.bind(this);
    };

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        info: React.PropTypes.object.isRequired,
        //region: React.PropTypes.string.isRequired,
    }

    static defaultProps ={
//        info : {"Email": "mail", "Website": "web", "Location": "loc", "Meetup": ""},
        info : {"Email": "mail", "Website": "web", "Location": "loc", "Meetup": "", "Region":"Unknown"},
        onResourceClicked: (region) => {console.log("Region: " + region)},
        url: "url",
        name : "centerName",
        summary: "",
        region: "United States of America"
    };

    onClick(){
        //console.log("Region: " + this.props.info.Region)
        this.props.onResourceClicked(this.props.info.Region);
    }

    render(){
        return(
            <div onClick = {this.onClick} style = {divStyle}>
            {/*
                <a href={this.props.info.Website} style = {linkStyle}>{this.props.name}</a>
            */}
                <h6 style = {linkStyle}>{this.props.name}</h6>
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

    // This is essentially the default prop for resourceOnClick;
    /*
    resourceClicked(region){
        console.log("Resources has region: " + region);
        return region;
    }
    */

    render(){
        var newResources = []
        console.log(this.props.region);
        // Key should be the name of some center
        for (var resource in this.props.resources){
            if(this.props.resources.hasOwnProperty(resource)){
                var resourceInfo = this.props.resources[resource]
                resourceInfo.Region = this.props.region;
                console.log(resourceInfo);
                
                //console.log(this.props.resources[resource].Location);
                newResources.push(<Resource name = {resource} info = {resourceInfo} onResourceClicked = {this.props.onResourceClick}/>)
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