import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Text } from '@dixre/ui-library'
// import { useTranslation } from 'react-i18next'

function App(): JSX.Element {
    // const { t } = useTranslation()
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <Text variant="h1">Welcome and working</Text>
            {/* <Text>{t('common:homepage:title')}</Text> */}
        </div>
    )
}

export default App