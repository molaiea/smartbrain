import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import clarifai from 'clarifai';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';


const app = new clarifai.App({
  apiKey: 'e7160608536542de948643311433b259'
});
const particleparams = {
                particles: {
                  number: {
                    value: 200,
                    density: {
                      enable: true,
                      value_area: 1100
                    }
                  }
              }}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // componentDidMount(){
  //   fetch('http://localhost:1809')
  //   .then(response=>response.json())
  //   .then(data=>console.log(data))
  // }

  onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }


  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col*width,
      topRow: face.top_row*height,
      rightCol: width-face.right_col*width,
      bottomRow: height-face.bottom_row*height
    }

  }

  displayBox = (box) =>{
    this.setState({box: box});
    console.log(this.state.box)
  }

  onSubmit =()=>{
    this.setState({imageUrl: this.state.input});
    console.log(this.state.user.id)
    app.models
      .predict(
        clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:1809/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
                console.log(count)
              this.setState({user: {
                entries: count
              }})
            

        })
        this.displayBox(this.calculateFaceLocation(response))
      }})
      .catch(err => console.log(err));

  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    })

    
  }

  loadUser = (user)=>{
    this.setState({user : {
            id:user.id,
            name: user.name,
            email: user.email,
            entries: user.enteries,
            joined: user.joined
        }})
  }

  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
    
    <div className="App ">
      <Particles className='particles'  
                params={particleparams} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank id={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
    </div>
  );
  }
  
}

export default App;
