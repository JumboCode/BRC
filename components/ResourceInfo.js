// A resource within some accordian

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

class Resource extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    };

    static defaultProps ={
        url: "url",
        linkName : "link",
        summary: "",
    };

    render(){
        return(
            <div style = {divStyle}>
                <a href={this.props.url} style = {linkStyle}>{this.props.linkName}</a>
                <p>{this.props.summary}</p>
                <div>{this.props.children}</div>
            </div>
        )
        }
}

// Accept a list [[urlString, linkName], [urlString2, linkName2]]
class ResourceInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    static defaultProps = {
        list: []
    };

    render(){
        return( 
            <div style = {ResourcesSpacing}>
            {
                this.props.list.map(function(object, i){
                    return <Resource url={object[0]} linkName = {object[1]} key = {i}/>
                })
            }
            </div>
        )
    }
        
}

export default ResourceInfo;