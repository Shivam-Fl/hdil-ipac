
import Header from "../components/header"
import History from "../components/about/history";
import LeadershipTeam from "../components/about/leadership";
import Stats from "../components/about/stats";

const App = () => {
    return(
        <>
        <Header description={"Transforms visions into reality , blending innovation with collaborative growth "}/>

        <History/>
        
        <Stats/>
        <LeadershipTeam/>
        </>
    )
}
export default App;