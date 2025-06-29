import LandingPageC from "../Components/LandingPageC";
import { APICaller } from "../utilities/APICaller";




const Index = ({returnedData}) =>  {

  return(
  <>
      <LandingPageC returnedData={returnedData}/>
  </>
  )
}

export default Index



export const getStaticProps = async () => {
  const res = await APICaller(
    null,
    `GetTypeHelps`,
    { TypeHelpCategory: 'Cash,Company,Service,Challenge' },
    'https://77.104.81.93:8092'
  );
  console.log(res, "getStaticProps res");

  return {
    props: {
      returnedData: res
    },
    revalidate: 60*60*24
  }
}

