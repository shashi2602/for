import ChooseMeProfile from "./screens/ProfileScreen";
import ChooseMeAbout from "./screens/AboutScreen";
import ChooseMeSkills from "./screens/SkillsScreen";
import ChooseMeProjects from "./screens/ProjectsScreen";
import ChooseMeSocialMedia from "./screens/SocialmediaScreen";
import ChooseMeMyWish from "./screens/MywishScreen";
import ChooseMeBlogs from "./screens/BlogsScreen";

function ChooseMeInBrife(props) {
  // const [state,setState]=useState("")
  function switchChooseMe(chooseMeType) {
    switch (chooseMeType) {
      case "PROFILE":
        return <ChooseMeProfile />;
      case "ABOUT":
        return <ChooseMeAbout />;
      case "SKILLS":
        return <ChooseMeSkills />;
      case "PROJECTS":
        return <ChooseMeProjects />;
      case "SOCIALMEDIA":
        return <ChooseMeSocialMedia />;
      case "MYWISH":
        return <ChooseMeMyWish />;
      case "BLOGS":
        return <ChooseMeBlogs />;
      default:
        return <ChooseMeProfile />;
    }
  }
  return <div>{switchChooseMe(props.type)}</div>;
}

export default ChooseMeInBrife;
