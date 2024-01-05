const upgrades = {
    SClick: {
        lvl: 0,
        base: 500,
        rate: 7.5,
        max: 32,
        type: 0,
        name: 'Super Click'
    },
    JefKit: {
        lvl: 0,
        base: 10,
        rate: 2,
        max: 32,
        type: 1,
        psec: 1,
        name: 'Jef Kit'
    },
    JefTools: {
        lvl: 0,
        base: 100,
        rate: 2,
        max: 20,
        type: 1,
        psec: 5,
        name: 'Jef Power Tools'
    },
    AssemblyLine: {
        lvl: 0,
        base: 25000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 25,
        name: 'Assembly Line'
    },
    Warehouse: {
        lvl: 0,
        base: 100000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 80,
        name: 'Warehouse'
    },
    Factory: {
        lvl: 0,
        base: 1000000,
        rate: 2,
        max: 32,
        type: 1,
        psec: 500,
        name: 'Factory'
    },
    JefCloner: {
        lvl: 0,
        base: 5000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 1500,
        name: 'Jef Cloner'
    },
    ReallyFastGuy: {
        lvl: 0,
        base: 420000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 3600,
        name: 'Really Fast Guy'
    },
    ExtradimensionalSourcing: {
        lvl: 0,
        base: 69000000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 9500,
        name: 'Extradimensional Sourcing'
    },
    JefsFromPoo: {
        lvl: 0,
        base: 38953000000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 29000,
        name: 'Jefs From Poo'
    },
    JefRain: {
        lvl: 0,
        base: 1793953000000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 117000,
        name: 'Jef Rain'
    },
    JefMakeJef: {
        lvl: 0,
        base: 2541793953000000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 889000,
        name: 'Jef Make Jef'
    },
    Polisher: {
        lvl: 0,
        base: 1000,
        rate: 1.2,
        max: 10,
        type: 2,
        perc: 0.15,
        name: 'Jef Polisher'
    },
    Food: {
        lvl: 0,
        base: 25000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef Food'
    },
    Trainer: {
        lvl: 0,
        base: 150000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef Trainer'
    },
    Haircut: {
        lvl: 0,
        base: 350000,
        rate: 1,
        max: 1,
        type: 2,
        perc: 1,
        name: 'Fancy Haircut'
    },
    School: {
        lvl: 0,
        base: 500000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef School'
    },
    Clothes: {
        lvl: 0,
        base: 5000000000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef Clothes'
    },
    Perfume: {
        lvl: 0,
        base: 170000000000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef Perfume'
    },
    Friendly: {
        lvl: 0,
        base: 45000000000000,
        rate: 4,
        max: 3,
        type: 2,
        perc: 1,
        name: 'Jef Friendly'
    },
    AntiDumbs: {
        lvl: 0,
        base: 7800000000000000,
        rate: 4,
        max: 20,
        type: 2,
        perc: 0.2,
        name: 'Jef Anti-Dumbs'
    },
    LuxuryPack: {
        lvl: 0,
        base: 590000000000000000,
        rate: 4,
        max: 3,
        type: 2,
        perc: 1,
        name: 'Jef Luxury Pack'
    },
    ExtraBrainCells: {
        lvl: 0,
        base: 2700000000000000000,
        rate: 4,
        max: 3,
        type: 2,
        perc: 1,
        name: 'Jef Extra Brain Cells'
    },
    JefHipNCool: {
        lvl: 0,
        base: 891000000000000000000,
        rate: 4,
        max: 3,
        type: 2,
        perc: 0.25,
        name: 'Jef Hip n Cool'
    },
    PhoneAd: {
        lvl: 0,
        base: 500,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Phone Ad',
        sale: 50
    },
    TVAd: {
        lvl: 0,
        base: 125000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'TV Ad',
        sale: 500
    },
    Billboard: {
        lvl: 0,
        base: 50000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Billboard',
        sale: 2500
    },
    SalesAdvisor: {
        lvl: 0,
        base: 690000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Sales Advisor',
        sale: 50000
    },
    DreamAd: {
        lvl: 0,
        base: 10000000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Dream Ad',
        sale: 800000
    },
    VaccineChip: {
        lvl: 0,
        base: 3799000000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Vaccine Chip',
        sale: 1680000
    },
    BrainController: {
        lvl: 0,
        base: 84924900000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Brain Controller',
        sale: 42000000
    },
    TikTokTrend: {
        lvl: 0,
        base: 6492244900000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Tik Tok Trend',
        sale: 500000000
    },
    ForceFeed: {
        lvl: 0,
        base: 1536492244900000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Force Feed',
        sale: 69000000000
    },
    HomelessJef: {
        lvl: 1,
        base: 0,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Homeless Jef',
        cost: 1
    },
    StandardJef: {
        lvl: 0,
        base: 500000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Standard Jef',
        cost: 10
    },
    EducatedJef: {
        lvl: 0,
        base: 10000000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Educated Jef',
        cost: 35
    },
    BeautifulJef: {
        lvl: 0,
        base: 500000000000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Beautiful Jef',
        cost: 80
    },
    FlyingJef: {
        lvl: 0,
        base: 4200000000000000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Flying Jef',
        cost: 250
    },
    CEOJef: {
        lvl: 0,
        base: 6951200000000000000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'CEO Jef',
        cost: 1000
    },
    JefBezos: {
        lvl: 0,
        base: 5285551200000000000000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Jef Bezos',
        cost: 7200
    },
    Swindling: {
        lvl: 0,
        base: 100,
        rate: 2,
        max: 16,
        type: 5,
        name: 'Swindling'
    },
    Minions: {
        lvl: 0,
        base: 100,
        rate: 1.5,
        max: 100,
        type: 5,
        name: 'Minions'
    },
    MinionCare: {
        lvl: 0,
        base: 100,
        rate: 2,
        max: 10,
        type: 5,
        name: 'Minion Care'
    }
}