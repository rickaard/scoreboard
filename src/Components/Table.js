import React, { Component } from 'react';
import './TableStyle.css';


export class Table extends Component {



    tableColumns = (rowIndex) => {
        let randomID = Math.floor(Math.random() * 999999);
        var columns = []

        for(let i = 0; i < this.props.playerlist.length; i++) {
            columns.push(<td key={randomID + i}>
                            <input 
                                type="tel"
                                // onChange={ (event) => { this.props.handleChange(event) } }
                                // value={this.props.inputValue}
                                onKeyDown={ (e) => { this.props.updateScore(i, rowIndex, e) } }
                            />
                        </td>)
        }
        return columns;
    }

    tableLoop = () => {
        let randomID = Math.floor(Math.random() * 999);
        var rows = [];

        for (let i = 1; i <= this.props.holes; i++) {
            rows.push(
            <tr key={randomID + i}>
                <td>{i}</td>
                {this.tableColumns(i)}
            </tr>
            )
        }
        return rows;
    } 



    render() {

        const tableStyle = {
            width: '100%',
            textAlign: 'center',
            backgroundColor: '#fff',
            tableLayout: 'fixed'
        }

        
        return (


            <div style={tableStyle} className="table-wrapper">

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th></th>
                            { this.props.playerlist.map((p, index,) => (
                            <th key={index}>{p}</th>
                            )) }
                        </tr>
                    </thead>
                    <tbody>
                        {this.tableLoop()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Tot</td>
                            {this.tableColumns()}
                        </tr>
                    </tfoot>
                </table>

            </div>
        )
    }
}

export default Table
