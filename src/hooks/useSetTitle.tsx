import { useEffect } from 'react'

export default function useSetTitle(title: string) {
    useEffect(() => {
        document.title = title;
    }, [title])

    return null
}
