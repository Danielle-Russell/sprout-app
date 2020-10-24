import React from 'react'

const SproutContext = React.createContext({
    sprouts: [],
    activities: [],
    milestones: [],
    health: []
})

export default SproutContext