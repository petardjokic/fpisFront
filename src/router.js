import PlanProvere from './components/PlanProvere'
import NalogZaSkladistenje from './components/NalogZaSkladistenje'
import NalogIFrame from './components/NalogIFrame'

export default [{
        path: '/plan-provere',
        name: "planProvere",
        component: PlanProvere
    },
    {
        path: '/nalog',
        name: "nalog",
        component: NalogZaSkladistenje
    },
    {
        path: '/nalog-iframe',
        name: "nalog-iframe",
        component: NalogIFrame
    }
]