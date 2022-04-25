import { AlternateEmail } from '@material-ui/icons';
import React from 'react';
import api from '../backend/api';

class ParkingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { licence: '', handicap: false };

        this.handleChangeLicence = this.handleChangeLicence.bind(this);
        this.handleChangeHandicap = this.handleChangeHandicap.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.parkVehicle = this.parkVehicle.bind(this);
    }

    handleChangeLicence(event) {
        this.setState({ licence: event.target.value });
    }

    handleChangeHandicap(event) {
        this.setState({ handicap: event.target.checked });
    }

    async handleSubmit(event) {
        if (this.state.licence === '')
            alert('Please provide your licence plate.');
        else {
            alert('A plate was submitted: ' + this.state.licence);
            // event.preventDefault();
            await this.parkVehicle().catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
        }
    }

    async parkVehicle() {
        if (this.state.licence === '')
            alert('Please provide your licence plate.');
        else if (this.state.handicap) {
            await api
                .getNearestEmptyHandicap()
                .then((response) => {
                    const recordset = response.data.recordset;
                    if (recordset === undefined) {
                        alert('Error. Please try again.');
                    } else if (recordset.length === 0) {
                        alert('No handicap spots available.');
                    } else {
                        const result = recordset[0];
                        const { lot_id } = result;
                        if (lot_id) {
                            alert('Park at lot ' + lot_id);
                            return lot_id;
                        } else {
                            alert('Lot ID not found.');
                            throw new Error('Lot ID not found.');
                        }
                    }
                })
                .then((lot_id) => {
                    // TODO
                })
                .catch((error) => {
                    console.log(error.message);
                    alert(error.message);
                });
        } else {
            await api
                .getNearestEmpty()
                .then((response) => {
                    const recordset = response.data.recordset;
                    if (recordset === undefined) {
                        alert('Error. Please try again.');
                    } else if (recordset.length === 0) {
                        alert('Parking lot full!');
                    } else {
                        const result = recordset[0];

                        const { lot_id } = result;
                        if (lot_id) alert('Park at lot ' + lot_id);
                        else alert('Lot ID not found.');
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    alert(error.message);
                });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Licence plate:
                    <input
                        type='text'
                        value={this.state.value}
                        onChange={this.handleChangeLicence}
                    />
                </label>
                <br />
                <label>
                    <input
                        type='checkbox'
                        value='Handicap'
                        onChange={this.handleChangeHandicap}
                    />
                    Handicap parking
                </label>
                <br />
                <input type='submit' value='Submit Info' />
            </form>
        );
    }
}

export default ParkingForm;
