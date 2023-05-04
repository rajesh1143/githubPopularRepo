import './index.css'

const RepositoryItem = props => {
  const {eachRepoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepoDetails

  return (
    <>
      <li className="repo-item">
        <img src={avatarUrl} className="avatar" alt="name" />
        <h1 className="name">{name}</h1>
        <p className="star-count">{starsCount}</p>
        <p className="forksCount">{forksCount}</p>
        <p className="issuesCount">{issuesCount}</p>
      </li>
    </>
  )
}

export default RepositoryItem
