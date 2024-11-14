export const dateFormatted = (date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
    })
}

export const timeFormatted = (date) => {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true
    })
}
