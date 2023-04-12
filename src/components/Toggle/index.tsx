import { FC } from 'react'
import { useTheme } from 'styled-components'

interface ToggleI {
  isOn: boolean
  handleToggle: () => void
}

const Toggle: FC<ToggleI> = ({ isOn, handleToggle }) => {
  const theme = useTheme()
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        style={{ background: isOn ? theme.colors.orange : '' }}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  )
}

export default Toggle
