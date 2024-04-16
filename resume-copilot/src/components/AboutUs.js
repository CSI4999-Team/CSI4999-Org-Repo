import React from 'react';
//import "./AboutUs.css";
//import LeftBar from "./LeftBar";

function AboutUs(){
    return(
        <div style={{padding: '20px'}}>
        <p className='description'>Meet the team!</p>
    <ul>
        <li>James Horner - Software Developer (Core Development Team)</li>
        <p className='explanation'>James is graduating with a B.S. in Computer Science in 2024. He has been assisting in Research at Oakland University. </p>
        <br/>
        <li>Dominick Kalaj - Software Dev + QA/QE (Core Development Team)</li>
        <p className='explanation'>Dominick is graduating with a B.S. in Computer Science in 2024. He previously worked at Airboss of America.</p>
        <br/>
        <li>Stephen Placeway - Product Owner (Developement Support)</li>
        <p className='explanation'>Stephen Placeway is graduating with a degree in Information Technology in 2024. He previously worked for Atlas Copco's IT team.</p>
        <br/>
        <li>Jacob Souro - Software Dev + QA/QE (Core Development Team)</li>
        <p className='explanation'>Jacob is graduating with a B.S. in Computer Science in 2024. He previously worked for Cummins Inc.</p>
        <br/>
        <li>Robert Martin - Business Analyst + Scrum team (Development Support) </li>
        <br/>
        <p className='explanation'>Robert Martin is graduating with a B.S. in Intformation Technology in 2024. He previously worked for Oakland Universities IT team. </p>
        <br/>
        <li>Matthew Taylor - Team Lead + Scrum Master / DevOps</li>
        <p className='explanation'>Matthew is graduating with a B.S. in Computer Science in 2024. He previously worked for United Wholesale Mortgage. </p>
      </ul>
    </div>
        );
    }
    export default AboutUs;