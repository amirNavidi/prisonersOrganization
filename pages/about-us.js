import AboutUSC from "../Components/AboutUSC";
import { APICaller } from "../utilities/APICaller";

const AboutUs = ({ returnedData }) => {
    return (
      <AboutUSC returnedData={returnedData} />
    );
};

export default AboutUs;

export const getStaticProps = async () => {
    const res = await APICaller(
        null,
        'GetTypeHelps',
        { TypeHelpCategory: "Company,CashDet,ServiceDet" },
        'https://77.104.81.93:8081'
    );
    console.log(res, "getStaticProps res"); 
    return {
        props: {
            returnedData: res
        },
        revalidate: 60*60*24
    }
}