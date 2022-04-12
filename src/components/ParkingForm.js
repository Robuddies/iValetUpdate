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
        this.setState({ value: event.target.value });
    }

    handleChangeHandicap(event) {
        this.setState({ handicap: event.target.checked });
    }

    async handleSubmit(event) {
        alert('A plate was submitted: ' + this.state.value);
        event.preventDefault();
        alert(this.state.handicap);
        await this.parkVehicle(this.state.handicap);
    }

    async parkVehicle(handicap) {
        alert(handicap);
        if (handicap) {
            // TODO
            await api.getNearestEmptyHandicap().then((response) => {
                alert(response);
            });
        } else {
            alert('here');
            await api.getNearestEmpty().then((response) => {
                alert(response);
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
                <input type='submit' value='Submit' />
            </form>
        );
    }
}

export default ParkingForm;
