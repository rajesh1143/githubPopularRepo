import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'


const apiStatusConstants = {
    initial:'INITIAL',
    success:'SUCCESS',
    failure:'FAILURE',
    loader:'LOADER'
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {apiStatus:apiStatusConstants.initial, activeLanguageTab: languageFiltersData[0].id, repositoryList: []}

  componentDidMount() {
    this.getPopularRepo()
  }

  getPopularRepo = async () => {
     this.setState({
         apiStatus:apiStatusConstants.loader
     }) 
    const {activeLanguageTab} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageTab}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
        }))
        this.setState({
        repositoryList: updatedData,
        apiStatus:apiStatusConstants.success
        })
    }else if (response.status === 401){
        this.setState({
            apiStatus:apiStatusConstants.failure
        })
    }
 
  }

  setActiveLanguageId = activeTabId => {
    this.setState({
      activeLanguageTab: activeTabId,
    })
  }

  renderTabsList = () => {
    const {activeLanguageTab} = this.state

    return (
      <ul className="languages-tab-list">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            eachLanguageDetails={eachLanguage}
            setActiveLanguageId={this.setActiveLanguageId}
            isActive={eachLanguage.id === activeLanguageTab}
          />
        ))}
      </ul>
    )
  }

  renderRepoLists = () => {
    const {repositoryList} = this.state

    return (
      <ul className="repo-lists">
        {repositoryList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} eachRepoDetails={eachRepo} />
        ))}
      </ul>
    )
  }


  renderLanguageContainer = () => (
       <div className="app-container">
        <div className="languages-container">
          <h1 className="heading">Popular</h1>
           {this.renderTabsList()}
           {this.renderRepoLists()}
        </div>
      </div>
  )

  renderFailureView = () => (
      <div className="failure-view-container">
          <img src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png" className="failure-image" alt="failure view"/>
          <h1>Something Went Wrong</h1>
      </div>
  )

  renderLoader = () => (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80}/>
      </div>
  )

  render() {
     const {apiStatus} = this.state 
     
     switch (apiStatus) {
        case apiStatusConstants.success:
            return this.renderLanguageContainer()
        case apiStatusConstants.failure:
            return this.renderFailureView()
       case apiStatusConstants.loader:
            return this.renderLoader()
      default:
          return null
     }   
}
export default GithubPopularRepos
