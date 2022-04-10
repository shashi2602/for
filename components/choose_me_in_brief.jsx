import ChooseMeProfile from "./screens/choose_me_profile";
import ChooseMeAbout from "./screens/choose_me_about";
import ChooseMeSkills from "./screens/choose_me_skills";
import ChooseMeProjects from "./screens/choose_me_projects";
import ChooseMeSocialMedia from "./screens/choose_me_socialmedia";
import ChooseMeMyWish from "./screens/choose_me_mywish";

function ChooseMeInBrife(props){
    // const [state,setState]=useState("")
    function switchChooseMe(chooseMeType){
        switch(chooseMeType){
            case 'PROFILE':
                return <ChooseMeProfile/>
            case 'ABOUT':
                return <ChooseMeAbout/>
            case "SKILLS":
                return <ChooseMeSkills/>
            case "PROJECTS":
                return <ChooseMeProjects/>
            case "SOCIALMEDIA":
                return <ChooseMeSocialMedia/>
            case "MYWISH":
                return <ChooseMeMyWish/>
            default:
                return <ChooseMeProfile/>
        }
    }
    return(
        <div>
            {
                switchChooseMe(props.type)
            }
        </div>
    )
}

export default ChooseMeInBrife