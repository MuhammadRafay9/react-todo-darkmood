import { useState } from "react";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon ,faSun } from '@fortawesome/free-solid-svg-icons'


function List() {


    const [isDark, setDark] = useState(localStorage.getItem('mode'));
    const clickHandler = () => {
        
        console.log(localStorage.getItem('mode'))
        setDark(!isDark)    
        localStorage.setItem('mode',!isDark)

    }
    
    const [isLit, setLit] = useState(    (JSON.parse(localStorage.getItem('list'))) ? JSON.parse(localStorage.getItem('list')) : []);
    let dataList =   (JSON.parse(localStorage.getItem('list'))) ? JSON.parse(localStorage.getItem('list')) : [];
    
    const checkS = () => {  
        let inpValue = document.querySelector('.ins').value;

        if(inpValue)
        {
            dataList.push(inpValue);
            localStorage.setItem('list',JSON.stringify(dataList));
            
        }
        else
        {
            alert("input can not be null");
            return;
        }

        setLit((JSON.parse(localStorage.getItem('list'))) ? JSON.parse(localStorage.getItem('list')) : []);

  }

  const deleteHandler = (e) =>
{
    let a = JSON.parse(localStorage.getItem('list'))
    a.splice(e.target.parentNode.value,1)
    setLit(a);
    localStorage.setItem('list',JSON.stringify(a));
   
}

const editHandler = (e) =>
{
    
    let list = JSON.parse(localStorage.getItem('list'))
    let mainDiv = e.target.parentNode.parentNode.parentNode;
    e.target.parentNode.parentNode.remove();
    const div = createUpdateElement(mainDiv.getAttribute('data-value'),list);
    mainDiv.appendChild(div);
    
}

const createUpdateElement = (value,list) => {
    
    
    const div = document.createElement("div");
    
    const input = document.createElement("input");
    

    input.setAttribute('type', 'text');
    input.value = value ; 
    input.className = 'update';
    const updateBtn = document.createElement("button");
    updateBtn.innerText = 'Update'
    div.appendChild(input);
    div.appendChild(updateBtn);

    updateBtn.addEventListener("click",function(e){
       
        const mainParentValue =  e.target.parentNode.parentNode;
       
        list[mainParentValue.value]=e.target.parentNode.children[0].value
        
        
        
        localStorage.setItem('list',JSON.stringify(list));


        setLit(JSON.parse(localStorage.getItem('list')));

        window.location.reload();

    });
    
    return div;

}





  return (
    <div className={`List ${(isDark) ? "lit" : "dark"}`}>
      <div className="container">
           <div className={`wrap ${(isDark) ? "lit" : "dark"}`}>
                <div className="header ">
                    <div className="leftside">
                        <input className="ins" type="text"/> 
                        <input className="submit" type="button" value="sub" onClick={checkS} />
                    </div>
                    <div className={`rightside ${(isDark) ? "lit" : "dark"}`}>
                        <FontAwesomeIcon onClick={clickHandler} icon={(isDark) ? faSun : faMoon} />
                        {/* <FontAwesomeIcon icon={faSun} />
                        <FontAwesomeIcon icon={faMoon} /> */}
                        
                    </div>
                    
                </div>
                
                <div className="ulDiv">
                    <ul>

                    {isLit.map((index,item) => (
                        <li key={item} value={item} data-value={index}>
                            <div className="mainSpan">
                                <div className="spanText"> {index} </div> 
                                <div className="spanBtn">
                                    <button className="btnedit" onClick={editHandler}>Edit</button> 
                                    <button className="btndelete" onClick={deleteHandler}>Delete</button>
                                </div>
                            </div>
                        </li>
                        ))}    
                    </ul>
                </div>
            </div>
      </div>  
    </div>
  );
}

export default List;
