export default async function TokenChecker(customerUID , token , PageName){
       const result =await fetch('/api/token-checker',{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                     customerUID,
                     token , 
                     PageName
                })
       })
       const isValid =await result.json();
        return isValid; 
}