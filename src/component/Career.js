import React, {useRef,useState} from 'react';

import CreateCareer from './CreateCareer';
import axios from 'axios';

function Career() {

    const [dates, setDates] = useState([
        {
        endMonth: 1,
        endYear: 2021,
        id: 0,
        now : 1,
        startMonth: 1,
        startYear: 2021,
        },
    ]);

    const [result, setResult] = useState({
        month: ' ',
        year: ' '
    })

    const onChange = e => {

        const { id, name, value } = e.target;

            setDates(dates.map(date =>
                date.id === Number(id) ? {
                    ...date,
                    [name] : Number(value),
                } : date
            ));
    };

    

    const nextId = useRef(1);
    const onCreate = () => {
        const date = {
            endMonth: 1,
            endYear: 2021,
            id: nextId.current,
            now : 1,
            startMonth: 1,
            startYear: 2021,
        };
        setDates(dates.concat(date));
        nextId.current += 1;
    };

    const onRemove = (id) => {
        if(dates.length !== 1){
            setDates(dates.filter(date => date.id !== id));  
        }else{
            alert("더는 삭제 할 수 없습니다.");
        }
      
    };

    const onResult = () => {

        for(var k = 0; k< dates.length; k++){
            if((dates[k].startYear === dates[k].endYear && dates[k].startMonth > dates[k].endMonth)||(dates[k].startYear > dates[k].endYear)){
                alert('입력 범위가 잘못된 부분이 존재합니다.');
                return;
            }
        }

        for(var i = 0; i< dates.length; i++){
            for(var j = 0; j< dates.length; j++){

                if( Number(i) !== Number(j)){
                    var date1 = dates[i];
                    var date2 = dates[j];
    
                    var sfm = date1.startMonth.toString();
                    var sem = date1.endMonth.toString();
                    var tfm = date2.startMonth.toString();
                    var tem = date2.endMonth.toString();
    
                    if(Number(sfm) < 10){
                        sfm = "0" + sfm;
                    }
    
                    if(Number(sem) < 10){
                        sem = "0" + sem;
                    }
    
                    if(Number(tfm) < 10){
                        tfm = "0" + tfm;
                    }
    
                    if(Number(tem) < 10){
                        tem = "0" + tem;
                    }
                    if(isPeriodDuplicationDate(
                        Number(date1.startYear.toString()+sfm),
                        Number(date1.endYear.toString()+sem),
                        Number(date2.startYear.toString()+tfm),
                        Number(date2.endYear.toString()+tem)
                    )){
                        alert("겹치는 기간이 존재합니다.");
                        return;
                    }
                }

                
                
            }
        }

        let count = 0;
        dates.forEach((date)=>{
            if(date.now === 1){
                count++;
            }
        });

        if(count > 1){
            alert("현재 재직중인 칸이 1개 이상입니다.");
            return;
        }

        axios.post("https://calculator.hawaiian-pizza.gq/cal/career", dates)
        .then(function (response) {
            setResult(response.data);
             // response  
        }).catch(function (error) {
            // 오류발생시 실행
            console.log(error);

        });

    }

    function isPeriodDuplicationDate(fromYm, toYm, tarFromYm, tarToYm) {

        // 겹치면 true 아니면 fasle;
        if(fromYm < tarToYm && tarFromYm < toYm) {
            return true;
        } else {
            return false;
        }

    }
    
    

    return (
        <div className="ca_container">
            <div className="ca_calculator">
            <h3>재직기간</h3>
            <hr />
            <div>
            <CreateCareer 
            onChange={onChange} 
            onCreate={onCreate}
            onRemove={onRemove}
            dates={dates}
            
            />
            </div>
            
            <hr/>
            <a href="#!" className="ca_calculate" onClick={()=>{onResult()}}>계산하기</a>
            <div className="ca_result-box">
                <div className="ca_inner_result">
                회원님의 총 경력은 <span className="ca_resulttext">{result.year}</span>년 <span className="ca_resulttext">{result.month}</span>개월 입니다.

                </div>
            </div>
            </div>

            
        </div>
    );
}

export default Career;