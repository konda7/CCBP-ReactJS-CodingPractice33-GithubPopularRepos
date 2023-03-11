import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, activateLanguageTab, activeIdTab} = props
  const {id, language} = languageDetails

  const activeTabClassName =
    activeIdTab === id ? 'language-btn active' : 'language-btn'

  const onClickLanguageTab = () => {
    activateLanguageTab(id)
  }

  return (
    <li className="language-tab">
      <button
        type="button"
        className={activeTabClassName}
        onClick={onClickLanguageTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
