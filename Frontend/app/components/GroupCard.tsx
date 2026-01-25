 
 type GroupCardType = {
   id : string , 
   name : string , 
   description : string , 
   NoOfMemebers : number 
 }
 type grouptype = {
    group : GroupCardType
 }
function GroupCard( {group} : grouptype) {

    return <>
     <div>
      {group.name}
     </div>
    </>
}

export default GroupCard; 