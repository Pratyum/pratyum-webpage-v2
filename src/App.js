import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: {},
      history: [],
      prompt: "$"
    };  

    // Binding the methods to the current component (deprecated for older versions of react)

    this.clearVerbose = this.clearVerbose.bind(this);
    this.allCommands = this.allCommands.bind(this);
    this.addVerbose = this.addVerbose.bind(this);
    this.listFiles = this.listFiles.bind(this);
    this.showMsg = this.showMsg.bind(this);
    this.showHelp = this.showHelp.bind(this);
    this.catFile = this.catFile.bind(this);
    this.openLink = this.openLink.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.about = this.about.bind(this);
  }

  clearVerbose() {
    this.setState({ history: [] });
  }

  allCommands() {
    this.setState({
      commands: {
        'clear': this.clearVerbose,
        'ls': this.listFiles,
        'intro': this.showMsg,
        'help': this.showHelp,
        'cat': this.catFile,
        'github': this.openLink("https://github.com/pratyum"),
        'website': this.openLink("https://pratyum.github.io"),
        'about': this.about
      }
    });
  }

  addVerbose(output) {
    const history = this.state.history;
    history.push(output);
    this.setState({
      history: history
    });
  }

  listFiles() {
    this.addVerbose("readme.md");
    this.addVerbose("intro.md");
    this.addVerbose("about.md");
    this.addVerbose("education.md");
    this.addVerbose("work.md");
    this.addVerbose("projects.md");
  }

  showMsg() {
    this.addVerbose("Hi there! I am Pratyum Jagan and I am very passionate about developing web applications.");
    this.addVerbose("Type `ls -al` to see the list of all the commands");
  }

  showHelp() {
    this.addVerbose("help - view the commands");
    this.addVerbose("website - view my website");
    this.addVerbose("github - view my github profile");
    this.addVerbose("npmjs - view my npm modules");
    this.addVerbose("cat - view the contents of the file");
    this.addVerbose("intro - view the welcome message");
    this.addVerbose("about - view words about the app");
    this.addVerbose("ls - list all the files");
    this.addVerbose("clear - clear the screen");
  }

  catFile(arg) {
    if (arg === 'readme.md') {
      this.addVerbose("Who am I?");
      this.addVerbose("I am Pratyum Jagan, a Senior at Nanyang Technological University trying to make some cool stuff in the world");
      this.addVerbose("This is a Sunday morning hack which I built while learning React.js.");
    }else if(arg === 'about.md'){
      this.about();
    }else if(arg === 'intro.md'){
      this.intro();
    } else {
      this.addVerbose("cat: " + arg + ": No such file or directory");
    }
  }

  openLink(link) {
    return function() {
      window.open(link, "_blank");
    }
  }

  about() {
    this.addVerbose("This app is built with React.js. For production built it uses `react-scripts`.");
    this.addVerbose("The app is completley written in ES6 and React 15.3.2.");
  }
  intro() {
    this.addVerbose("This app is built with React.js. For production built it uses `react-scripts`.");
    this.addVerbose("The app is completley written in ES6 and React 15.3.2.");
  }

  componentDidMount() {
    var term = this.refs.com;

    this.allCommands();
    this.showMsg();
    term.focus();
  }

  componentDidUpdate() {
    var node = ReactDOM.findDOMNode(this);
    var content = document.getElementById('main');
    content.scrollTop = node.scrollHeight;
  }


  handleClick() {
    var term = this.refs.com;
    term.focus();
  }

  clearInput() {
    this.refs.com.value = "";
  }

  handleInput(e) {
    if (e.key === "Enter") {  
      var inputText = this.refs.com.value;
      var inputArray = inputText.split(' ');
      var input = inputArray[0];
      var arg = inputArray[1]; // Undefined for function call
      var command = this.state.commands[input];

      this.addVerbose(this.state.prompt + " " + inputText);

      if (command === undefined) {
        this.addVerbose("-bash:" + input + ": command not found");
      } else {
        command(arg); // obj["key"](undefined) executes a function define in the object
      }

      this.clearInput();
    }
  }

  render() {
    var output = this.state.history.map(function(op, i) {
      return <p key={i}>{op}</p>
    });
    return (
      <div className="input-area" onClick={this.handleClick}>
        {output}
        <p>
          <span className="prompt">{this.state.prompt} </span>
          <input type="text" onKeyPress={(e) => this.handleInput(e) } ref="com" />
        </p>
      </div>
    );
  }
}

export default App;
