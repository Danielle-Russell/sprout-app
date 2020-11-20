import React from 'react';

const SproutContext =
React.createContext({
    sprouts: {},
    activities: {},
    health: {},
    milestones: {},
    growth: {},
    addSprout: () => {},
    addHealth: () => {},    
    addGrowth: () => {},
    addMilestone: () => {},
    addActivity: () => {},
    addNewUser: () => {},
    showModal: () => {},
    closeModal: () => {},
    modalShown: false
})

export default SproutContext