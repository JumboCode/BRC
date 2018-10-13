// A resource within some accordian

const divStyle = {
    //borderRadius: '5px',
    //border: '1px solid #d9d9d9',
    backgroundColor: '#F0F0F0',
    color: '#757575',
    paddingLeft: '7px',
    margin: '5px'
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
                <a href={this.props.url}>{this.props.linkName}</a>
                <p>{this.props.summary}</p>
                <div>{this.props.children}</div>
            </div>
        )
        }
}

// Accept a list of tuples [{urlString: linkName}]
class ResourceInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    static defaultProps = {
        list: []
    };

    addResources(){

    }

    render(){
        return( 
            <div>
            {
                this.props.list.map(function(object, i){
                    console.log(object[0]);
                    console.log(object[1]);
                    return <Resource url={object[0]} linkName = {object[1]} key = {i}/>
                })
            }
            </div>
        )
    }
        
}

export default ResourceInfo;