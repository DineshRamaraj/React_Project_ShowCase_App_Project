import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Projects from './components/Projects'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    projectList: [],
    apiStatus: apiStatusConstants.initial,
    categoryItem: 'ALL',
  }

  componentDidMount() {
    this.getProjectList()
  }

  updatedData = eachItem => ({
    id: eachItem.id,
    name: eachItem.name,
    imageUrl: eachItem.image_url,
  })

  getProjectList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {categoryItem} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${categoryItem}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.projects.map(eachItem =>
        this.updatedData(eachItem),
      )
      this.setState({
        projectList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" width={50} height={50} color="#328af2" />
    </div>
  )

  changeCategory = event => {
    this.setState({categoryItem: event.target.value}, this.getProjectList)
  }

  renderSuccess = () => {
    const {projectList} = this.state
    return <Projects projectList={projectList} />
  }

  onRetry = () => {
    this.getProjectList()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.onRetry}
        className="failure-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderMainView() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {categoryItem} = this.state
    return (
      <>
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="header-image"
          />
        </div>
        <div className="select-project-container">
          <select
            value={categoryItem}
            onChange={this.changeCategory}
            className="category-select"
          >
            {categoriesList.map(eachOption => (
              <option
                key={eachOption.id}
                value={eachOption.id}
                className="category-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
          {this.renderMainView()}
        </div>
      </>
    )
  }
}

export default App
