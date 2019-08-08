import React, { Component } from 'react';
import './TableStyle.css';


export class Table extends Component {



    render() {

        const tdStyle = {
            width: '80px',
            color: '#606060'
        }

        const tableStyle = {
            width: '100%',
            textAlign: 'center',
            backgroundColor: '#fff',
            tableLayout: 'fixed',
            marginBottom: '10px'
        }

        // const stickyTableHeader = {
        //     position: "sticky",
        //     top: "0",
        //     backgroundColor: "#AA3838",
        //     color: "#fbfbfb",
        // }


        const { players, scores } = this.props;

        const headRows = players.map((player) => (
            <th key={`head_${player}`}>
                {player}
            </th>
        ));

        const holeRows = scores.map((score, holeindex) => (
                <tr key={`hole_${holeindex}`}>
                    <td style={tdStyle}>{holeindex + 1}</td>
                    {
                        players.map((player, playerindex) => (
                            <td key={`score_${holeindex}_${playerindex}`}>
                                <input
                                    type="tel"
                                    min="0"
                                    value={score[playerindex] || ''}
                                    onChange={(e) => this.props.onUpdateScore(playerindex, holeindex, parseInt(e.target.value, 10))} />
                            </td>
                        ))
                    }
                </tr>
            )
        );

        const footRows = players.map((player, playerindex) => (
            <td key={`foot_${playerindex}`}>
                {scores.reduce((prev, curr) => prev + curr[playerindex], 0)}
            </td>
        ));



        
        return (
            <div style={tableStyle} className="table-wrapper">
                <table style={tableStyle} id="table">
                    <thead>
                        <tr>
                            <th style={tdStyle}></th>
                            {headRows}
                        </tr>
                    </thead>
                    <tbody>
                        {holeRows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style={tdStyle}>Tot</td>
                            {footRows}
                        </tr>
                    </tfoot>
                </table>
                <button className="btn btn-danger" onClick={ () => { this.props.clearStorage() } }>Börja om</button>
            </div>
        )
    }
}

export default Table
