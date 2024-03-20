import {ProjectItem, ProjectImage, ProjectName} from './styledComponents'

const ProjectItemDetail = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails
  return (
    <ProjectItem>
      <ProjectImage src={imageUrl} alt={name} />
      <ProjectName>{name}</ProjectName>
    </ProjectItem>
  )
}

export default ProjectItemDetail
