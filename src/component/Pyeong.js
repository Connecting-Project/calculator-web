import React, { useState } from 'react';
import '../css/Pyeong.scss';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        // "& .MuiInputBase-input":{
        //     textAlign: 'right',
        // },
        // "@media(max-width: 480px)":{
        //     "& .MuiInputBase-input":{
        //         fontSize: '0.2em',
        //     },
        // }
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '28ch',
        // "@media(max-width: 480px)":{
        //     width: '10ch',
        // }
    },
}));

function Pyeong() {
    const classes = useStyles();

    const [values, setValues] = useState({
        mm: '',
        pyeong: '',
        mm2: '',
        pyeong2: '',
    });

    const handleChange = (prop) => (event) => {
        if (!isNaN(event.target.value)) {
            setValues({ ...values, [prop]: event.target.value , pyeong: (event.target.value / 3.305785).toFixed(1)});
        }
    };

    const handleChange2 = (prop) => (event) => {
        if (!isNaN(event.target.value)) {
            setValues({ ...values, [prop]: event.target.value , pyeong2: (event.target.value * 3.305785).toFixed(1)});
        }
    };

    return (
        <div className="pyeongContainer">
            <div className="calculator">
                <div className="title">
                ㎡ → 평
                </div>
                <div>
                    <div className="inputNumber">
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <OutlinedInput
                                value={values.mm}
                                onChange={handleChange('mm')}
                                endAdornment={<InputAdornment position="end">㎡</InputAdornment>}
                                aria-describedby="outlined-m^2-helper-text"
                                inputProps={{
                                    'aria-label': 'm^2',
                                }}
                                labelWidth={0}
                            />

                        </FormControl>
                    </div>
                    <div className="cross">
                        →
                    </div>
                    <div className="resultbox">
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <OutlinedInput
                                value={values.pyeong}
                                endAdornment={<InputAdornment position="end">평</InputAdornment>}
                                aria-describedby="outlined-m^2-helper-text"
                                inputProps={{
                                    'aria-label': 'm^2',
                                }}
                                labelWidth={0}
                                readOnly
                            />

                        </FormControl>
                    </div>

                </div>
                <div className="title">
                평 → ㎡
                </div>
                <div>
                    <div className="inputNumber">
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <OutlinedInput
                                value={values.mm2}
                                onChange={handleChange2('mm2')}
                                endAdornment={<InputAdornment position="end">평</InputAdornment>}
                                aria-describedby="outlined-m^2-helper-text"
                                inputProps={{
                                    'aria-label': 'm^2',
                                }}
                                labelWidth={0}
                            />

                        </FormControl>
                    </div>
                    <div className="cross">
                        →
                    </div>
                    <div className="resultbox">
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <OutlinedInput
                                value={values.pyeong2}
                                endAdornment={<InputAdornment position="end">㎡</InputAdornment>}
                                aria-describedby="outlined-m^2-helper-text"
                                inputProps={{
                                    'aria-label': 'm^2',
                                }}
                                labelWidth={0}
                                readOnly
                            />

                        </FormControl>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Pyeong;