import React, { useState } from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import '../css/Campaign.scss';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'inline-block',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

}));

function Campaign() {

    let day = new Date();
    let y = day.getFullYear();
    let m = day.getMonth() + 1;
    let d = day.getDate();

    if (m < 10) {
        m = "0" + m;
    }

    if (d < 10) {
        d = "0" + d;
    }

    const [datevalue, setDatevalue] = useState(y + "-" + m + "-" + d);
    const [dischange, setDischange] = useState('');
    const [codenumber, setCodenumber] = useState(0);

    const [show, setShow] = useState(false);
    const [resultday, setResultday] = useState('');
    const [percent, setPercent] = useState(0);
    const [cpremain, setRemain] = useState('');
    const classes = useStyles();

    const [marks, setMarks] =useState([
      {
        value: 0,
        label: '0°C',
      },
      {
        value: 100,
        label: '100°C',
      },]);

    const click = () => {
        if(codenumber === 0){
            alert("복무형태를 클릭해주세요.");
        }else{
            axios({
                method: 'POST',
                url: `https://calculator.hawaiian-pizza.gq/cal/campaign?start=`+datevalue+`&type=`+codenumber
            }).then((response) => {
                setRemain(response.data.day);
                setDischange(response.data.campaign);
                setMarks([{value: 0, label: datevalue},{value: 100, label: response.data.campaign}]);
                setPercent(Math.round(response.data.percent));
                
            }).catch((error)=>{
                console.log(error);
            });
            setResultday(codenumber);

            setShow(true);
        }
    };

    const handlerChange = (e) => {
        setDatevalue(e.target.value);
    };

    const codeChange = (e) => {
        setCodenumber(e.target.value);
    }

    return (
        <div className="cp_container">
            <Paper className="cp_paper">
                <div>
                <p className="cp_title">입대일자 <span className="cp_subtitle">직접입력 또는 달력에서 날짜를 선택하세요.</span></p>
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        format="yyyy/MM/dd"
                        type="date"
                        defaultValue={datevalue}
                        onChange={handlerChange}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>

                <FormControl className={classes.formControl}>
                    <NativeSelect
                        defaultValue={codenumber}
                        onChange={codeChange}
                        inputProps={{
                            name: 'name',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={0}>복무형태</option>
                        <option value={545}>육군</option>
                        <option value={637}>공군</option>
                        <option value={637}>해군</option>
                        <option value={637}>해병대</option>
                        <option value={637}>해양의무경찰</option>
                        <option value={637}>의무경찰</option>
                        <option value={637}>의무소방원</option>
                        <option value={637}>사회복무요원</option>
                    </NativeSelect>
                </FormControl>
                <button className="cp_button" onClick={click}>계산하기</button>
                </div>
                <div className="cp_result">
                    { show && 
                        <>
                        <div className="slider_box">
                            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={percent} marks={marks}/>
                        </div>
                            <p className="cp_total">총 복무일 : <span className="cp_total_num">{resultday}</span>일</p>
                            <p className="cp_total">남은 복무일 : <span className="cp_total_num">{cpremain}</span>일</p>
                            <p className="cp_date">전역일 : <span className="cp_date_num">{dischange}</span></p>
                        </>
                    }
                </div>
            </Paper>
        </div>
    );
}

export default Campaign;

const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);