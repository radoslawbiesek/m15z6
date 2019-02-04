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

    calculate() {
        this.setState({
            times: {
                miliseconds: this.state.times.miliseconds += 1,
                seconds: this.state.seconds,
                minutes: this.state.minutes,
            }
        })
        if (this.state.times.miliseconds >= 100) {
            this.setState({
                times: {
                    miliseconds: 0,
                    seconds: this.state.times.seconds += 1,
                    minutes: this.state.times.minutes,
                }
            })
        }
        if (this.state.times.seconds >= 60) {
            this.setState({
                times: {
                    miliseconds: this.state.times.miliseconds,
                    seconds: 0,
                    minutes: this.state.times.minutes += 1,
                }
            })
        }
    }

    stop() {
        this.state.running = false;
        clearInterval(this.watch);
    }

    add() {
        let newResult = {
            time: this.format(),
            id: Date.now(),
        };
        this.setState({ 
            results: this.state.results.concat(newResult)
        });
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result
        }
        return result;
    }

    format() {
        return (
            `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`
        );
    }

    clear() {
        this.setState({
            results: [],
        })
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
                <div className="stopwatch">
                    {this.format()}
                </div>
                <p>Results:</p>
                <Results results={this.state.results} />
                <a onClick={() => this.clear()} href="#" className="button" id="clear">Clear list</a>
            </div>
        );
    }
}

class Results extends React.Component {
    render() {
        return (
            <ul className="results">
                {this.props.results.map(result => (
                    <li key={result.id}>{result.time}</li>
                ))}
            </ul>
        );
    }
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));


