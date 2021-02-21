import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import '../css/Career.scss';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },

}));

function CreateCareer({onChange, onCreate, dates, onRemove}) {

    const classes = useStyles();
    const selectyear = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921];
    const selectmonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const nowlist = [{value : 1, text : "재직중"}, {value : 0, text : "퇴사"}];

    return (<div className="ca_inputbox">
            {dates.map((date)=>(
                <div key={date.id}>
                <FormControl className={classes.formControl}>
                    <NativeSelect
                        onChange={onChange}
                        inputProps={{
                            name: 'startYear',
                            id: date.id,
                        }}
                    >
                        {selectyear.map((v, idx) => (
                            <option value={v} key={idx}>{v}</option>
                        ))}

                    </NativeSelect>
                </FormControl>
                <span className="ca_text"> 년 </span> 
                <FormControl className={classes.formControl}>
                    <NativeSelect
                        onChange={onChange}
                        inputProps={{
                            name: 'startMonth',
                            id: date.id,
                        }}
                    >
                        {selectmonth.map((v, idx) => (
                            <option value={v} key={idx}>{v}</option>
                        ))}

                    </NativeSelect>
                </FormControl>
                <span className="ca_text"> 월 입사 ~ </span>
                <FormControl className={classes.formControl}>
                    <NativeSelect
                        onChange={onChange}
                        inputProps={{
                            name: 'endYear',
                            id: date.id,
                        }}
                    >
                        {selectyear.map((v, idx) => (
                            <option value={v} key={idx}>{v}</option>
                        ))}

                    </NativeSelect>
                </FormControl>
                <span className="ca_text"> 년 </span> 
                <FormControl className={classes.formControl}>
                    <NativeSelect

                        onChange={onChange}
                        inputProps={{
                            name: 'endMonth',
                            id: date.id,
                        }}
                    >
                        {selectmonth.map((v, idx) => (
                            <option value={v} key={idx}>{v}</option>
                        ))}

                    </NativeSelect>
                </FormControl>
                <span className="ca_text"> 월 </span>
                <FormControl className={classes.formControl}>
                    <NativeSelect

                        onChange={onChange}
                        inputProps={{
                            name: 'now',
                            id: date.id,
                        }}
                    >
                        {nowlist.map((v, idx) => (
                            <option value={v.value} key={idx}>{v.text}</option>
                        ))}

                    </NativeSelect>
                </FormControl>
                <button className="ca_button" onClick={onCreate}>추가</button>
                <button className="ca_button" onClick={()=>{onRemove(date.id)}}>제거</button>
                </div>

                
            ))}
            </div>
        
    );
}

export default CreateCareer;