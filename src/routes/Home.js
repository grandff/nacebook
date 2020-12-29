import React, {useState, useEffect} from "react";
import { dbService } from "fbase";

const Home = () => {    
    const [nacebook, setNacebook] = useState("");
    const [nacebooks, setNacebooks] = useState([]);    

    // db select
    const getNacebooks = async() => {
        const dbNacebooks = await dbService.collection("nacebooks").get();
        dbNacebooks.forEach((document) => {
            const nacebookObject = {
                ...document.data(),                                 // es6
                id : document.id
            }
            setNacebooks((prev) => [nacebookObject, ...prev]);      // 함수 전달(es6)
        });
    }    

    // built in
    useEffect(() => {
        getNacebooks();
    }, [])

    // db insert
    const onSubmit = async (event) => {
        event.preventDefault();        
        await dbService.collection("nacebooks").add({
            nacebook,
            REG_DATE : Date.now()
        });
        setNacebook("");        // insert 후 초기화
    };

    // set nacebook input
    const onChange = (event) => {
        const {target : {value}} = event;
        setNacebook(value);
    };

    return(
        <div>
            <h1>Home</h1>
            <form onSubmit = {onSubmit}>
                <input type = "text" placeholder="new text!" value={nacebook}  onChange={onChange} />
                <input type="submit" value="Submit"/>
            </form>
            <div>
                {nacebooks.map((nacebook) => <div key={nacebook.id}>
                    <h4>{nacebook.nacebook}</h4>
                    </div>)}
            </div>
        </div>        
    );
};

export default Home;