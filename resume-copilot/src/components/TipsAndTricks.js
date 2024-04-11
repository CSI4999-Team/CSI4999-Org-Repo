import React from 'react';
import "./TipsAndTricks.css";
//import LeftBar from "./LeftBar";

function tipsandtricks(){
return(
    <div style={{padding: '20px'}}>
    <h1>Tips and tricks to get you started</h1>
    <p className='description'>Lets start with the skeleton of your resume, a resume consists of several key parts but not necessarily in this order:</p>
    <ul>
        <li>Contact information</li>
        <p className='explanation'>Its best to supply employers with an email, phone number, and a link to your social media (IE: LinkedIn). However don't include things like your birthday, marital status, or photographs</p>
        <li>Objective header statement</li>
        <p className='explanation'>This is where you'll provide your goal in the specific field, showcase your key skills, and other unique things that set you apart </p>
        <li>Summary</li>
        <p className='explanation'>The summary of your resume should be tailored to each specific job you are applying to. Its main goal is to list your qualifications and allow you to express why you are a good fit for the role</p>
        <li>Key skills</li>
        <p className='explanation'>What are some main take aways from previous job experiences? tools you learned from your educational career?</p>
        <li>Education and training</li>
        <p className='explanation'>Any education pertaining to your career field should be listed be sure to include the school name, location, your time span spent there, and your degree.
        Any training you've completed for certifications or other projects can be included.   </p>
        <li>Experience</li>
        <p className='explanation'>Make sure that you are putting in job experiences that are relevant to the position that you are applying to. </p>
        <li>Activities and affiliations</li>
        <p className='explanation'>Here you can put if you know any different languages, have any certifications, or any clubs you have been a part of.</p>
        <li>Honors and awards</li>
        <p className='explanation'>Here you will put your various academic accomplishments, Industry awards, Department awards, and Community awards.</p>
    </ul>
    <br/>
    <h1>Here are some stratagies to keep in mind while building your resume </h1>
    <br/>
    <ul>
        <p className='facts'>Keep font size to 10, 11, 12 and ensure that it is readable.</p>
        <p className='facts'>Do not use first person pronouns</p>
        <p className='facts'>Do not use acronyms without spelling them out first</p>
        <p className='facts'>be sure to use the pdf file type, this way anyone on any operating system can view it</p>
        <p className='facts'>Use wow words, but try to only use each wow word once on your resume</p>
        <p className='facts'>Create space, to avoid cramming too much information into one page</p>
        <p className='facts'>Draw attention with text boxes, charts, and graphs </p>
    </ul>
    </div>
);
}
export default tipsandtricks;