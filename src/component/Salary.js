import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Tooltip from '@material-ui/core/Tooltip';

import '../css/Salary.scss';
import arrow from '../assets/arr_pay.gif';
import tip from '../assets/icon_tip.gif';

function Salary() {

    const [salary1, setSalary1] = React.useState('year');
    const [salary2, setSalary2] = React.useState('100000');
    const [salary3, setSalary3] = React.useState('1');
    const [salary4, setSalary4] = React.useState('0');
    const [salary5, setSalary5] = React.useState('');
    const [result, setResult] = React.useState({
        employ: 0,
        gukmin: 0,
        gungang: 0,
        income: 0,
        incomeTax: 0,
        janggi: 0,
        loaclIncomeTax: 0,
        total: 0,
    })

    const { employ, gukmin, gungang, income, incomeTax, janggi, loaclIncomeTax, total } = result;

    const [checkbox1, setcheckbox1] = React.useState(false);

    const [boolean1, setBoolean1] = React.useState(true);

    const handleChange1 = (event) => {
        setSalary1(event.target.value);
    };

    const handleChange2 = (event) => {
        setSalary2(event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
    };

    const handleChange3 = (event) => {
        setcheckbox1(event.target.checked);
        if (event.target.checked) {
            setSalary2('');
        } else {
            setSalary2('100000');
        }
    };

    const handleChange4 = (event) => {
        setSalary3(event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
        if (event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') > 1) {
            setBoolean1(false);

        } else {
            setBoolean1(true);

        }
    };

    const handleChange5 = (event) => {
        setSalary4(event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));

    };

    const handleChange6 = (event) => {
        setSalary5(event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));

    };

    const sal_cal = () => {

        if (Number(salary2) > Number(salary5)) {
            alert("비과세액이 연봉보다 높습니다.");
        } else {
            axios({
                method: 'POST',
                url: `https://calculator.hawaiian-pizza.pw/cal/salary`,
                data: {
                    childNum: salary4,
                    dependentNum: salary3,
                    nonTaxableAmount: salary2,
                    year: salary1 === "year" ? true : false,
                    salary: salary5
                }
            }).then((response) => {
                console.log(response.data);
                setResult(response.data.salary);
            }).catch((error) => { console.log(error); });
        }

    };

    return (
        <div className="container">
            <Paper className="bigblock">
                <div className="leftcontainer">
                    <div>
                        <h4>희망(현재) 연봉 입력</h4>
                    </div>
                    <div className="inner">
                        <table className="innerbox">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td className="lefttd">연봉/급여 선택</td>
                                    <td className="righttd">
                                        <RadioGroup row aria-label="salary" name="salary1" value={salary1} onChange={handleChange1}>
                                            <FormControlLabel value="year" control={<Radio color="primary" />} label="연봉" />
                                            <FormControlLabel value="month" control={<Radio color="primary" />} label="급여" />
                                        </RadioGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="lefttd">비과세액 <LightTooltip title={<><div>여액 중 세금을 공제하지 않는 금액을 말합니다. 커리어 연봉 계산기는 기본으로 식대 10만원이
                                        설정되어있으며, 비과세액을 정확히 알고 계신 경우, 직접 입력이 가능합니다.</div><br /><div>비과세되는 식사대, 출산.보육수당, 실비변상적인 급여, 국외근로소득, 생산직근로자 등의 야근근로수당,
                                            외국인 근로자에 대한 과세특례, 기타 비과세 되는 소득등이 이에 해당합니다.</div></>}><div className="hint" style={{ background: "url(" + tip + ") no-repeat 0 0" }}></div></LightTooltip></td>
                                    <td className="righttd">
                                        <input type="text" value={salary2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={handleChange2} className="textinput" disabled={!checkbox1} />
                                        <span className="textoption">원</span>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                    checked={checkbox1}
                                                    onChange={handleChange3}
                                                    name="checkbox1"
                                                    color="primary"
                                                />
                                            }
                                            label="직접입력"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="lefttd">부양가족수<LightTooltip title={<><div>공제 대상자(본인포함)에 해당하는 부양하는 가족의 수를 1이상 입력합니다.
                                        단, 연간 소득금액이 100만원을 초과하는 경우에는 해당되지 않습니다.</div></>}><div className="hint" style={{ background: "url(" + tip + ") no-repeat 0 0" }}></div></LightTooltip></td>
                                    <td className="righttd">
                                        <input type="text" value={salary3} onChange={handleChange4} className="textinput" />
                                        <span className="textoption">명 (본인포함)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="lefttd">20세이하자녀수<LightTooltip title={<><div>기본공제 대상자에 해당하는 20세 이하의 자녀수를 선택하시면 됩니다.
                                        단, 20세 이하의 자녀이더라도 연간 소득금액이 100만원을 초과하는 경우에는 해당되지 않습니다.</div></>}><div className="hint" style={{ background: "url(" + tip + ") no-repeat 0 0" }}></div></LightTooltip></td>
                                    <td className="righttd">
                                        <input type="text" value={salary4} onChange={handleChange5} className="textinput" disabled={boolean1} />
                                        <span className="textoption">명</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="lefttd">연봉입력</td>
                                    <td className="righttd">
                                        <input type="text" value={salary5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={handleChange6} className="yearinput" />
                                        <span className="textoption">원</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                        <hr />
                        <div className="buttonbox">
                            <a href="#!" className="calculate" onClick={sal_cal}>계산하기</a>
                            <a href="#!" className="calculateagain" onClick={sal_cal}>다시계산하기</a>
                        </div>
                    </div>

                </div>
                <div className="centercontainer">
                    <div className="arrow" style={{ background: "url(" + arrow + ") #fff no-repeat" }}></div>
                </div>
                <div className="rightcontainer">
                    <div>
                        <h4>공제액</h4>
                    </div>
                    <div className="inner">
                        <table className="innerbox">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td className="lefttd">국민연금
                                        <LightTooltip title={<><div>국민연금은 사업주, 근로자 모두 4.5%를 공제합니다.
                                            단, 비과세액이 있을 경우, 비과세액을 제외한 과세금액에서만 세액이 공제됩니다.</div></>}><div className="hint" style={{ background: "url(" + tip + ") no-repeat 0 0" }}></div></LightTooltip>
                                    </td>
                                    <td className="righttd">
                                        <input type="text" value={gukmin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} className="yearinput" disabled />
                                        <span className="textoption">원</span>
                                    </td>
                                </tr><tr>
                                    <td className="lefttd">건강보험<LightTooltip title={<><div>건강보험료는 3.06% 공제합니다.</div><div>
                                        단, 비과세액이 있을 경우, 비과세액을 제외한 과세금액에서만 세액이 공제됩니다.</div></>}><div className="hint" style={{ background: "url(" + tip + ") no-repeat 0 0" }}></div></LightTooltip></td>
                                    <td className="righttd">
                                        <input type="text" value={gungang.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} className="yearinput" disabled />
                                        <span className="textoption">원</span>
                                    </td>
                                </tr><tr>
                                    <td className="lefttd">장기요양<LightTooltip title={<><div>장기요양보험은 건강보험 금액의 6.55%를 공제합니다.</div></>}><div className="hint" style={{ background: "url(" + tip + ") no-repeat 0 0" }}></div></LightTooltip></td>
                                    <td className="righttd">
                                        <input type="text" value={janggi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} className="yearinput" disabled />
                                        <span className="textoption">원</span>
                                    </td>
                                </tr><tr>
                                    <td className="lefttd">고용보험<LightTooltip title={<><div>고용보험은 사업주 0.70%, 근로자 0.65%로 책정되어있으며, 월 급여액의 0.65%를 공제합니다.</div></>}><div className="hint" style={{ background: "url(" + tip + ") no-repeat 0 0" }}></div></LightTooltip></td>
                                    <td className="righttd">
                                        <input type="text" value={employ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} className="yearinput" disabled />
                                        <span className="textoption">원</span>
                                    </td>
                                </tr><tr>
                                    <td className="lefttd">소득세<LightTooltip title={<><div>부양가족수와 20세이하 자녀수에 따라,
                                        국세청의 근로소득 간이세액표 자료를 기준으로 공제됩니다.</div></>}><div className="hint" style={{ background: "url(" + tip + ") no-repeat 0 0" }}></div></LightTooltip></td>
                                    <td className="righttd">
                                        <input type="text" value={incomeTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} className="yearinput" disabled />
                                        <span className="textoption">원</span>
                                    </td>
                                </tr><tr>
                                    <td className="lefttd">지방소득세<LightTooltip title={<><div>소득세의 10%를 공제합니다.</div></>}><div className="hint" style={{ background: "url(" + tip + ") no-repeat 0 0" }}></div></LightTooltip></td>
                                    <td className="righttd">
                                        <input type="text" value={loaclIncomeTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} className="yearinput" disabled />
                                        <span className="textoption">원</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                        <hr />
                        <table className="innerbox">
                            <tbody>
                                <tr>
                                    <td className="lefttd">공제액 합계</td>
                                    <td className="righttd"><input type="text" value={total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} className="yearinput" disabled />
                                        <span className="textoption">원</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="totalcontainer">
                    <p>
                        <strong className="s1">
                            예상 실 수령액(월) :
                        </strong>
                        <strong className="s2">
                            {income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </strong>
                        <strong className="s1">
                            원
                        </strong>
                    </p>
                    <div>※ 예상 실 수령액은 월 급여액에서 공제액 합계를 제외한 금액입니다.</div>
                    <div>
                        ※ 2021년 01월 기준 데이터를 가지고 제작하였습니다.
                    </div>
                </div>
            </Paper>

        </div>
    );
}

export default Salary;

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);