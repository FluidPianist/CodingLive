import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyforjob, getvacancylist } from '../../redux/Actions/Candidate';
import {Card , CardFooter, Button} from 'reactstrap';
import VacancyView from '../Utility/VacancyView';


const Vacancies = () =>{
  
  const dispatch = useDispatch();
  var vacancy_list= useSelector(state=>state.vacancy_list);
  console.log(vacancy_list);

  useEffect(()=>{
      dispatch(getvacancylist());
  },[dispatch])

    if(vacancy_list.length!==0){
        const listview = vacancy_list.map((vacancy)=>{
            return(
                    <Card key={vacancy._id} className="col-11 p-0 col-sm-10 col-md-9 my-3 shadow" >  
                        <VacancyView vacancy={vacancy}/>
                        <CardFooter className="bg-white">
                            <Button className="btn-primary mr-4" onClick={()=>dispatch(applyforjob(vacancy._id))} >Apply</Button>
                        </CardFooter>
                    </Card>       
            );
        })

        return(
            <div className="container">
                <div className="row frh"></div>
                <div className="row justify-content-around my-5">
                {listview}
                </div>    
            </div>      
        )
    }
    else
    return(
        <div className="container vh-height">
            <div className="row frh"></div>
            <div className="row justify-content-center">
                <h3 className="my-5 col-10 p-4 text-center bgc-light">
                    There are no available vacancies at the moment ....
                </h3>
            </div>
        </div>
    )
}

export default Vacancies; 