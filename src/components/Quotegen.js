import React,{Component} from "react"

import twitterIcon from "./twitter_icon.png"
import plusIcon from "./plus.png"

let inx = Math.floor(Math.random()*101)
let randomNo = Math.floor(Math.random()*29)
let backgroundImageTopic = "nature"

const imgRequestUrl =`https://api.unsplash.com/search/photos?&per_page=30&query=${backgroundImageTopic}&client_id=_7knrCS6UWMpOzEFGI4UjYcuJUrtFv6EAeMLRpI_aWw`;

const quoteRequestUrl = "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"

class Quotegen extends Component{
  constructor(props){
    super(props)
    this.state ={quoteData:{}, loading:true, author:"unknown",quoteObj:"",imgData:{}, backgroundImg:""}

    this.handleClick = this.handleClick.bind(this)
  }

  

  
  

componentDidMount() {
        fetch(quoteRequestUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    quoteData: data,
                    loading:false,
                    quoteObj:data[inx]
                    
                })
            });

        fetch(imgRequestUrl)
          .then(res=> res.json())
          .then(data =>{
            
            console.log(data)
            this.setState({imgData:data, backgroundImg:data.results[randomNo].urls.regular})
          });

       
  }
    

  handleClick(){
    console.log(randomNo)
     inx = Math.floor(Math.random()*100)+1
     randomNo = Math.floor(Math.random()*27)+1
    

    this.setState({quoteObj:this.state.quoteData[inx] })                
    this.setState({backgroundImg:this.state.imgData.results[randomNo].urls.regular})
  }


  render(){
    let quotetext = this.state.quoteObj["quote"]
    let author  =this.state.quoteObj["author"]



    return(
      
      <div id="quote-box" style={{backgroundImage: `url(${this.state.backgroundImg})` }}>
      {this.state.loading ? "loading..":
        <div className="quote-con">
          <h3 id="text">{quotetext}</h3>
          <h4 id="author">{author}</h4>
        </div>
      }

        <div className="button new-quote" onClick={this.handleClick} id="new-quote"><img src={plusIcon}/>New</div>
        <a href={`https://twitter.com/intent/tweet?text=${quotetext}--${author}`} id="tweet-quote" className="button tweet"><img src={twitterIcon}/>Tweet</a>
      
      </div>
    )
  }

}





export default Quotegen

//https://cors-anywhere.herokuapp.com/http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote

// https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en