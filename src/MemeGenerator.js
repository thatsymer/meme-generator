import React, {Component} from "react"
import './App.css'

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "So Much Generator",
            bottomText: "Plenty Meme",
            randomImg: "https://memegenerator.net/img/images/16519871.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.generateBtn = this.generateBtn.bind(this)
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
    }
    

    handleChange(event) {
    const {name, value} = event.target
        this.setState({[name]: value})
    }

    generateBtn(event){
        event.preventDefault()
        const randomNum = Math.floor(Math.random()* this.state.allMemeImgs.length)
        const randomMeme = this.state.allMemeImgs[randomNum].url
        this.setState({ randomImg: randomMeme})
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.generateBtn}>
                    <input type="text" name="topText" value={this.state.topText} placeholder="Top Text" onChange={this.handleChange} />
                    <input type="text" name="bottomText" value={this.state.bottomText} placeholder="Bottom Text" onChange={this.handleChange} />
                    <button className="generatebtn"><span className="genspan">GENERATE</span></button>
                </form> 

                <div className="meme">
                    <img src={this.state.randomImg} alt="#"/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator