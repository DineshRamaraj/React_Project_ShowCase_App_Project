import ProjectItem from '../ProjectItem'
import {ProjectListContainer} from './styledComponents'

const Projects = props => {
  const {projectList} = props
  return (
    <ProjectListContainer>
      {projectList.map(eachItem => (
        <ProjectItem key={eachItem.id} projectDetails={eachItem} />
      ))}
    </ProjectListContainer>
  )
}

export default Projects
