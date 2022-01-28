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

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeFilterItemId: languageFiltersData[0].id,
    itemsData: [],
    apiStatusState: apiStatus.initial,
  }

  componentDidMount = () => {
    this.getItems()
  }

  getItems = async () => {
    this.setState({apiStatusState: apiStatus.inProgress})
    const {activeFilterItemId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeFilterItemId}`
    const response = await fetch(url)

    console.log(response)
    if (response.ok === true) {
      const data = await response.json()

      let updatedData = {
        popularRepos: data.popular_repos,
      }

      const {popularRepos} = updatedData

      const updatedList = popularRepos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))

      updatedData = {
        popularRepos: updatedList,
      }
      this.setState({
        itemsData: updatedData.popularRepos,
        apiStatusState: apiStatus.success,
      })
    } else {
      this.setState({apiStatusState: apiStatus.failure})
    }
  }

  onActive = id => {
    this.setState({activeFilterItemId: id}, this.getItems)
  }

  renderRepoItems = () => {
    const {itemsData} = this.state

    return (
      <ul className="repos-container">
        {itemsData.map(each => (
          <RepositoryItem key={each.id} repoDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-text">Something went wrong!</h1>
    </div>
  )

  checkStatus = () => {
    const {apiStatusState} = this.state

    switch (apiStatusState) {
      case apiStatus.success:
        return this.renderRepoItems()
      case apiStatusState.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeFilterItemId} = this.state
    return (
      <div className="main-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="filter-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              languageData={each}
              onActive={this.onActive}
              isActive={activeFilterItemId === each.id}
            />
          ))}
        </ul>
        {this.checkStatus()}
      </div>
    )
  }
}

export default GithubPopularRepos
