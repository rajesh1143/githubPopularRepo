import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageDetails, isActive, setActiveLanguageId} = props
  const {id, language} = eachLanguageDetails
  const tabClassName = isActive ? 'active-btn' : ''
  const onClickTab = () => {
    setActiveLanguageId(id)
  }

  return (
    <>
      <li className="tab-item">
        <button
          className={`button ${tabClassName}`}
          type="button"
          onClick={onClickTab}
        >
          {language}
        </button>
      </li>
    </>
  )
}
export default LanguageFilterItem
