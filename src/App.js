import React, { Component } from 'react'
import { useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/Lato-Regular.ttf';
import './game';

// word array
const chars = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ",
"ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅛ", "ㅜ", "ㅠ",
"ㅡ", "ㅣ"];
const wordInput = document.querySelector('#word-input');
let level_time = 5;
let modeVal = 1;
let modeArray = chars;

class gamePage extends Component{
  timeInterval = 0; 
  checkInterval = 0;

  constructor(props){
    super(props)

    this.state = {
      input: "",
      word: "안녕",
      time: level_time,
      score: 0,
      isPlaying: false,
      message: "",
      highscore: 0
    };
  }

  startGame = () => {
    level_time = 5;

    this.setState({
      isPlaying: true,
      time: level_time,
      score: 0,
      message: "",
      word: this.showWord(modeArray)
    });
    this.timeInterval = setInterval(() => {
      this.countdown();
    }, 1000);
    this.checkInterval = setInterval(() => {
      this.checkStatus();
    }, 1000);
  }

  handleChange = (e) => {
    if (e.target.value === " " && this.state.isPlaying === false){
      this.startGame();
    } else if (this.state.isPlaying){
      this.setState({input: e.target.value});

      if (this.matchWords(e)) {
        console.log(level_time);
        this.setState({
          time: level_time,
          input: "",
          word: this.showWord(modeArray),
          score: this.state.score + 1
        }); 
      }
    }
  }

  // pick and display random word
  showWord = (words) => {
    const randIndex = Math.floor(Math.random() * words.length);
    return words[randIndex];
  }

  matchWords = (e) => {
    let current_word = this.state.word;
    let input = e.target.value;
    
    if (input === current_word){
      let prev_score = this.state.score;
      this.setState({score: prev_score + 1});
      return true;
    } else if (input !== current_word.slice(0, input.length)){
      wordInput.classList.add("text-danger");
      return false;
    } else {
      wordInput.classList.remove("text-danger");
      this.setState({message: ""})
      return false;
    }
  }

  countdown = () => {
    let current_time = this.state.time;
    if (current_time > 0){
      this.setState({time: current_time - 1});
    } else if (current_time === 0){
      this.setState({isPlaying: false});
    }
  }

  checkStatus = () => {
    let playing = this.state.isPlaying;
    let timeLeft = this.state.time;
    if (!playing && timeLeft === 0){
      let current_score = this.state.score;
      let highscore = this.state.highscore;
      if (current_score > highscore){
        this.setState({highscore: current_score});
      }
      this.setState({message: "Game Over!", input: "", isPlaying: false, score: 0});
      clearInterval(this.timeInterval);
      clearInterval(this.checkInterval);
    } else if (playing && this.state.score > 0 && this.state.score % 15 === 0){
      if (level_time > 1){
        level_time -= 1;
      }
    }
  }

  toggleMode = () => {
    modeVal *= -1;
    if (modeVal == 1){
      modeArray = chars;
    } else{
      // hi
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header class="p-3 mb-5 nav">
            <h1 class="page-text name">Type Fast</h1>
          </header>
          <div class="row wrapper">
            <div class="col-md-6 mx-auto">
              <div class="modes">
                <button onClick={() => {this.toggleMode()}}>character practice</button>
                <button>word practice</button>
              </div>
              <h2 class="display-2 mb-5 page-text" id="current-word">{this.state.word}</h2>
              <input type="text" class="form-control form-control-lg page-text word-input" placeholder="Start typing..." id="word-input"
                  autofocus onChange={(e) => {this.handleChange(e)}} value={this.state.input}></input>
              <h4 class="mt-3 page-text" id="message">{this.state.message}</h4>

              <div class="row mt-5">
                  <div class="col-md-6">
                      <h3 class="page-text">Time Left:
                          <span id="time"> {this.state.time}</span>
                      </h3>
                  </div>
                  <div class="col-md-6">
                      <h3 class="page-text">Score:
                          <span id="score"> {this.state.score}</span>
                      </h3>
                  </div>
                  <div class="col">
                      <h3 class="page-text">High Score:
                          <span id="highscore"> {this.state.highscore}</span>
                      </h3>
                  </div>
              </div>

              <div class="row mt-5">
                  <div class="col-md-12">
                      <div class="card-body">
                          <h5 class="page-text">Instructions</h5>
                          <p class="page-text">Type each word or character in the given amount of seconds to score.
                              Your time will shrink as you continue. Press space to begin.
                          </p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}


export default gamePage;
