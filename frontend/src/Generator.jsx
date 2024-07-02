import React, { useState } from 'react';

function Generator() {

    const [place, setPlace] = useState('');
    const [equipment, setEquipment] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [time, setTime] = useState('');
    const [response, setResponse] = useState('');
    const [showOutput,setShowOutput] = useState(false)

    const handleClick = async (e) => {
        e.preventDefault();

        const query = `Generate an HTML page listing ${bodyPart} exercises with sets and reps. Workout at ${place} using ${equipment} for ${time}. No additional text, H2 as the title.`;

        const url = 'http://127.0.0.1:5000/api/query';
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setResponse(data.response);
            setShowOutput(true);
        } catch (error) {
            console.log('Error', error)
        }
    };


    return (
        
        <div className='generator-container'>
            <div className="input-container">
            
                <h2>Let's Make You a Workout!</h2>

                <form>
                    <div className='place-container'>
                        <label className='home'>
                        <input 
                            type="radio" 
                            value='Home' 
                            checked={place ==='Home'} 
                            onChange={(e) => setPlace(e.target.value)}
                        />
                        Home
                        </label>
                        <label className='fitness'>
                        <input 
                            type="radio" 
                            value = 'Fitness' 
                            checked={place==='Fitness'} 
                            onChange={(e) => setPlace(e.target.value)}
                        />
                        Fitnes
                        </label> <br />
                    </div>
                
                    <div className='equipment-container'>
                        <label className='equipment'>
                        <input 
                            type="radio" 
                            value='Equipment' 
                            checked={equipment ==='Equipment'} 
                            onChange={(e) => setEquipment(e.target.value)}
                        />
                        Equipment
                        </label>
                        <label className='noequipment'>
                        <input 
                            type="radio" 
                            value = 'No Equipment' 
                            checked={equipment ==='No Equipment'} 
                            onChange={(e) => setEquipment(e.target.value)}
                        />
                        No Equipment
                        </label> <br />
                    </div>

                    <input 
                        type="text" 
                        value={bodyPart} 
                        onChange={(e) => setBodyPart(e.target.value)} 
                        placeholder="BodyPart..." 
                        className='bodypart-container'
                    /> <br />

                    <input 
                        type="text" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        placeholder="Time (in minutes)..." 
                        className='time-container'
                    /> <br />

                    <button 
                        onClick={handleClick} 
                        className='generate-b'
                    >
                    Generate
                    </button>
                </form>
            
            </div> 

        {showOutput && (
            <div className='output-container' >
                <div className='response' dangerouslySetInnerHTML={{ __html: response }}></div>
            </div>    
        )}
        </div>

    
    );
}

export default Generator;