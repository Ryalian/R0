import React, { Component, useState, useEffect } from 'react';

export default class RippleGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            matrix: [
                [1,2,3,4,5, 7,8,9,10],
                [1,2,3,4,5, 7,8,9,10],
                [1,2,3,4,5, 7,8,9,10],
                [1,2,3,4,5, 7,8,9,10],
                [1,2,3,4,5, 7,8,9,10],
                [1,2,3,4,5, 7,8,9,10],
                [1,2,3,4,5, 7,8,9,10],
                [1,2,3,4,5, 7,8,9,10],
                [1,2,3,4,5, 7,8,9,10],
                [1,2,3,4,5, 7,8,9,10]
            ]
        }

        this.renderMatrix = this.renderMatrix.bind(this);
        this.handleClickDot = this.handleClickDot.bind(this);
        this.matrixTravasel = this.matrixTravasel.bind(this);
        this.initMatrix = this.initMatrix.bind(this);
    }

    componentDidMount() {
        this.initMatrix()
    }

    componentDidUpdate() {
        // check something different, not all matrix has value in every slot
        if(this.state.matrix[0][0].time !== null) {
            this.initMatrix()
        }
    }

    initMatrix() {
        let newMatrix = this.state.matrix.map((row, y) => {
            return row.map((dot, x) => {
                return {
                    x, y,
                    time: null
                }
            })
        });

        this.traverseMatrix = newMatrix;
        this.setState({
            matrix: newMatrix
        })
    }

    // time is the effect delay
    matrixTravasel(x, y, time) {
        const matrix = this.traverseMatrix;

        if(!matrix[y] || !matrix[y][x] || ( matrix[y][x].time < time && matrix[y][x].time !== null ) ) {
            return
        }

        matrix[y][x].time = time;

        this.matrixTravasel(x-1, y-1, time + 1);
        this.matrixTravasel(x-1, y, time + 1);
        this.matrixTravasel(x-1, y+1, time + 1);

        this.matrixTravasel(x, y-1, time + 1);
        this.matrixTravasel(x, y, time + 1);
        this.matrixTravasel(x, y+1, time + 1);

        this.matrixTravasel(x+1, y-1, time + 1);
        this.matrixTravasel(x+1, y, time + 1);
        this.matrixTravasel(x+1, y+1, time + 1);
    }

    handleClickDot(x, y) {
        console.log(`${x}_${y}`)

        this.matrixTravasel(x, y, 1);
        this.setState({
            matrix: this.traverseMatrix
        });
        // console.log(this.state.matrix[y][x])
    }



    renderMatrix() {
        return this.state.matrix.map((row, y) => {
            return <div key={y}>
                {row.map((point, x) => {
                    return <Dot 
                        x={x}
                        y={y}
                        delay={point.time}
                        key={`${x}_${y}`}
                        onClick={()=>this.handleClickDot(x,y)}
                        />
                })}
            </div>
        })
    }

    render() {
        return <div>
            { this.renderMatrix() }
            <button onClick={() => this.matrixTravasel(2,2,1)}>Traverse</button>
        </div>
    }
}

const Dot = (props) => {
    const { x, y } = props;
    const [ styles, setStyles ] = useState({
        display: "inline-block",
        cursor: "pointer",
        margin: "10px",
        width: "50px",
        height: "50px",
        backgroundColor: "#99c0ff",
        transitionDuration: "300ms"
    })

    useEffect(() => {
        if(props.delay) {
            setTimeout(() => {
                setStyles({
                    ...styles,
                    backgroundColor: "#2a79f9"
                })
                //clean
                setTimeout(() => {
                    setStyles({
                        ...styles,
                        backgroundColor: "#99c0ff"
                    })
                }, 300);
            }, props.delay * 100);
        }
    }, [props.delay])

    const handleClick = () => {
        props.onClick();
    }

    return (
        <span
            onClick={ handleClick }
            style={styles}>
            {`${x} , ${y}`}
        </span>
    )
}