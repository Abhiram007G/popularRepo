// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languageData, onActive, isActive} = props
  const {id, language} = languageData

  const onClickActive = () => {
    onActive(id)
  }

  const activeClassName = isActive ? 'active-item' : ''

  return (
    <li>
      <button
        type="button"
        className={`filter-item-button ${activeClassName}`}
        onClick={onClickActive}
      >
        <p className="text">{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
