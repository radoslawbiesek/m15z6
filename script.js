class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: [],
        }
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    start() {
        if (!this.state.running) {
            this.setState({running : true});
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.seconds += 1;
            this.state.miliseconds = 0;
        }
        if (this.state.seconds >= 60) {
            this.state.minutes += 1;
            this.state.seconds = 0;
        }
    }

    stop() {
        this.state.running = false;
        clearInterval(this.watch);
    }

    add() {
        let newResults = this.state.results.slice();
        newResults.push(this.state.time);
        this.setState({
            results: newResults,
        });
    }

    render() {
        return (
            <div>
                <nav className="controls">
                    <a onClick={() => this.start()} href="#" className="button">Start </a>
                    <a onClick={() => this.stop()} href="#" className="button">Stop </a>
                    <a onClick={() => this.reset()} href="#" className="button">Reset </a>
                    <a onClick={() => this.add()} href="#" className="button" id="add">Add to list </a>
                </nav>
                <div className="stopwatch">{this.format(this.state.times)}</div>
                <p>Results:</p>
                <Results results={this.state.results} />
                <a href="#" className="button" id="clear">Clear list</a>
            </div>
        );
    }
}

class Results extends React.Component {
    render() {
        return (
            <ul className="results">
                {this.props.results.map(result => (
                    <li key={this.props.results.indexOf(result)}>{result}</li>
                ))}
            </ul>
        );
    }
}


function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result
    }
    return result;
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));


