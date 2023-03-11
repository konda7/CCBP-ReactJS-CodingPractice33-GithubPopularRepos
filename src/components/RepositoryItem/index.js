import './index.css'

const RepositoryItems = props => {
  const {repoDetails} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = repoDetails

  return (
    <li className="repository-item">
      <img className="repository-image" src={avatarUrl} alt={name} />
      <h1 className="repository-name">{name}</h1>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stats-text">{starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stats-text">{forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="stats-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItems
