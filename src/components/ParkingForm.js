import { AddAlertTwoTone, AlternateEmail } from '@material-ui/icons';
import React, { useState } from 'react';
import api from '../backend/api';
import { useNavigate } from 'react-router-dom';

function ParkingForm() {
    const initialState = {
        licence: '',
        handicap: false,
        lotId: null,
    };
    const [licence, setLicence] = useState('');
    const [handicap, setHandicap] = useState(false);
    const [lotId, setLotId] = useState(null);

    let navigate = useNavigate();

    const clearState = () => {
        setLicence(initialState.licence);
        setHandicap(initialState.handicap);
        setLotId(initialState.lotId);
    };

    const handleChangeLicence = (event) => {
        setLicence(event.target.value);
    };

    const handleChangeHandicap = (event) => {
        setHandicap(event.target.checked);
    };

    async function handleSubmit(event) {
        if (licence === '') alert('Please provide your licence plate.');
        else {
            // alert('A plate was submitted: ' + this.state.licence);
            event.preventDefault();
            await parkVehicle().catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
        }
    }

    async function parkVehicle() {
        if (licence === '') alert('Please provide your licence plate.');
        else if (handicap) {
            await api
                .getNearestEmptyHandicap()
                .then((response) => {
                    /** // MSSQL
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
                     */

                    // PostgreSQL
                    const rows = response.data.rows;
                    if (rows === undefined) {
                        // alert('Error in results. Please try again.');
                        throw new Error('Error in results. Please try again.');
                    } else if (rows.length === 0) {
                        alert('No handicap spots available.');
                    } else {
                        const result = rows[0];
                        const { lot_id } = result;
                        if (lot_id) {
                            // alert('Park at lot ' + lot_id);
                            setLotId(lot_id);
                            navigate('/park_your_car', {
                                state: {
                                    licence: licence,
                                    lotId: lot_id,
                                    handicap: handicap,
                                },
                            });
                        } else {
                            // alert('Lot ID not found.');
                            throw new Error('Lot ID not found.');
                        }
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    alert(error.message);
                });
        } else {
            await api
                .getNearestEmpty()
                .then((response) => {
                    /** // MSSQL
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
                    */

                    // PostgreSQL
                    const rows = response.data.rows;
                    if (rows === undefined) {
                        // alert('Error in results. Please try again.');
                        throw new Error('Error in results. Please try again.');
                    } else if (rows.length === 0) {
                        alert('Carpark full.');
                    } else {
                        const result = rows[0];
                        const { lot_id } = result;
                        if (lot_id) {
                            // alert('Park at lot ' + lot_id);
                            setLotId(lot_id);
                            navigate('/park_your_car', {
                                state: {
                                    licence: licence,
                                    lotId: lot_id,
                                    handicap: handicap,
                                },
                            });
                        } else {
                            // alert('Lot ID not found.');
                            throw new Error('Lot ID not found.');
                        }
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    alert(error.message);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Licence plate:
                <input
                    type='text'
                    name='licence'
                    value={licence}
                    onChange={handleChangeLicence}
                />
            </label>
            <br />
            <label>
                <input
                    type='checkbox'
                    value='Handicap'
                    checked={handicap}
                    onChange={handleChangeHandicap}
                />
                Handicap parking
            </label>
            <br />
            <input type='submit' value='Submit Info' />
        </form>
    );
}

export default ParkingForm;
