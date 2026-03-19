type ConditionalParam = {
    [x: string]: boolean
}

type ClassNamesParams = string | ConditionalParam

export const classNames = (...classes: ClassNamesParams[]): string => {
    const result: string[] = []

    classes.forEach(cls => {
        if (typeof cls === 'string') {
            result.push(cls)
        }
        else if ((cls && typeof cls === 'object') && !Array.isArray(cls)) {
            for (const key in cls) {
                if (typeof cls[key] === 'boolean') {
                    if (cls[key]) result.push(key)
                }
                console.warn(`The value of ${key} must be a boolean`)
            }
        }
        else {
            console.warn(`value ${cls}  is not of type string or object`)
        }
    })

    return result.join(' ')
}