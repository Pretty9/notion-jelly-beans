// react lib
import { useEffect, useCallback, useState } from 'react'
import { FaTwitter, FaGithub} from 'react-icons/fa'
import { IoSunnyOutline, IoMoonSharp } from 'react-icons/io5'

// 配置文件
import { config } from '../lib/config'

// 自定义样式
import styles from './styles.module.css'


export default function NotionFooter({ isDarkMode, toggleDarkMode }) {
    const [hasMounted, setHasMounted] = useState(false)
    const toggleDarkModeCallback = useCallback((event) => {
        event.preventDefault()
        toggleDarkMode()
    },
        [toggleDarkMode]
    )

    useEffect(() => { setHasMounted(true) }, [])

    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>Copyright 2021 {config.author}</div>


            {hasMounted ? (
                <div className={styles.settings}>
                    <a
                        className={styles.toggleDarkMode}
                        onClick={toggleDarkModeCallback}
                        title='Tottle dark mode'
                    >
                        {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
                    </a>
                </div>
            ) : null}


            <div className={styles.social}>
                
                {config.social.twitter && (
                    <a
                        className={styles.twitter}
                        href={`https://twitter.com/${config.social.twitter}`}
                        title={`Twitter @${config.social.twitter}`}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaTwitter />
                    </a>
                )}

                {config.social.github && (
                    <a
                        className={styles.github}
                        href={`https://github.com/${config.social.github}`}
                        title={`GitHub @${config.social.github}`}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaGithub />
                    </a>
                )}
            </div>

        </footer>
    )

}