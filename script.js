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
        let { times } = this.state;

        times.miliseconds ++;

        if (times.miliseconds >= 100) {
            times.miliseconds = 0;
            times.seconds += 1;
        }
        if (times.seconds >= 60) {
            times.seconds = 0;
            times.minutes ++;
        }

        this.setState({ times });
    }

    stop() {
        this.setState({running : false});
        clearInterval(this.watch);
    }

    add() {
        let { results } = this.state;
        let newResult = {
            time: this.format(),
            id: Date.now(),
        };
        this.setState({ 
            results: results.concat(newResult)
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
        const {miliseconds, seconds, minutes} = this.state.times;
        return (
            `${this.pad0(minutes)}:${this.pad0(seconds)}:${this.pad0(Math.floor(miliseconds))}`
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
        const { results } = this.props;
        return (
            <ul className="results">
                {results.map(({id, time}) => (
                    <li key={id}>{time}</li>
                ))}
            </ul>
        );
    }
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));


