import React,{Component} from 'react';
import  Clarifai from 'clarifai';
import './App.css';
import Logo from './components/Logo/Logo';
import Navigation from'./components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from "./components/Rank/Rank";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const particlesOptions = {
                    particles: {
                        number: {
                          value: 200,
                          density: {
                            enable: true,
                            value_area: 800
                          }
                       }
                    }
                  }

const app = new Clarifai.App({
  apiKey: '9c632771007449aea55a493efc31dcbe'
});

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width- (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
    
  }

  displayBox = (box) => {
    // console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onBtnSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
       this.state.input)
    .then(response => {
      if(response){
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers : {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          console.log(count);
          this.setState(Object.assign(this.state.user, { entries: count} ))
        })
        .catch(console.log)
      }
      this.displayBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))
  }

  OnRouteChange =(route) =>{
    if (route === 'signout') {
      this.setState(initialState)
    }
    else if (route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route})
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
                  params={particlesOptions} />
        <div className='flexsb'>
        <Logo />
        <Navigation isSignedIn={this.state.isSignedIn} OnRouteChange={this.OnRouteChange} />
        </div>
        {this.state.route === 'home' ? 
        <div> <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit ={this.onBtnSubmit} /> 
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
</div>
      :(
        this.state.route === 'signin' ? 
        <Signin loadUser={this.loadUser} OnRouteChange={this.OnRouteChange} />
        : <Register loadUser ={this.loadUser} OnRouteChange={this.OnRouteChange} />
      )
        
        }
      </div>
    );
  }
}


export default App;
