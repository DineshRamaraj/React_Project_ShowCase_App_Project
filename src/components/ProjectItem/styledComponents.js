import styled from 'styled-components'

export const ProjectItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 300px;
  max-width: 47%;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 3px #e2e8f0;
  margin-bottom: 50px;
  @media screen and (min-width: 576px) {
    max-width: 30%;
  }
  @media screen and (min-width: 768px) {
    max-width: 23%;
    margin-right: 15px;
  }
`

export const ProjectImage = styled.img`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

export const ProjectName = styled.p`
  font-family: 'Roboto';
  font-size: 18px;
  color: #475569;
  padding-left: 20px;
`
