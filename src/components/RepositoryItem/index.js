// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, id, issuesCount, starsCount, name} = repoDetails
  return (
    <li className="repo-item-container">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1 className="repo-heading">{name}</h1>
      <div className="review-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="icon"
        />
        <p className="review-text">{starsCount}</p>
      </div>
      <div className="review-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="icon"
        />
        <p className="review-text">{forksCount}</p>
      </div>
      <div className="review-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="icon"
        />
        <p className="review-text">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
