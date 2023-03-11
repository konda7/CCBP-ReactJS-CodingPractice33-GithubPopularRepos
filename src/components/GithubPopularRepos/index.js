import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageTab: languageFiltersData[0].id,
    reposList: [],
    apiStatusCall: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeLanguageTab} = this.state
    this.setState({apiStatusCall: apiStatusConstants.inProgress})

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageTab}`,
    )

    if (response.ok === true) {
      const data = await response.json()
      const modifiedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        reposList: modifiedData,
        apiStatusCall: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusCall: apiStatusConstants.failure})
    }
  }

  activateLanguageTab = activeId => {
    this.setState({apiStatusCall: apiStatusConstants.inProgress})
    this.setState({activeLanguageTab: activeId}, this.getRepos)
  }

  renderRepositoryItem = () => {
    const {reposList} = this.state

    return (
      <ul className="reposList">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-description">Something went wrong</p>
    </div>
  )

  renderResult = () => {
    const {apiStatusCall} = this.state

    switch (apiStatusCall) {
      case apiStatusConstants.success:
        return this.renderRepositoryItem()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageTab} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="languages-list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageDetails={eachLanguage}
              activateLanguageTab={this.activateLanguageTab}
              activeIdTab={activeLanguageTab}
            />
          ))}
        </ul>
        {this.renderResult()}
      </div>
    )
  }
}

export default GithubPopularRepos
